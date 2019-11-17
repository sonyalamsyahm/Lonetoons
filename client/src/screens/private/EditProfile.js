import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Item, Input, Header, Title, Right} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import Background from '../../../Background/Background.jpg';
import {cusFont} from '../font';
import {connect} from 'react-redux';
import fetchPutProfile from '../../_store/profile';
import {PUT_METHOD} from '../../config/setConst';
import {getData} from '../../config/config';
import {setHeaderAuth} from '../../config/api';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      videoSource: null,
      input: '',
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

  imageProfile = () => {
    return (
      <TouchableOpacity style={{alignItems: 'flex-end'}}>
        <Icon size={150} color={'#f2f0f4'} name="account-circle" />
        <Icon name="camera" style={styles.icon} size={35} />
      </TouchableOpacity>
    );
  };

  iconic = () => {
    return <View style={styles.viewIconic}>{this.imageProfile()}</View>;
  };

  handleInput = input => {
    this.setState({input});
  };

  name = data => {
    const name = '<------ Edit your name ------>';
    return (
      <View style={styles.viewName}>
        <View style={styles.viewNameSecondary}>
          <View style={styles.viewText}>
            <Text style={styles.name}>{name}</Text>
          </View>
          <Item regular style={styles.item}>
            <Input
              placeholder={data.name}
              style={styles.name}
              onChangeText={input => this.handleInput(input)}
            />
          </Item>
        </View>
      </View>
    );
  };

  handleChanges = async () => {
    const {navigation, fetchPutProfile, profile} = this.props;
    const input = this.state.input;
    const name = input ? input : profile.data.name;
    const data = await getData();
    setHeaderAuth(data.token);
    fetchPutProfile(PUT_METHOD, data.id, name);
    navigation.navigate('Profile');
  };

  header = () => {
    return (
      <Header
        style={styles.header}
        androidStatusBarColor="rgba(45, 196, 171, 0.7)">
        <Title style={styles.text}>Edit Profile</Title>
        <Right>
          <Icon name="check" onPress={() => this.handleChanges()} size={30} />
        </Right>
      </Header>
    );
  };

  render() {
    const {profile} = this.props;
    // console.log(profile);
    return (
      <View style={styles.Layout}>
        <ImageBackground style={styles.background} source={Background}>
          {this.header()}
          {this.iconic()}
          {this.name(profile.data)}
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
  fetchPutProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile);

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  Layout: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
  header: {
    backgroundColor: 'rgba(45, 196, 171, 0.7)',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontFamily: cusFont,
    color: 'black',
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
  icon: {
    marginTop: -50,
    marginRight: 10,
  },
  name: {
    fontFamily: cusFont,
    fontSize: 18,
  },
  viewName: {
    marginHorizontal: 10,
    borderRadius: 10,
  },
  viewText: {
    alignItems: 'center',
    marginBottom: 10,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 40,
  },
  viewNameSecondary: {
    padding: 10,
    backgroundColor: 'rgba(45, 196, 171, 0.7)',
    borderRadius: 15,
  },
});

// export default EditProfile;
