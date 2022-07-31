import React, { useEffect, useState } from "react";
import { FlatList, BackHandler } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../App";
import plantsApi from "config/api/plants";
import PlantPreview from "components/Plant/Plant";
import { numberOfColumns } from "components/Plant/Plant.styles";
import AddPlantSuggestion from "components/AddPlantSuggestion/AddPlantSuggestion";
import HomeSettings from "components/HomeSettings/HomeSettings";
import { Plant } from "interfaces/Plant";
import { UserDetails } from "interfaces/UserDetails";
import { plantsAction, userAction } from "store/actions";
import { State } from "store/reducers";
import { ScreenContainer } from "styles/shared";

type HomeProps = NativeStackScreenProps<RootStackParamList, "home">;

const HomeScreen = ({ navigation }: HomeProps): JSX.Element => {
  const [dataSource, setDataSource] = useState<Plant[]>();
  const [allowScrolling, setAllowScrolling] = useState(true);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const { userDetails }: { userDetails: UserDetails } = useSelector(
    (state: State) => state.user
  );

  const getUserPlants = async () => {
    try {
      const { data } = await plantsApi.get<{ plants: Plant[] }>("plants", {
        headers: {
          Authorization: `Bearer ${userDetails.jwt}`,
        },
      });
      return data;
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
        dispatch(plantsAction.setUserPlants(sortedPlants));
        setDataSource(sortedPlants);
      } catch (error) {
        dispatch(userAction.removeUserDetails());
        console.error(error);
        navigation.navigate("login");
      }
    })();

    // Workaround for devices with hardware back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
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
      ) : null}
      <HomeSettings navigation={navigation} />
    </ScreenContainer>
  );
};

export default HomeScreen;
