import React, { FunctionComponent, useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import Plant from "../components/Plant/Plant";

interface Plant {
  id: number;
  name: string;
}

const Home: FunctionComponent = () => {
  const [dataSource, setDataSource] = useState<Plant[]>();

  useEffect(() => {
    const items = Array.apply(null, Array(9)).map((item, index) => {
      return {
        id: index,
        name: `kwiatek_${index}`,
      };
    });
    setDataSource(items);
  }, []);
  return (
    <>
      <View style={{ height: "100%", width: "100%" }}>
        <SafeAreaView>
          <FlatList
            data={dataSource}
            renderItem={({ item }) => (
              <Plant name={item.name} imgSrc={require("../assets/flower.jpg")} />
            )}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
      </View>
    </>
  );
};

export default Home;
