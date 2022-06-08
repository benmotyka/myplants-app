import { useState, useEffect } from "react";
import { SafeAreaView, View, FlatList } from "react-native";

import Flower from "../components/Flower/Flower";

import styles from "../styles/common";

const HomeScreen = ({ navigation }) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const items = Array.apply(null, Array(6)).map((item, index) => {
      return {
        id: index,
        name: `kwiatek_${index}`,
      };
    });
    setDataSource(items);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={dataSource}
          style={{ marginBottom: 60 }}
          renderItem={({ item }) => (
            <Flower name={item.name} imgSrc={require("./flower.jpg")} />
          )}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
