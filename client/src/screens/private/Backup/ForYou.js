import React, {Component} from 'react';
import Carousel from 'react-native-banner-carousel';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Item, Input, Container, Body, Button} from 'native-base';
// import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
// import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';

// import data for trigger dispatch
import fetchAllWebtoons from '../../_store/webtoons';
import fetchAllFavorite from '../../_store/favorites';
import {setHeaderAuth} from '../../config/api';
import {getData} from '../../config/config';
// import Loading from '../additionalComponent/Loading';

// import Favorite from './Favorite';
// import Profile from './Profile';
// import axios from 'axios';
import {
  GET_FAV_WEBTOON,
  DELETE_FAV_WEBTOON,
  POST_FAV_WEBTOON,
} from '../../config/setConst';

const fontOfSize = 20;
const childFontOfSize = 16;

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
  // constructor() {
  //   super();
  //   this.state = {
  //     banners: null,
  //     isLoading: true,
  //     favoriteList: null,
  //   };
  // }

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

  bannerCarousel = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          height: 210,
          width: BannerWidth,
          justifyContent: 'center',
        }}>
        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={BannerWidth}>
          {carouselBanners.map((images, index) => this.ListItem(images, index))}
        </Carousel>
      </View>
    );
  };

  handleSearch = async title => {
    try {
      const data = await getData();
      this.props.fetchAllWebtoons(data.id, true, title);
    } catch (error) {
      console.log(error);
    }
  };

  ListItem = (images, index) => {
    return (
      <View key={index}>
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

  scrollViewHorizontal = () => {
    return (
      <View>
        <View
          style={{
            backgroundColor: 'white',
            marginBottom: 5,
            justifyContent: 'center',
          }}>
          <Text style={styles.Text}>Favorite</Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            marginBottom: 0,
            justifyContent: 'center',
            paddingTop: 5,
            paddingBottom: 5,
          }}>
          <FlatList
            ScrollView={false}
            horizontal={true}
            // data={this.state.favoriteList}
            data={this.props.favorites.data}
            renderItem={({item}) =>
              this.horizontalView(item.title, item.image, item.toon_id)
            }
            keyExtractor={item => item.title}
          />
        </View>
      </View>
    );
  };

  horizontalView = (title, image, id) => {
    return (
      <View key={title} style={{margin: 10}}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Episode', {title, image, id})
          }>
          <Image style={{width: 100, height: 100}} source={{uri: image}} />
          <Text
            style={{
              color: 'black',
              fontSize: childFontOfSize,
              width: 100,
            }}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  vertikalView = (title, image, id) => {
    return (
      <View key={title} style={{marginLeft: 20, marginTop: 20}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={
              () =>
                this.props.navigation.navigate('Episode', {title, image, id}) //{title, image, id}
            }>
            <Image style={{width: 120, height: 120}} source={{uri: image}} />
          </TouchableOpacity>
          <View
            style={{flexDirection: 'column', marginLeft: 20, marginTop: 20}}>
            <Text style={{color: 'black', fontSize: 18, marginBottom: 10}}>
              {title}
            </Text>
            <Button
              style={{
                height: 30,
                width: 120,
                backgroundColor: 'rgb(185,145,102)',
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 18, color: 'white'}}>Add Favorite</Text>
              </View>
            </Button>
          </View>
        </View>
      </View>
    );
  };

  ScrollViewVertikal = () => {
    return (
      <View>
        <View>
          <View
            style={{
              backgroundColor: 'white',
              marginTop: 20,
              justifyContent: 'center',
              marginBottom: 5,
            }}>
            <Text
              style={{
                color: 'black',
                marginLeft: 175,
                marginRight: 175,
                fontSize: 20,
              }}>
              All
            </Text>
          </View>
        </View>
        <View>
          <View
            style={{
              backgroundColor: 'white',
              marginBottom: 0,
              justifyContent: 'center',
            }}>
            <FlatList
              horizontal={false}
              style={{flexDirection: 'row'}}
              data={this.props.webtoons.data}
              // data={this.state.banners}
              renderItem={({item}) =>
                this.vertikalView(item.title, item.image, item.id)
              }
              keyExtractor={item => item.title}
            />
          </View>
        </View>
      </View>
    );
  };

  render() {
    // const {webtoons} = this.props;
    // console.log(JSON.stringify(webtoons.data.title, null, 2));
    // let isLoadingScreen = webtoons.isLoading;
    // // console.log(JSON.stringify(this.props.webtoons, null, 2));
    // if (isLoadingScreen) {
    //   return <Loading />;
    // }

    return (
      <Container style={styles.Layout}>
        <ScrollView>
          <View style={{flex: 1}}>
            <Body style={styles.bodySearch}>
              <Item style={styles.Item} regular>
                <Input
                  onChangeText={title => this.handleSearch(title)}
                  style={styles.Input}
                />
                <Icon size={30} style={{marginRight: 10}} name="search" />
              </Item>
            </Body>
          </View>
          <View style={{flex: 3}}>
            <View style={{marginBottom: 30}}>{this.bannerCarousel()}</View>
          </View>
          <View style={{flex: 5, marginTop: -10}}>
            {this.scrollViewHorizontal()}
            {this.ScrollViewVertikal()}
          </View>
        </ScrollView>
      </Container>
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
  Layout: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
  bodySearch: {
    margin: 10,
  },
  Item: {
    backgroundColor: 'white',
  },
  Input: {
    marginLeft: 10,
    color: 'black',
    fontSize: 18,
  },
  Body: {
    marginLeft: 10,
    backgroundColor: '#f2f3f4',
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  Text: {
    color: 'black',
    fontSize: fontOfSize,
    marginRight: 150,
    marginLeft: 150,
  },
});
