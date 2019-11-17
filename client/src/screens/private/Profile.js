import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {Header, Left, Right} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import Background from '../../../Background/Background.jpg';
import {cusFont} from '../font';
import {connect} from 'react-redux';
import fetchGetProfile from '../../_store/profile';
import {getData} from '../../config/config';
import {setHeaderAuth} from '../../config/api';
import {GET_METHOD} from '../../config/setConst';

class Profile extends Component {
  componentDidMount() {
    this.handleGetData();
  }

  handleGetData = async () => {
    try {
      const data = await getData();
      setHeaderAuth(data.token);
      this.props.fetchGetProfile(GET_METHOD, data.id, null);
    } catch (error) {
      console.log(error);
    }
  };

  imageProfile = data => {
    if (data.avatar) {
      return <Image style={styles.image} source={{uri: data.avatar}} />;
    } else {
      return <Icon size={150} color={'#f2f0f4'} name="account-circle" />;
    }
  };

  iconic = data => {
    // console.log(JSON.stringify(data, null, 2));

    return (
      <View style={styles.viewIconic}>
        {this.imageProfile(data)}
        <Text style={styles.name}>{data.name}</Text>
      </View>
    );
  };

  myToon = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('MyToon')}
          style={styles.opacity}>
          <Text style={styles.text}>My Lonetoon Creation</Text>
          <Icon name="chevron-right" size={25} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.opacity, {marginTop: -5}]}
          onPress={() => this.logout()}>
          <Text style={styles.text}>Log Out</Text>
          <Icon name="chevron-right" size={25} />
        </TouchableOpacity>
      </View>
    );
  };

  logout = async () => {
    try {
      await AsyncStorage.setItem('user', '');
      return this.props.navigation.navigate('startScreen');
    } catch (error) {
      console.log(e);
    }
  };

  header = () => {
    return (
      <Header
        androidStatusBarColor="rgba(45, 196, 171, 0.7)"
        style={styles.header}>
        <Left>
          <Text style={[styles.name, {marginLeft: 5}]}>Profile</Text>
        </Left>
        <Right>
          <Icon
            name="pencil"
            size={25}
            style={{marginRight: 5}}
            onPress={() => this.props.navigation.navigate('EditProfile')}
          />
        </Right>
      </Header>
    );
  };

  render() {
    const {profile} = this.props;
    // console.log(JSON.stringify(profile, null, 2));
    return (
      <View style={styles.Layout}>
        <ImageBackground style={styles.background} source={Background}>
          {this.header()}
          {this.iconic(profile.data)}
          {this.myToon()}
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
  };
};

const mapDispatchToProps = {
  fetchGetProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(45, 196, 171, 0.7)',
    justifyContent: 'space-between',
  },
  Layout: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  viewIconic: {
    paddingVertical: 40,
    backgroundColor: 'white',
    margin: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(45, 196, 171, 0.7)',
    borderRadius: 15,
  },
  opacity: {
    backgroundColor: 'rgba(45, 196, 171, 0.7)',
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 10,
    fontSize: 20,
    fontFamily: cusFont,
  },
  name: {
    fontFamily: cusFont,
    fontSize: 25,
    marginTop: 5,
  },
  image: {
    width: 153,
    height: 153,
    borderRadius: 153 / 2,
  },
});

// export default Profile;
