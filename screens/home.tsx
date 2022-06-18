import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView } from "react-native";

import Plant from "../components/Plant/Plant";
import { RootStackParamList } from "../App";
import { ScreenContainer } from "../styles/shared";
import HomeSettings from "../components/HomeSettings/HomeSettings";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IPlant } from "../interfaces/IPlant";

type HomeProps = NativeStackScreenProps<RootStackParamList, "home">;

const HomeScreen = ({ navigation }: HomeProps): JSX.Element => {
  const [dataSource, setDataSource] = useState<IPlant[]>();

  useEffect(() => {
    const items = Array.apply(null, Array(16)).map((item, index) => {
      return {
        id: `${index}kw`,
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
            <FlatList
              data={dataSource}
              renderItem={({ item }) => (
                <Plant
                  id={item.id}
                  name={item.name}
                  imgSrc={require("../assets/plants/default_plant.webp")}
                  navigation={navigation}
                />
              )}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              style={{ paddingBottom: 80 }}
            />
          </SafeAreaView>
        ) : null}
      </ScrollView>
      <HomeSettings navigation={navigation} />
    </ScreenContainer>
  );
};

export default HomeScreen;
