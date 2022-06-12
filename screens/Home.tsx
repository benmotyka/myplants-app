import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, View } from "react-native";

import Plant from "../components/Plant/Plant";
import { HomeProps } from "../App";
import { ScreenContainer } from "../styles/shared";
import HomeSettings from "../components/HomeSettings/HomeSettings";

interface Plant {
  id: number;
  name: string;
}

const HomeScreen = ({ route, navigation }: HomeProps) => {
  const [dataSource, setDataSource] = useState<Plant[]>();

  useEffect(() => {
    const items = Array.apply(null, Array(16)).map((item, index) => {
      return {
        id: index,
        name: `kwiatek_${index}`,
      };
    });
    setDataSource(items);
  }, []);
  return (
      <ScreenContainer>
        <ScrollView>
        {dataSource ? (
          <SafeAreaView>
            {/* {dataSource.length % 2 === 0 ? (
              <>
                <FlatList
                  data={dataSource}
                  renderItem={({ item }) => (
                    <Plant
                      name={item.name}
                      imgSrc={require("../assets/flower.jpg")}
                      navigation={navigation}
                    />
                  )}
                  numColumns={2}
                  keyExtractor={(item, index) => index.toString()}
                />
                <AddNewPlant />
              </>
            ) : (
              <FlatList
                data={dataSource}
                renderItem={({ item, index }) => {
                  if (index + 1 >= dataSource.length) {
                    return (
                      <>
                        <Plant
                          name={item.name}
                          imgSrc={require("../assets/flower.jpg")}
                          navigation={navigation}
                        />
                        <AddNewPlant />
                      </>
                    );
                  }
                  return (
                    <Plant
                      name={item.name}
                      imgSrc={require("../assets/flower.jpg")}
                      navigation={navigation}
                    />
                  );
                }}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
              />
            )} */}
            <FlatList
              data={dataSource}
              renderItem={({ item }) => (
                <Plant
                  name={item.name}
                  imgSrc={require("../assets/flower.jpg")}
                  navigation={navigation}
                />
              )}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              style={{paddingBottom: 80}}
            />
          </SafeAreaView>
        ) : null}
        </ScrollView>
        <HomeSettings/>
      </ScreenContainer>
  );
};

export default HomeScreen;
