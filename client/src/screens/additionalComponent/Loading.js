import {PacmanIndicator} from 'react-native-indicators';
import {View} from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <PacmanIndicator color="rgb(185,145,102)" />
    </View>
  );
};

export default Loading;
