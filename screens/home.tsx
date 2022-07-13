import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Plant from "../components/Plant/Plant";
import { RootStackParamList } from "../App";
import { ScreenContainer } from "../styles/shared";
import HomeSettings from "../components/HomeSettings/HomeSettings";
import { IPlant } from "../interfaces/IPlant";
import { plantsAction } from "../store/actions";
import plantsApi from "../config/api/plants";
import { IUserDetails } from "../interfaces/IUserDetails";
import { State } from "../store/reducers";

type HomeProps = NativeStackScreenProps<RootStackParamList, "home">;

const HomeScreen = ({ navigation }: HomeProps): JSX.Element => {
  const [dataSource, setDataSource] = useState<IPlant[]>();

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const { userDetails }: { userDetails: IUserDetails } = useSelector(
    (state: State) => state.user
  );

  const getUserPlants = async () => {
    try {
      const { data } = await plantsApi.get<{ plants: IPlant[] }>("plants", {
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
        console.error(error);
        navigation.navigate("login");
      }
    })();
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
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      ) : null}
      <HomeSettings navigation={navigation} />
    </ScreenContainer>
  );
};

export default HomeScreen;
