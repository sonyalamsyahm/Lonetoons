import React, {Component} from 'react';
// import {View, Text} from 'react-native';

// export default class Apps extends Component {
//   render() {
//     return (
//       <View>
//         <Text>Test</Text>
//       </View>
//     );
//   }
// }

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {Share, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {cusFont} from './font';

import Login from './public/Login';
// import ForYouScreen from './private/ForYou';
import RegisterScreen from './public/Register';
import startScreen from './public/startScreen';
import ForYouScreen from './private/ForYou';
// import Favorite from './private/Favorite';
// import Profile from './private/Profile';
import ChooseEpisode from './private/Episode';
import WatchToon from './private/WatchToon';
import Favorite from './private/Favorite';
import Profile from './private/Profile';
import EditProfile from './private/EditProfile';

const myForYouTab = createStackNavigator({
  ForYou: {
    screen: ForYouScreen,
    navigationOptions: {
      header: null,
    },
  },
  Episode: {
    screen: ChooseEpisode,
    navigationOptions: ({navigation}) => ({
      title: navigation.getParam('title', 'default'),
      headerTitleStyle: {
        fontFamily: cusFont,
      },
      headerRight: (
        <Icon
          style={{fontSize: 30, marginRight: 10}}
          name="share"
          onPress={() => onShare('Let me share this')}
        />
      ),
      headerStyle: {
        backgroundColor: 'rgba(45, 196, 171, 0.7)',
      },
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
      headerStyle: {
        backgroundColor: 'rgba(45, 196, 171, 0.7)',
      },
    }),
  },
});

const myFavoriteTab = createStackNavigator({
  Favorite: {
    screen: Favorite,
    navigationOptions: {
      header: null,
    },
  },
});

myFavoriteTab.navigationOptions = () => ({
  tabBarIcon: ({tintColor}) => (
    <View>
      <Icon style={[{color: tintColor}]} size={25} name={'star'} />
    </View>
  ),
});

const myProfileTab = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
});

myProfileTab.navigationOptions = ({navigation}) => {
  const {routes} = navigation.state;
  let tabBarVisible;

  if (routes.length > 1) {
    routes.map(route => {
      if (route.routeName === 'Profile') {
        tabBarVisible = true;
      } else {
        tabBarVisible = false;
      }
    });
  }

  return {
    tabBarVisible,
    tabBarIcon: ({tintColor}) => (
      <View>
        <Icon style={[{color: tintColor}]} size={25} name={'account'} />
      </View>
    ),
  };
};

myForYouTab.navigationOptions = ({navigation}) => {
  const {routes} = navigation.state;
  let tabBarVisible;

  if (routes.length > 1) {
    routes.map(route => {
      if (route.routeName === 'ForYou') {
        tabBarVisible = true;
      } else {
        tabBarVisible = false;
      }
    });
  }

  return {
    tabBarVisible,
    tabBarIcon: ({tintColor}) => (
      <View>
        <Icon style={[{color: tintColor}]} size={25} name={'view-dashboard'} />
      </View>
    ),
  };
};

const LoginScreenTab = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
});

const PrivateTab = createBottomTabNavigator(
  {
    ForYou: myForYouTab,
    Favorite: myFavoriteTab,
    Profile: myProfileTab,
  },
  {
    tabBarOptions: {
      activeTintColor: 'rgb(25, 148, 179)',
      inactiveTintColor: '#d3d3d3',
      labelStyle: {
        fontFamily: cusFont,
        fontSize: 14,
      },
    },

    // barStyle: {
    //   backgroundColor: '#fffff0',
    //   borderTopWidth: StyleSheet.hairlineWidth,
    //   borderStyle: 'solid',
    //   borderColor: '#d0cfd0',
    // },
  },
);

const AppContainer = createSwitchNavigator(
  {
    startScreen: {
      screen: startScreen,
    },
    Public: LoginScreenTab,
    Private: PrivateTab,
  },
  {
    initialRouteName: 'startScreen',
  },
);

export default createAppContainer(AppContainer);
