import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {Item, Input, Button} from 'native-base';

const listData = [
  {
    title: 'cover.png',
    image:
      'https://66.media.tumblr.com/b23f2200f6158669967e00fbca9022a6/tumblr_ovfv41J7WU1w8z7sho1_1280.jpg',
  },
  {
    title: 'introduction.png',
    image: 'https://i.redd.it/gmvbwlihhgcz.jpg',
  },
  {
    title: 'story 1.png',
    image:
      'https://i.pinimg.com/originals/8f/10/33/8f1033288d189e6ee7940575d1b6c445.png',
  },
];

class CreateLonetoon extends Component {
  nameImage = () => {
    return (
      <View style={{marginBottom: 10}}>
        <Text style={{fontSize: sizeOfFont, marginBottom: 5, marginLeft: 4}}>
          Name
        </Text>
        <Item regular>
          <Input
            placeholder="Here"
            style={{
              backgroundColor: 'white',
              fontSize: 18,
            }}
          />
        </Item>
      </View>
    );
  };

  ListItem = () => {
    return (
      <View>
        <Text style={{fontSize: sizeOfFont}}>Add Images</Text>
        <FlatList
          style={{
            height: Dimensions.get('window').height - 350,
            marginBottom: 20,
          }}
          data={listData}
          renderItem={({item}) => this.myListData(item.title, item.image)}
          keyExtractor={item => item.title}
        />
      </View>
    );
  };

  myListData = (title, image) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 5,
          marginTop: 10,
          borderWidth: 2,
          backgroundColor: 'white',
          borderColor: 'white',
        }}>
        <Image style={{height: 110, width: 110}} source={{uri: image}} />
        <View
          style={{
            justifyContent: 'center',
            marginLeft: 20,
            marginTop: -10,
          }}>
          <Text style={{fontSize: sizeOfFont}}>{title}</Text>
          <Button
            style={{
              width: 125,
              justifyContent: 'center',
              backgroundColor: '#ea3c53',
              height: 35,
              marginTop: 15,
            }}>
            <Text style={{fontSize: sizeOfFont, color: 'white'}}>Delete</Text>
          </Button>
        </View>
      </View>
    );
  };

  addImage = () => {
    return (
      <View>
        <Button
          style={{
            justifyContent: 'center',
            backgroundColor: 'rgba(128,128,128,1)',
          }}>
          <Text style={{fontSize: sizeOfFont, color: 'white'}}>+ Images</Text>
        </Button>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.Container}>
        <View style={{backgroundColor: '#f2f3f4', flex: 1}}>
          <View style={{margin: 10}}>
            {this.nameImage()}
            {this.ListItem()}
            {this.addImage()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
});

const sizeOfFont = 20;

export default CreateLonetoon;
