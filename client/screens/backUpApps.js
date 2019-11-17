import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './screens/Login';
import ForYou from './screens/ForYou';

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
});

const AppContainer = createSwitchNavigator(
  {
    Auth: LoginScreenTab,
    App: AppNavigator,
  },
  {
    initialRouteName: 'App',
  },
);

export default createAppContainer(AppContainer);
