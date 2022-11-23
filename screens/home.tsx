import React, { useEffect, useState } from "react";
import { FlatList, BackHandler } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../App";
import PlantPreview from "components/Plant/Plant";
import { numberOfColumns } from "components/Plant/styles";
import AddPlantSuggestion from "components/AddPlantSuggestion";
import HomeSettings from "components/HomeSettings";
import { Plant } from "interfaces/Plant";
import { LoaderWrapper, ScreenContainer } from "styles/shared";
import Loader from "components/Loader";
import { usePlantsStore } from "store";
import { getPlants } from "services/plant";

type HomeProps = NativeStackScreenProps<RootStackParamList, "home">;

const HomeScreen = ({ navigation }: HomeProps): JSX.Element => {
  const [dataSource, setDataSource] = useState<Plant[]>();
  const [allowScrolling, setAllowScrolling] = useState(true);
  const isFocused = useIsFocused();

  const setUserPlants = usePlantsStore((store) => store.setUserPlants);

  const getUserPlants = async () => {
    try {
      return await getPlants();
    } catch (error) {
      throw new Error("error");
    }
  };

  const sortPlantsByCreatedAt = (plants: Plant[]): Plant[] =>
    plants.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  useEffect(() => {
    if (!isFocused) return;
    (async () => {
      try {
        const { plants } = await getUserPlants();
        const sortedPlants = sortPlantsByCreatedAt(plants);
        setUserPlants(sortedPlants);
        setDataSource(sortedPlants);
      } catch (error) {
        console.error(error);
      }
    })();

    // Workaround for devices with hardware back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, [isFocused]);

  return (
    <ScreenContainer>
      {dataSource ? (
        <>
          <FlatList
            data={dataSource}
            renderItem={({ item }) => {
              return (
                <PlantPreview
                  id={item.id}
                  name={item.name}
                  imgSrc={item.imgSrc}
                  navigation={navigation}
                  onSlidingStart={() => setAllowScrolling(false)}
                  onSlidingFinish={() => setAllowScrolling(true)}
                  latestWatering={item.latestWatering}
                  reminderFrequency={item.wateringReminderFrequency}
                />
              );
            }}
            numColumns={numberOfColumns}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
            scrollEnabled={allowScrolling}
          />
          {!dataSource.length ? <AddPlantSuggestion /> : null}
        </>
      ) : (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      <HomeSettings navigation={navigation} />
    </ScreenContainer>
  );
};

export default HomeScreen;
