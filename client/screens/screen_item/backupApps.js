import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React, {Component} from 'react';
import {Share} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import Login from './screens/Login';
// import ForYou from './screens/ForYou';
// import ChooseEpisode from './screens/Episode';
// import WatchToon from './screens/WatchToon';
// import MyLonetoon from './screens/MyLonetoon';
// import CreateLonetoon from './screens/CreateLonetoon';
// import CreateEpisode from './screens/CreateEpisode';
// import EditLonetoon from './screens/EditLonetoon';
// import EditEpisode from './screens/EditEpisode';
// import startScreen from './screens/startScreen';
// import Config from './screens/Config';
// import Register from './screens/Register';

const onShare = async shareMsg => {
  try {
    const result = await Share.share({
      message: shareMsg,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const LoginScreenTab = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: ForYou,
    navigationOptions: {
      header: null,
    },
  },
  Episode: {
    screen: ChooseEpisode,
    navigationOptions: ({navigation}) => ({
      title: navigation.getParam('title', 'default'),
      headerRight: (
        <Icon
          style={{fontSize: 30, marginRight: 10}}
          name="share"
          onPress={() => onShare('Let me share this')}
        />
      ),
    }),
  },
  ReadToon: {
    screen: WatchToon,
    navigationOptions: ({navigation}) => ({
      title: navigation.getParam('title', 'DefaultTitle'),
      headerRight: (
        <Icon
          style={{fontSize: 30, marginRight: 10}}
          name="share"
          onPress={() => onShare('Let me share this')}
        />
      ),
    }),
  },
  MyToon: {
    screen: MyLonetoon,
    navigationOptions: {
      title: 'My Lonetoon',
    },
  },
  CreateLonetoon: {
    screen: CreateLonetoon,
    navigationOptions: {
      title: 'Create Lonetoon',
      headerRight: (
        <Icon
          onPress={() => alert('Success')}
          name="check"
          style={{fontSize: 30, color: 'Create Episode', marginRight: 15}}
        />
      ),
    },
  },
  CreateEpisode: {
    screen: CreateEpisode,
    navigationOptions: {
      title: 'Create Episode',
      headerRight: (
        <Icon
          onPress={() => alert('Success')}
          name="check"
          style={{
            fontSize: 30,
            color: 'rgb(185,145,102)',
            marginRight: 15,
          }}
        />
      ),
    },
  },
  EditLonetoon: {
    screen: EditLonetoon,
    navigationOptions: {
      title: 'Edit My Lonetoon',
      headerRight: (
        <Icon
          onPress={() => alert('Success')}
          name="check"
          style={{fontSize: 30, color: 'rgb(185,145,102)', marginRight: 15}}
        />
      ),
    },
  },
  EditEpisode: {
    screen: EditEpisode,
    navigationOptions: {
      title: 'Edit Episode',
      headerRight: (
        <Icon
          onPress={() => alert('Success')}
          name="check"
          style={{fontSize: 30, color: 'orange', marginRight: 15}}
        />
      ),
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header: null,
    },
  },
  startScreen: {
    screen: startScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const AppContainer = createSwitchNavigator(
  {
    startScreen: {
      screen: startScreen,
    },
    Auth: LoginScreenTab,
    App: AppNavigator,
  },
  // {
  //   Auth: LoginScreenTab,
  //   App: AppNavigator,
  // },
  // {
  //   initialRouteName: 'Auth',
  // },
);

export default createAppContainer(AppContainer);
