import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isPlatformWeb = () => (Platform.OS ===  'web')

export const setItem = (key: string, value: string) => {
    return isPlatformWeb() ? AsyncStorage.setItem(key, value) : SecureStore.setItemAsync(key, value)
}

export const getItem = (key: string) => {
    return isPlatformWeb() ? AsyncStorage.getItem(key) : SecureStore.getItemAsync(key)
}

export const removeItem = (key: string) => {
    return isPlatformWeb() ? AsyncStorage.removeItem(key) : SecureStore.deleteItemAsync(key)
}