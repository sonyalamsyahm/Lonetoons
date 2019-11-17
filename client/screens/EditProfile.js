import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Container, Content, Body, Item, Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      videoSource: null,
    };
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  iconic = () => {
    return (
      <View style={{flex: 5.5, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.selectPhotoTapped()}>
            <Icon
              style={{fontSize: 150, color: '#f1f2f3', marginTop: -10}}
              name="user-circle-o"
            />
            <View>
              <Icon
                style={{marginLeft: 110, marginTop: -30, fontSize: 25}}
                name="camera"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  myToon = () => {
    return (
      <View
        style={{
          margin: 10,
        }}>
        <Item regular style={{backgroundColor: 'white'}}>
          <Input style={{fontSize: 20}} placeholder="Edit Your Name" />
        </Item>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.Layout}>
        <View
          style={{
            flex: 3.5,
            backgroundColor: 'white',
            margin: 10,
            marginTop: 20,
          }}>
          <Body>{this.iconic()}</Body>
        </View>
        <View style={{flex: 4.5}}>{this.myToon()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Layout: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
});

export default Profile;
