import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, FlatList, Text } from "react-native";
import { Octicons } from "@expo/vector-icons";
import styles from "../../styles";

const FlowersList = (props) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const items = Array.apply(null, Array(11)).map((item, index) => {
      return {
        id: index,
        name: `kwiatek_${index}`,
      };
    });
    setDataSource(items);
  }, []);

  return (
      <SafeAreaView>
        <FlatList
          data={dataSource}
          style={{ marginBottom: 60 }}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
              <View style={styles.listItem}>
                <Text>{item.name}</Text>
              </View>
            </View>
          )}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
  );
};

export default FlowersList;
