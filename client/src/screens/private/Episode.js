import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Container, Content} from 'native-base';
// import Loading from '../additionalComponent/Loading';
import {connect} from 'react-redux';
import fetchAllEpisodes from '../../_store/episodes';
import {getData} from '../../config/config';
import {setHeaderAuth} from '../../config/api';
import {cusFont} from '../font';
import Background from '../../../Background/Background.jpg';

// const banners = [
//   {
//     title: 'Episode 1',
//     image:
//       'https://66.media.tumblr.com/b23f2200f6158669967e00fbca9022a6/tumblr_ovfv41J7WU1w8z7sho1_1280.jpg',
//     date: '8 August 2019',
//   },
//   {
//     title: 'Episode 2',
//     image: 'https://i.redd.it/gmvbwlihhgcz.jpg',
//     date: '13 August 2019',
//   },
//   {
//     title: 'Episode 3',
//     image:
//       'https://i.pinimg.com/originals/8f/10/33/8f1033288d189e6ee7940575d1b6c445.png',
//     date: '19 August 2019',
//   },
// ];

class Episode extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     banners: null,
  //     isLoading: true,
  //     id: null,
  //   };
  // }

  componentDidMount() {
    this.handleGetEpisodes();
  }

  handleGetEpisodes = async () => {
    try {
      const data = await getData();
      setHeaderAuth(data.token);
      const id_webtoon = this.props.navigation.getParam('id');
      this.props.fetchAllEpisodes(id_webtoon);
    } catch (error) {
      console.log(error);
    }
  };

  main = () => {
    const {navigation} = this.props;

    return (
      <View style={styles.main}>
        <Image
          style={styles.imageMain}
          source={{
            uri: navigation.getParam('image', ''),
          }}
        />
      </View>
    );
  };

  episode = episodes => {
    return (
      <FlatList
        data={episodes}
        renderItem={({item}) =>
          this.listEpisode(item.title, item.image, item.id, item.createdAt)
        }
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={this.main()}
      />
    );
  };

  handlePages = (title, id) => {
    const id_webtoon = this.props.navigation.getParam('id');
    console.log(id);
    this.props.navigation.navigate('ReadToon', {title, id, id_webtoon});
  };

  listEpisode = (title, image, id, date) => {
    return (
      <TouchableOpacity onPress={() => this.handlePages(title, id)}>
        <View style={styles.list}>
          <Image style={styles.image} source={{uri: image}} />
          <View style={styles.viewText}>
            <Text style={styles.text}>{title}</Text>
            {/* <Text>{date}</Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {episodes} = this.props;
    // console.log(JSON.stringify(episodes.data, null, 2));

    // if (this.state.isLoading) {
    //   return <Loading />;
    // }

    return (
      <View>
        <ImageBackground style={styles.background} source={Background}>
          {this.episode(episodes.data)}
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    episodes: state.episodes,
  };
};

const mapDispatchToProps = {
  fetchAllEpisodes,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Episode);

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    borderRadius: 11,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  list: {
    flexDirection: 'row',
    marginTop: 5,
    backgroundColor: 'rgba(45, 196, 171, 0.7)',
    borderRadius: 15,
    marginHorizontal: 2,
  },
  viewText: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: cusFont,
  },
  main: {
    backgroundColor: 'rgba(45, 196, 171, 0.4)',
  },
  imageMain: {
    width: '100%',
    height: 210,
  },
});
