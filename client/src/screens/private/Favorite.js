import React, {Component} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {Input, Item, Header} from 'native-base';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {cusFont} from '../font';
import fetchAllFavorite from '../../_store/favorites';
import Background from '../../../Background/Background.jpg';
import {getData} from '../../config/config';
import {setHeaderAuth} from '../../config/api';

import {
  GET_FAV_WEBTOON,
  DELETE_FAV_WEBTOON,
  POST_FAV_WEBTOON,
} from '../../_store/favorites';

class Favorite extends Component {
  handleGetData = async () => {
    try {
      const data = await getData();
      setHeaderAuth(data.token);
      this.props.fetchAllFavorite(GET_FAV_WEBTOON, data.id, null);
    } catch (error) {}
  };

  header = () => {
    return (
      <Header
        androidStatusBarColor="rgba(45, 196, 171, 0.7)"
        style={styles.header}>
        <Item regular style={styles.item}>
          <Input placeholder="Search" style={styles.input} />
          <Icon name="magnify" size={25} style={{marginRight: 5}} />
        </Item>
      </Header>
    );
  };

  handleShowFavorite = (title, image) => {
    return (
      <View style={styles.viewList}>
        <Image style={styles.image} source={{uri: image}} />
        <View style={styles.viewText}>
          <Text style={styles.label}>{title}</Text>
        </View>
      </View>
    );
  };

  renderData = favorites => {
    return (
      <View style={{marginTop: 3, marginBottom: 115}}>
        <FlatList
          data={favorites}
          renderItem={({item}) =>
            this.handleShowFavorite(item.title, item.image)
          }
          keyExtractor={item => item.toon_id.toString()}
          onRefresh={() => this.handleGetData()}
          refreshing={false}
        />
      </View>
    );
  };

  render() {
    const {favorites} = this.props;
    // console.log(favorites.data);

    return (
      <View>
        <ImageBackground style={styles.background} source={Background}>
          {this.header()}
          {this.renderData(favorites.data)}
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
  };
};

const mapDispatchToProps = {
  fetchAllFavorite,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Favorite);

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

  viewList: {
    flexDirection: 'row',
    backgroundColor: 'rgba(45, 196, 171, 0.7)',
    margin: 2,
    marginTop: 5,
    borderRadius: 15,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  viewText: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  label: {
    fontFamily: cusFont,
    fontSize: 18,
  },
});

// export default Favorite;
