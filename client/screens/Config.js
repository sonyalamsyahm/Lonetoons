import AsyncStorage from '@react-native-community/async-storage';

export const URL = 'http://192.168.1.16:3000/api/v1';

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('userToken');
    return value;
  } catch (e) {
    console.log(e);
  }
};

export const getIdEpisode = async () => {
  try {
    const value = await AsyncStorage.getItem('idEpisode');
    return value;
  } catch (e) {
    console.log(e);
  }
};
