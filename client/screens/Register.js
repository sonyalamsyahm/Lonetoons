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
  View,
} from 'native-base';
import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {URL} from './Config';
import axios from 'axios';

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

  //   storeData = async data => {
  //     try {
  //       await AsyncStorage.setItem('userToken', data);
  //       return this.props.navigation.navigate('App');
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  tryNavigate = () => {
    axios
      .post(`${URL}/register`, {
        email: this.state.inputEmail,
        password: this.state.inputPassword,
      })
      .then(res => {
        console.log(res);
        //this.props.navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const buttonStyle = this.buttonValidation()
      ? styles.buttonLayoutDisable
      : styles.buttonLayoutEnable;
    const textStyle = this.buttonValidation()
      ? styles.TextButtonDisable
      : styles.TextButtonEnable;
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
              <View
                style={{
                  borderBottomWidth: 1,
                  marginBottom: 45,
                  marginTop: 30,
                  alignItems: 'center',
                }}>
                <Text style={styles.Texting}>REGISTER</Text>
              </View>
              {/* <Label style={styles.Label}>E-mail</Label> */}
              <Item regular style={styles.Item}>
                <Input
                  placeholder="New email"
                  style={styles.Input}
                  onChangeText={input => this.validationOfEmail(input)}
                />
              </Item>
              {/* <Label style={styles.Label}>Password</Label> */}
              <Item regular style={{backgroundColor: 'white'}}>
                <Input
                  placeholder="New password"
                  style={styles.Input}
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
                <Text style={textStyle}>Register</Text>
              </Button>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.Label}>Already have account?</Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Login')}>
                  <Text style={{fontSize: 18, color: 'blue'}}> Login</Text>
                </TouchableOpacity>
              </View>
            </Content>
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
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: -70,
  },
  Item: {
    marginTop: 80,
  },
  Form: {
    marginLeft: 10,
    marginRight: 10,
    //backgroundColor: 'rgb(185,145,102)',
  },
  Label: {
    // marginBottom: 4,
    // color: 'black',
    fontSize: 18,
  },
  Texting: {
    fontSize: 25,
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
    marginTop: 22,
    marginBottom: 10,
    padding: 130,
    backgroundColor: 'rgba(190,190,190,1)',
  },
  buttonLayoutEnable: {
    marginTop: 22,
    marginBottom: 10,
    padding: 130,
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
    backgroundColor: 'white',
  },
  Icon: {
    fontSize: 30,
    marginRight: 12,
  },
});
