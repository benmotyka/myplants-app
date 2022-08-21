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
  SmallHeaderWrapper,
} from "styles/shared";
import {
  ItemDateHeader,
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
import i18n from "../../i18n";

type PlantHistoryProps = NativeStackScreenProps<
  RootStackParamList,
  "plantHistory"
>;

const { t } = i18n;

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
        <SmallHeaderWrapper>
          <SmallHeader>{t('pages.plants.history.header')}</SmallHeader>
        </SmallHeaderWrapper>
        <HistoryContainer>
          {!wateringData ? (
            <Loader />
          ) : !Object.keys(wateringData).length ? (
            <Description style={{ textAlign: "center" }}>
              {t('pages.plants.history.plantNotWatered')}
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
