import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {getToken} from './Config';

export default class FirstPage extends Component {
  async componentDidMount() {
    const data = await getToken();
    try {
      if (data) {
        console.log(data);
        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('Auth');
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Image
          style={{
            width: 350,
            height: 350,
            resizeMode: 'contain',
          }}
          source={{
            uri: 'https://i.ibb.co/WsVyc7n/output-onlinepngtools.png',
          }}
        />
      </View>
    );
  }
}
