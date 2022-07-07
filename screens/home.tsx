import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import Plant from "../components/Plant/Plant";
import { RootStackParamList } from "../App";
import { ScreenContainer } from "../styles/shared";
import HomeSettings from "../components/HomeSettings/HomeSettings";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IPlant } from "../interfaces/IPlant";
import { getUserPlants } from "../services/plants/getUserPlants";
import { useIsFocused } from "@react-navigation/native";

type HomeProps = NativeStackScreenProps<RootStackParamList, "home">;

const HomeScreen = ({ navigation }: HomeProps): JSX.Element => {
  const [dataSource, setDataSource] = useState<IPlant[]>();
  
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return
    (async() => {
      const items = await getUserPlants({navigation})
      setDataSource(items)
    })()
  }, [isFocused]);

  return (
    <ScreenContainer>
        {dataSource ? (
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
        ) : null}
      <HomeSettings navigation={navigation} />
    </ScreenContainer>
  );
};

export default HomeScreen;
