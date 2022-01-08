import { useState, useEffect } from "react";
import {
    SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import styles from "../../styles";

const HomeList = (props) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const items = Array.apply(null, Array(6)).map((item, index) => {
      return {
        id: index,
        name: `nazwa_${index}`,
      };
    });
    setDataSource(items);
  }, []);

  return (
    <SafeAreaView >
    <FlatList
      data={dataSource}
      renderItem={({ item }) => (
        <View
          style={styles.homeListContainer}
        >
          <View style={styles.homeListItem}>
            <Text>hej</Text>
          </View>
        </View>
      )}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
    />
    </SafeAreaView>
  );
};

export default HomeList;
