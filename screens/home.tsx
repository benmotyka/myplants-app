import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../App";
import plantsApi from "config/api/plants";
import PlantPreview from "components/Plant/Plant";
import { numberOfColumns } from "components/Plant/Plant.styles";
import PlantsTutorial from "components/PlantsTutorial/PlantsTutorial";
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

  useEffect(() => {
    if (!isFocused) return;
    (async () => {
      try {
        const { plants } = await getUserPlants();
        dispatch(plantsAction.setUserPlants(plants));
        setDataSource(plants);
      } catch (error) {
        dispatch(userAction.removeUserDetails());
        console.error(error);
        navigation.navigate("login");
      }
    })();
  }, [isFocused]);

  return (
    <ScreenContainer>
      {dataSource ? (
        <>
          <FlatList
            data={dataSource}
            renderItem={({ item }) => (
              <PlantPreview
                id={item.id}
                name={item.name}
                imgSrc={require("../assets/plants/default_plant.webp")}
                navigation={navigation}
                onSlidingStart={() => setAllowScrolling(false)}
                onSlidingFinish={() => setAllowScrolling(true)}
                latestWatering={item.latestWatering}
              />
            )}
            numColumns={numberOfColumns}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
            scrollEnabled={allowScrolling}
          />
          {!dataSource.length ? <PlantsTutorial /> : null}
        </>
      ) : null}
      <HomeSettings navigation={navigation} />
    </ScreenContainer>
  );
};

export default HomeScreen;
