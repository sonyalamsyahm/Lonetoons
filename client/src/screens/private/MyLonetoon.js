import React, {Component} from 'react';
import {Container, Content, Text, Fab, Icon} from 'native-base';
import {
  StyleSheet,
  Image,
  FlatList,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const myLonetoonListItem = [
  {
    title: 'Adventure of Arya',
    image:
      'https://66.media.tumblr.com/b23f2200f6158669967e00fbca9022a6/tumblr_ovfv41J7WU1w8z7sho1_1280.jpg',
    episode: '98 Episode(s)',
  },
  {
    title: 'The Jon Snow',
    image: 'https://i.redd.it/gmvbwlihhgcz.jpg',
    episode: '95 Episode(s)',
  },
  {
    title: 'Mother of Dragons',
    image:
      'https://i.pinimg.com/originals/8f/10/33/8f1033288d189e6ee7940575d1b6c445.png',
    episode: 'Episode (s)',
  },
];

class MyLonetone extends Component {
  myToonItem = (title, images, numepisode) => {
    return (
      <View
        style={{
          margin: 10,
          backgroundColor: 'white',
          borderBottomWidth: 1,
        }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('EditLonetoon')}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                height: 110,
                width: 110,
                borderWidth: 3,
                borderColor: 'white',
              }}
              source={{uri: images}}
            />
            <View style={{margin: 25}}>
              <Text style={{marginBottom: 10, fontSize: 20}}>{title}</Text>
              <Text style={{fontSize: 18}}>{numepisode}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <Container style={styles.Container}>
        <View
          style={{
            backgroundColor: 'white',
            height: Dimensions.get('window').height - 100,
            marginTop: 10,
          }}>
          <View style={{margin: 10}}>
            <FlatList
              data={myLonetoonListItem}
              renderItem={({item}) =>
                this.myToonItem(item.title, item.image, item.episode)
              }
              keyExtractor={item => item.title}
            />
          </View>
          <Fab
            position="bottomRight"
            onPress={() => this.props.navigation.navigate('CreateLonetoon')}>
            <Icon name="add" />
          </Fab>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
});

export default MyLonetone;
