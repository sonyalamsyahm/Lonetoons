import React, {Component} from 'react';
import {Item, Input} from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import {cusFont} from '../font';
import Background from '../../../Background/Background.jpg';
import {Button} from 'react-native-elements';

//import from folder
import {URL} from '../../config/config';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      email: false,
      password: false,
      button: true,
      colorOfButton: 'grey',
      nameOfIcon: 'eye',
      securePassword: true,
      inputEmail: '',
      inputPassword: '',
      showModal: false,
      message: '',
    };
  }

  validationOfEmail = input => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({inputEmail: input});
    if (reg.test(input) === false) {
      this.setState({email: false});
    } else {
      this.setState({email: true});
    }
  };

  validationOfPassword = input => {
    let word = input.length;
    this.setState({inputPassword: input});
    if (word < 5) {
      this.setState({password: false});
    } else {
      this.setState({password: true});
    }
  };

  buttonValidation = () => {
    let email = this.state.email;
    let password = this.state.password;
    if (email == true && password == true) {
      return false;
    } else {
      return true;
    }
  };

  showPassword = () => {
    if (this.state.securePassword == true) {
      this.setState({securePassword: false});
      this.setState({nameOfIcon: 'eye-off'});
    } else {
      this.setState({securePassword: true});
      this.setState({nameOfIcon: 'eye'});
    }
  };

  storeData = async (tokenUser, userId) => {
    try {
      let token = tokenUser;
      let idUser = userId;
      let data = {
        id: idUser,
        token: token,
      };
      await AsyncStorage.setItem('user', JSON.stringify(data));
      return this.props.navigation.navigate('Private');
    } catch (e) {
      console.log(e);
    }
  };

  tryNavigate = () => {
    axios
      .post(`${URL}/login`, {
        email: this.state.inputEmail,
        password: this.state.inputPassword,
      })
      .then(res => {
        this.storeData(res.data.token, res.data.id);
      })
      .catch(error => {
        const {message} = error.response.data;
        this.setState({showModal: true, message: message});
      });
  };

  form = () => {
    return (
      <View style={styles.form}>
        <View style={{marginHorizontal: 5}}>
          <View style={styles.viewText}>
            <Text style={[styles.text, {color: 'white'}]}>
              Login with your Lonetoon Account
            </Text>
          </View>
          <Item regular style={styles.item}>
            <Icon name="email" size={30} style={styles.icon} />
            <Input
              placeholder="Email"
              style={styles.input}
              onChangeText={input => this.validationOfEmail(input)}
            />
          </Item>
          <Item regular style={styles.item}>
            <Icon name="lock" size={30} style={styles.icon} />
            <Input
              placeholder="Password"
              style={styles.input}
              secureTextEntry={this.state.securePassword}
              onChangeText={input => this.validationOfPassword(input)}
            />
            <Icon
              name={this.state.nameOfIcon}
              style={styles.eye}
              size={30}
              onPress={() => this.showPassword()}
            />
          </Item>
          <Button
            title="Login"
            buttonStyle={styles.button}
            titleStyle={styles.titleButton}
            disabled={this.buttonValidation()}
            onPress={() => this.tryNavigate()}
          />
        </View>
      </View>
    );
  };

  modal = () => {
    const {showModal, message} = this.state;
    return (
      <Modal isVisible={showModal}>
        <View style={styles.viewModal}>
          <Text style={[styles.text, {marginBottom: 40, color: 'white'}]}>
            {message}
          </Text>
          <TouchableOpacity
            style={styles.opacity}
            onPress={() => this.setState({showModal: false})}>
            <Text style={styles.opacityText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.background} source={Background}>
          <View style={styles.view}>
            <Text style={styles.Title}>LONETOON</Text>
          </View>
          <View style={styles.view2}>{this.form()}</View>
          <View style={styles.view3}></View>
          {this.modal()}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100 %',
    height: '100 %',
  },
  view: {
    // backgroundColor: 'red',
    flex: 1.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  view2: {
    flex: 1.5,
    justifyContent: 'flex-end',
  },
  view3: {
    // backgroundColor: 'blue',
    flex: 0.5,
  },
  form: {
    backgroundColor: 'rgba(45, 196, 171, 0.7)',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    paddingTop: 50,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 5,
    height: 45,
  },
  button: {
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  icon: {
    marginLeft: 5,
  },
  input: {
    fontFamily: cusFont,
    fontSize: 18,
  },
  titleButton: {
    fontFamily: cusFont,
    fontSize: 20,
  },
  viewText: {
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 21,
    fontFamily: cusFont,
  },
  eye: {
    marginRight: 5,
  },
  Title: {
    fontFamily: cusFont,
    fontSize: 60,
  },
  viewModal: {
    backgroundColor: 'rgba(45, 196, 171, 0.9)',
    padding: 40,
    justifyContent: 'center',
    borderRadius: 15,
    // alignItems: 'center',
  },
  opacityText: {
    fontSize: 17,
    fontFamily: cusFont,
    color: 'white',
  },
  opacity: {
    alignItems: 'flex-end',
  },
});
