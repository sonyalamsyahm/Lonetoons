import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {getData} from '../../config/config';

export default class FirstPage extends Component {
  async componentDidMount() {
    const data = await getData();
    try {
      if (data) {
        this.props.navigation.navigate('Private');
      } else {
        this.props.navigation.navigate('Public');
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
