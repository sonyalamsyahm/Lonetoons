import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Item, Input, Button} from 'native-base';

const listData = [
  {
    title: 'Ep. 1',
    image:
      'https://66.media.tumblr.com/b23f2200f6158669967e00fbca9022a6/tumblr_ovfv41J7WU1w8z7sho1_1280.jpg',
    date: '8 August 2019',
  },
  {
    title: 'Ep. 2',
    image: 'https://i.redd.it/gmvbwlihhgcz.jpg',
    date: '13 August 2019',
  },
  {
    title: 'Ep. 3',
    image:
      'https://i.pinimg.com/originals/8f/10/33/8f1033288d189e6ee7940575d1b6c445.png',
    date: '19 August 2019',
  },
];

class CreateLonetoon extends Component {
  addNew = () => {
    return (
      <View style={{marginBottom: 10}}>
        <Text style={{fontSize: sizeOfFont, marginBottom: 5, marginLeft: 4}}>
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
        <Text style={{fontSize: sizeOfFont}}>Episode</Text>
        <FlatList
          style={{
            height: Dimensions.get('window').height - 350,
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
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('EditEpisode')}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 0,
              marginTop: 10,
              marginLeft: 4,
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
              <Text style={{fontSize: 18, marginTop: 5, color: '#515969'}}>
                {date}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
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
          }}>
          <Text style={{fontSize: sizeOfFont, color: 'white'}}>
            Add Episode
          </Text>
        </Button>
        <Button
          style={{
            justifyContent: 'center',
            backgroundColor: '#ea3c53',
            marginTop: 10,
          }}>
          <Text style={{fontSize: sizeOfFont, color: 'white'}}>
            Delete Lonetoon
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
    backgroundColor: '#ffcc99',
  },
});

const sizeOfFont = 20;

export default CreateLonetoon;
