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
  SafeAreaView,
} from 'react-native';
import {
  Item,
  Input,
  Container,
  Body,
  Button,
  Header,
  Content,
} from 'native-base';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Favorite from './Favorite';
import Profile from './Profile';
import axios from 'axios';
import {URL, getToken} from './Config';
import Loading from './screen_item/Loading';

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
  constructor() {
    super();
    this.state = {
      banners: null,
      isLoading: true,
      favoriteList: null,
    };
  }

  async componentDidMount() {
    const value = await getToken();
    await axios
      .get(`${URL}/webtoons`, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then(response => {
        this.setState({banners: response.data, isLoading: false});
        const newData = response.data.filter(data => data.isFavorite == true);
        this.setState({favoriteList: newData});
      })
      .catch(function(error) {
        console.log(error);
      });
  }

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
            data={this.state.favoriteList}
            renderItem={({item}) =>
              this.horizontalView(item.title, item.image, item.id)
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
          <Image style={{width: 120, height: 120}} source={{uri: image}} />
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
            onPress={() =>
              this.props.navigation.navigate('Episode', {title, image, id})
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
                <Text style={{fontSize: 18, color: 'white'}}>+ Favorite</Text>
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
              data={this.state.banners}
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
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <Container style={styles.Layout}>
        <Header style={{marginBottom: 10, backgroundColor: 'rgb(185,145,102)'}}>
          <View style={{flex: 1}}>
            <Body style={styles.bodySearch}>
              <Item style={styles.Item} regular>
                <Input style={styles.Input} />
                <Icon size={30} style={{marginRight: 10}} name="search" />
              </Item>
            </Body>
          </View>
        </Header>
        <Content style={{flex: 1}}>
          <View style={{flex: 3}}>
            <View style={{marginBottom: 30}}>{this.bannerCarousel()}</View>
          </View>
          <View style={{flex: 5, marginTop: -10}}>
            {this.scrollViewHorizontal()}
            {this.ScrollViewVertikal()}
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Layout: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
  bodySearch: {
    marginTop: 5,
  },
  Item: {
    backgroundColor: 'white',
    height: 45,
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

const forNavigation = createMaterialBottomTabNavigator(
  {
    ForYou: {
      screen: ForYouScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'dashboard'} />
          </View>
        ),
      },
    },
    Favorite: {
      screen: Favorite,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'star'} />
          </View>
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'person'} />
          </View>
        ),
      },
    },
  },
  {
    shifting: false,
    activeColor: 'rgb(185,145,102)',
    inactiveColor: '#d3d3d3',
    barStyle: {
      backgroundColor: '#fffff0',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderStyle: 'solid',
      borderColor: '#d0cfd0',
    },
  },
);
export default createAppContainer(forNavigation);
