import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/core";

import { RootStackParamList } from "../../App";
import Back from "components/Back/Back";
import { UserDetails } from "interfaces/UserDetails";
import { State } from "store/reducers";
import {
  ColumnCenterWrapper,
  Description,
  ScreenContainer,
  SmallHeader,
} from "styles/shared";
import {
  ItemDateHeader,
  HeaderWrapper,
  ActionText,
  ItemWrapper,
  HistoryIcon,
  ItemContainer,
  HistoryContainer,
} from "styles/screens/plantHistory.styles";
import plantsApi from "config/api/plants";
import { WateringData } from "interfaces/WateringData";
import Loader from "components/Loader/Loader";
import { formatToHour } from "util/date";

type PlantHistoryProps = NativeStackScreenProps<
  RootStackParamList,
  "plantHistory"
>;

const PlantHistory = ({
  route,
  navigation,
}: PlantHistoryProps): JSX.Element => {
  const plantId = route.params.plantId;
  const [wateringData, setWateringData] = React.useState<WateringData>();
  const isFocused = useIsFocused();

  const { userDetails }: { userDetails: UserDetails } = useSelector(
    (state: State) => state.user
  );

  const getPlantWateringHistory = async () => {
    try {
      const { data } = await plantsApi.get<{ waterings: WateringData }>(
        `watering/${plantId}`,
        {
          headers: {
            Authorization: `Bearer ${userDetails.jwt}`,
          },
        }
      );
      return data;
    } catch (error) {
      throw new Error("error");
    }
  };

  useEffect(() => {
    if (!isFocused) return;
    (async () => {
      try {
        const { waterings } = await getPlantWateringHistory();
        setWateringData(waterings);
      } catch (error) {
        console.error(error);
        navigation.navigate("login");
      }
    })();
  }, [isFocused]);

  return (
    <ScreenContainer>
      <Back navigation={navigation} />
      <ColumnCenterWrapper fullHeight>
        <HeaderWrapper>
          <SmallHeader>Watering history</SmallHeader>
        </HeaderWrapper>
        <HistoryContainer>
          {!wateringData ? (
            <Loader />
          ) : !Object.keys(wateringData).length ? (
            <Description style={{ textAlign: "center" }}>
              This plant has not been watered yet.
            </Description>
          ) : (
            Object.entries(wateringData).map(([day, hours]) => (
              <ItemContainer key={day}>
                <ItemDateHeader>{day}</ItemDateHeader>
                {hours.map((hour, index) => (
                  <ItemWrapper key={hour + index}>
                    <HistoryIcon
                      resizeMode="contain"
                      source={require("../../assets/water-drop.png")}
                    />
                    <ActionText>{formatToHour(hour)}</ActionText>
                  </ItemWrapper>
                ))}
              </ItemContainer>
            ))
          )}
        </HistoryContainer>
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default PlantHistory;
