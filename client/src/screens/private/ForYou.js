import React, {Component} from 'react';
import Carousel from 'react-native-banner-carousel';
import {
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Item, Input, Header, Body} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import Background from '../../../Background/Background.jpg';

// import data for trigger dispatch
import fetchAllWebtoons from '../../_store/webtoons';
import fetchAllFavorite from '../../_store/favorites';
import {setHeaderAuth} from '../../config/api';
import {getData} from '../../config/config';
import {cusFont} from '../font';
import {textEllipsis} from '../../config/setLong';
// import Loading from '../additionalComponent/Loading';

import {
  GET_FAV_WEBTOON,
  DELETE_FAV_WEBTOON,
  POST_FAV_WEBTOON,
} from '../../config/setConst';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 210;
const carouselBanners = [
  {
    title: 'Adventure of Arya',
    image:
      'https://66.media.tumblr.com/b23f2200f6158669967e00fbca9022a6/tumblr_ovfv41J7WU1w8z7sho1_1280.jpg',
  },
  {
    title: 'The Jon Snow',
    image: 'https://i.redd.it/gmvbwlihhgcz.jpg',
  },
  {
    title: 'Mother of Dragons',
    image:
      'https://i.pinimg.com/originals/8f/10/33/8f1033288d189e6ee7940575d1b6c445.png',
  },
];

class ForYouScreen extends Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      searchState: false,
    };
  }

  componentDidMount() {
    this.handleGetToons();
  }

  handleGetToons = async () => {
    try {
      const data = await getData();
      setHeaderAuth(data.token);
      this.props.fetchAllWebtoons(data.id, false, null);
      this.props.fetchAllFavorite(GET_FAV_WEBTOON, data.id, null);
    } catch (error) {
      console.log(error);
    }
  };

  handleSearch = async () => {
    try {
      const {inputSearch} = this.state;
      const data = await getData();
      this.props.fetchAllWebtoons(data.id, true, inputSearch);
    } catch (error) {
      console.log(error);
    }
  };

  handleReset = text => {
    this.setState({inputSearch: text});
    if (!text) {
      this.handleGetToons();
    }
  };

  header = () => {
    return (
      <Header
        androidStatusBarColor="rgba(45, 196, 171, 0.7)"
        style={styles.header}>
        <Item regular style={styles.item}>
          <Input
            placeholder="Search"
            style={styles.input}
            onChangeText={text => this.handleReset(text)}
          />
          <Icon
            name="magnify"
            size={25}
            style={{marginRight: 5}}
            onPress={() => this.handleSearch()}
          />
        </Item>
      </Header>
    );
  };

  ListItem = (images, index) => {
    return (
      <View style={styles.banner} key={index}>
        <Image
          style={{
            width: BannerWidth,
            height: BannerHeight,
            resizeMode: 'contain',
          }}
          source={{uri: images.image}}
        />
      </View>
    );
  };

  bannerCarousel = () => {
    return (
      <Carousel
        autoplay
        autoplayTimeout={5000}
        loop
        index={0}
        pageSize={BannerWidth}>
        {carouselBanners.map((images, index) => this.ListItem(images, index))}
      </Carousel>
    );
  };

  handleShowFavorites = (title, image, id) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Episode', {title, image, id})
        }>
        <View style={styles.viewListFavorite}>
          <Image style={styles.image} source={{uri: image}} />
          <Text style={styles.text}>{textEllipsis(title, 13)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  favoritesFlatList = () => {
    const {favorites} = this.props;
    return (
      <View style={styles.viewFlatListFavorite}>
        <FlatList
          data={favorites.data}
          horizontal={true}
          renderItem={({item}) =>
            this.handleShowFavorites(item.title, item.image, item.toon_id)
          }
          keyExtractor={item => item.toon_id.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  favorites = () => {
    return (
      <View>
        <View style={styles.viewTextLabel}>
          <Text style={styles.label}>All Favorite Toons</Text>
        </View>
        {this.favoritesFlatList()}
      </View>
    );
  };

  headerComponent = () => {
    return (
      <View>
        {this.bannerCarousel()}
        {this.favorites()}
        <View style={[styles.viewTextLabel, {marginBottom: 4}]}>
          <Text style={styles.label}>All Toons</Text>
        </View>
      </View>
    );
  };

  handleShowAllToons = (title, image, id) => {
    return (
      <View style={styles.viewList}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Episode', {title, image, id})
          }>
          <Image style={styles.image} source={{uri: image}} />
        </TouchableOpacity>
        <View style={styles.viewText}>
          <Text style={styles.label}>{title}</Text>
          <Button
            title="Favorite"
            buttonStyle={styles.button}
            titleStyle={styles.label}
          />
        </View>
      </View>
    );
  };

  AllData = data => {
    const {inputSearch} = this.state;
    // console.log(this.state.inputSearch);
    return (
      <FlatList
        data={data}
        renderItem={({item}) =>
          this.handleShowAllToons(item.title, item.image, item.id)
        }
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={inputSearch ? null : this.headerComponent()}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  render() {
    const {webtoons} = this.props;
    // console.log(JSON.stringify(webtoons.data, null, 2));
    return (
      <View>
        <ImageBackground style={styles.background} source={Background}>
          {this.header()}
          {this.AllData(webtoons.data)}
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    webtoons: state.webtoons,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = {
  fetchAllWebtoons,
  fetchAllFavorite,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForYouScreen);

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  header: {
    backgroundColor: 'rgba(45, 196, 171, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: Dimensions.get('window').width - 20,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 15,
  },
  input: {
    fontSize: 18,
    fontFamily: cusFont,
  },
  banner: {
    backgroundColor: 'rgba(45, 196, 171, 0.4)',
    height: 210,
    width: BannerWidth,
    justifyContent: 'center',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  viewList: {
    flexDirection: 'row',
    backgroundColor: 'rgba(45, 196, 171, 0.7)',
    margin: 2,
    borderRadius: 15,
  },
  viewText: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  viewTextLabel: {
    padding: 5,
    backgroundColor: 'rgba(45, 196, 171, 0.7)',
    marginTop: 15,
    marginHorizontal: 2,
    borderRadius: 10,
    alignItems: 'center',
  },
  label: {
    fontFamily: cusFont,
    fontSize: 18,
  },
  viewFlatListFavorite: {
    marginHorizontal: 2,
    backgroundColor: 'rgba(45, 196, 171, 0.7)',
    borderRadius: 15,
    marginVertical: 5,
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: cusFont,
  },
  viewListFavorite: {
    marginHorizontal: 10,
  },
  button: {
    height: 35,
    width: 120,
    marginTop: 10,
  },
});
