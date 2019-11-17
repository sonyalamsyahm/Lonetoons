import React, {Component} from 'react';
import {
  Container,
  Content,
  Item,
  Input,
  Body,
  Form,
  Label,
  Button,
} from 'native-base';
import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {URL} from './Config';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      email: false,
      password: false,
      button: true,
      colorOfButton: 'grey',
      nameOfIcon: 'eye-slash',
      securePassword: true,
      inputEmail: '',
      inputPassword: '',
      wrongPassword: false,
      wrongEmail: false,
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
      this.setState({nameOfIcon: 'eye'});
    } else {
      this.setState({securePassword: true});
      this.setState({nameOfIcon: 'eye-slash'});
    }
  };

  storeData = async data => {
    try {
      await AsyncStorage.setItem('userToken', data);
      return this.props.navigation.navigate('App');
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
        this.storeData(res.data.token);
      })
      .catch(error => {
        const {message} = error.response.data;
        if (message === 'Password wrong') {
          this.setState({wrongPassword: true});
        } else if (message === 'Unregistered emai') {
          this.setState({wrongEmail: true});
        }
      });
  };

  handleDialog = () => {
    this.setState({wrongPassword: false});
    this.setState({wrongEmail: false});
  };

  render() {
    const buttonStyle = this.buttonValidation()
      ? styles.buttonLayoutDisable
      : styles.buttonLayoutEnable;
    const textStyle = this.buttonValidation()
      ? styles.TextButtonDisable
      : styles.TextButtonEnable;
    const textError = () => {
      if (this.state.wrongEmail) {
        return 'Email is unregistered !';
      } else if (this.state.wrongPassword) {
        return 'Wrong Password !';
      }
    };
    const condition = () => {
      if (this.state.wrongEmail === true || this.state.wrongPassword === true) {
        return true;
      } else {
        return false;
      }
    };
    return (
      <Container style={styles.Layout}>
        <Content>
          <Body style={styles.Item}>
            <Image
              style={styles.Container}
              source={{
                uri: 'https://i.ibb.co/WsVyc7n/output-onlinepngtools.png',
              }}
            />
          </Body>
          <Form style={styles.Form}>
            <Content style={styles.layoutLabelInput}>
              <Text style={styles.Texting}>LOG IN</Text>
              <Text style={styles.secondTexting}>
                Login with your account LoneToon
              </Text>
              {/* <Label style={styles.Label}>E-mail</Label> */}
              <Item regular style={styles.InputForm}>
                <Input
                  style={styles.Input}
                  placeholder="Email"
                  onChangeText={input => this.validationOfEmail(input)}
                />
              </Item>
              {/* <Label style={styles.Label}>Password</Label> */}
              <Item regular style={styles.InputForm}>
                <Input
                  style={styles.Input}
                  placeholder="Password"
                  onChangeText={input => this.validationOfPassword(input)}
                  secureTextEntry={this.state.securePassword}
                />
                <Icon
                  name={this.state.nameOfIcon}
                  style={styles.Icon}
                  onPress={() => this.showPassword()}></Icon>
              </Item>
              <Button
                disabled={this.buttonValidation()}
                onPress={() => this.tryNavigate()}
                style={buttonStyle}>
                <Text style={textStyle}>Log In</Text>
              </Button>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Text style={{fontSize: 18}}>New User?</Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Register')}>
                  <Text style={{fontSize: 18, color: 'blue'}}> Register</Text>
                </TouchableOpacity>
              </View>
            </Content>
            <Modal isVisible={condition()}>
              {console.log(condition())}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  padding: 15,
                }}>
                <Text style={{fontSize: 18}}>{textError()}</Text>
                <TouchableOpacity onPress={this.handleDialog}>
                  <Text style={{fontSize: 15, marginTop: 10, color: 'blue'}}>
                    Try Again
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </Form>
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
  Container: {
    width: 320,
    height: 270,
    resizeMode: 'contain',
    marginBottom: -70,
  },
  Item: {
    marginTop: 80,
  },
  Form: {
    marginLeft: 10,
    marginRight: 10,
    //backgroundColor: 'rgba(160,80,60,1)',
    //backgroundColor: 'transparent',
  },
  Label: {
    marginBottom: 4,
    color: 'black',
    fontSize: 20,
  },
  Texting: {
    marginRight: 130,
    marginLeft: 130,
    fontSize: 25,
    marginTop: 15,
    color: 'black',
  },
  secondTexting: {
    marginRight: 30,
    marginLeft: 30,
    fontSize: 18,
    marginBottom: 40,
    color: 'black',
  },
  layoutLabelInput: {
    marginLeft: 10,
    marginRight: 10,
  },
  buttonLayoutDisable: {
    marginTop: 18,
    marginBottom: 15,
    padding: 147,
    backgroundColor: 'rgba(190,190,190,1)',
  },
  buttonLayoutEnable: {
    marginTop: 18,
    marginBottom: 15,
    padding: 147,
    backgroundColor: 'rgba(128,128,128,1)',
  },
  TextButtonDisable: {
    fontSize: 20,
    color: 'rgba(0,0,0,0.1)',
  },
  TextButtonEnable: {
    fontSize: 20,
    color: 'white',
  },
  Item: {
    marginBottom: 10,
  },
  Input: {
    color: 'black',
    fontSize: 20,
  },
  Icon: {
    fontSize: 30,
    marginRight: 12,
  },
  InputForm: {
    backgroundColor: 'white',
    marginTop: 5,
  },
});
