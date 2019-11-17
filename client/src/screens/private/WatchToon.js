import React, {Component} from 'react';
import {View, Image, Dimensions, FlatList, Text} from 'react-native';
import Loading from '../additionalComponent/Loading';

import {connect} from 'react-redux';
import fetchAllPages from '../../_store/pages';
import {getData} from '../../config/config';
import {setHeaderAuth} from '../../config/api';

const widthImage = Dimensions.get('window').width;
const heightImage = Dimensions.get('window').height - 350;

class DetailToon extends Component {
  constructor() {
    super();
    this.state = {
      dataImages: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.handleGetData();
  }

  handleGetData = async () => {
    const data = await getData();
    setHeaderAuth(data.id);
    const {getParam} = this.props.navigation;
    const id_webtoon = getParam('id_webtoon');
    const id_episode = getParam('id');
    this.props.fetchAllPages(id_webtoon, id_episode);
  };

  showPage = image => {
    return (
      <View style={{backgroundColor: '#f2f3f4'}}>
        <Image
          style={{
            width: widthImage,
            height: heightImage,
            resizeMode: 'contain',
          }}
          source={{uri: image}}
        />
      </View>
    );
  };

  forFlatList = data => {
    return (
      <View>
        <FlatList
          data={data}
          renderItem={({item}) => this.showPage(item.image)}
          keyExtractor={item => item.page.toString()}
        />
      </View>
    );
  };

  render() {
    const {pages} = this.props;
    return <View>{this.forFlatList(pages.data)}</View>;
  }
}

const mapStateToProps = state => {
  return {
    pages: state.pages,
  };
};

const mapDispatchToProps = {
  fetchAllPages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailToon);

// export default DetailToon;
