import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WEB_PLATFORM = 'web'

export const setItem = async (key: string, value: string) => {
    if (Platform.OS === WEB_PLATFORM) {
        return await AsyncStorage.setItem(key, value)
    } 
    return await SecureStore.setItemAsync(key, value)
}

export const getItem = async (key: string) => {
    if (Platform.OS === WEB_PLATFORM) {
        return await AsyncStorage.getItem(key)
    } 
    return await SecureStore.getItemAsync(key)
}