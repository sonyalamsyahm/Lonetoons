import React, {Component} from 'react';
import {View, Image, Dimensions, FlatList, Text} from 'react-native';
import axios from 'axios';
import {getToken, URL, getIdEpisode} from './Config';
import Loading from './screen_item/Loading';

const widthImage = Dimensions.get('window').width;
const heightImage = Dimensions.get('window').height - 200;

export default class DetailCartoon extends Component {
  constructor() {
    super();
    this.state = {
      dataImages: null,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const id = await this.props.navigation.getParam('id', '');
    const value = await getToken();
    const idEpisode = await getIdEpisode();
    await axios
      .get(`${URL}/webtoon/${idEpisode}/episode/${id}`, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then(response => {
        this.setState({dataImages: response.data, isLoading: false});
        // console.log(JSON.stringify(response.data, null, 2));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  showPage = image => {
    return (
      <View style={{backgroundColor: '#f2f3f4'}}>
        {console.log(image)}
        <Image
          style={{width: widthImage, height: heightImage}}
          source={{uri: image}}
        />
      </View>
    );
  };

  forFlatList = () => {
    return (
      <View>
        <FlatList
          data={this.state.dataImages}
          renderItem={({item}) => this.showPage(item.image)}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return <View>{this.forFlatList()}</View>;
  }
}
