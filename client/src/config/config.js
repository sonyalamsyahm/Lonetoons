import AsyncStorage from '@react-native-community/async-storage';

// export const URL = 'https://lonetoon.herokuapp.com/api/v1';
export const URL = 'http://192.168.1.28:3000/api/v1';

// export const getToken = async () => {
//   try {
//     const value = await AsyncStorage.getItem('userToken');
//     return value;
//   } catch (e) {
//     console.log(e);
//   }
// };

export const getIdEpisode = async () => {
  try {
    const value = await AsyncStorage.getItem('idEpisode');
    return value;
  } catch (e) {
    console.log(e);
  }
};

// export const getId = async () => {
//   try {
//     const value = await AsyncStorage('idUser');
//     return value;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getData = async () => {
  try {
    const data = await AsyncStorage.getItem('user');
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};
