import React from "react";

import { SafeAreaView, ScrollView, View, FlatList, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "../../styles";

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Ustawienia aplikacji',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Aktualizuj',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Wyloguj się',
    },
  ];

  const Item = ({ title }) => (
    <View style={styles.settingsItem}>
      <Text>{title}</Text>
    </View>
  );
  
const SettingsList = () => {
    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );
  return (
    <View>
      <View style={styles.settingsAccountContainer}>
        <View style={styles.settingsAccountWrapper}>
          <Feather name="user" size={104} color="black" />
          <Text>Mój profil</Text>
        </View>
      </View>
      <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
    </View>
  );
};

export default SettingsList;
