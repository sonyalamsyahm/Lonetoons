import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {Body, Container, Content, Item, Input, Button} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

const listData = [
  {
    title: 'Episode 1',
    image:
      'https://66.media.tumblr.com/b23f2200f6158669967e00fbca9022a6/tumblr_ovfv41J7WU1w8z7sho1_1280.jpg',
    date: '8 August 2019',
  },
  {
    title: 'Episode 2',
    image: 'https://i.redd.it/gmvbwlihhgcz.jpg',
    date: '13 August 2019',
  },
  {
    title: 'Episode 3',
    image:
      'https://i.pinimg.com/originals/8f/10/33/8f1033288d189e6ee7940575d1b6c445.png',
    date: '19 August 2019',
  },
];

class CreateLonetoon extends Component {
  addNew = () => {
    return (
      <View style={{marginBottom: 15}}>
        <Text style={{fontSize: sizeOfFont, marginBottom: 2, marginLeft: 5}}>
          Title
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
        <Text style={{fontSize: sizeOfFont, marginLeft: 5}}>Episode</Text>
        <FlatList
          style={{
            height: Dimensions.get('window').height - 300,
            marginBottom: 20,
          }}
          data={listData}
          renderItem={({item}) =>
            this.myListData(item.title, item.image, item.date)
          }
          keyExtractor={item => item.title}
        />
      </View>
    );
  };

  myListData = (title, image, date) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
          marginTop: 5,
          marginLeft: 5,
          backgroundColor: 'white',
          borderWidth: 2,
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
          <Text style={{fontSize: sizeOfFont, marginTop: 5}}>{date}</Text>
        </View>
      </View>
    );
  };

  addEpisode = () => {
    return (
      <View>
        <Button
          style={{
            justifyContent: 'center',
            backgroundColor: 'rgba(128,128,128,1)',
          }}
          onPress={() => this.props.navigation.navigate('CreateEpisode')}>
          <Text style={{fontSize: sizeOfFont, color: 'white'}}>
            + Add Episode
          </Text>
        </Button>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.Container}>
        <View style={{backgroundColor: '#f2f3f4', flex: 1}}>
          <View style={{margin: 10}}>
            {this.addNew()}
            {this.ListItem()}
            {this.addEpisode()}
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
