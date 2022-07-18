import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import { RootStackParamList } from "../../App";
import Back from "components/Back/Back";
import { IUserDetails } from "interfaces/IUserDetails";
import { State } from "store/reducers";
import {
  ColumnCenterWrapper,
  ScreenContainer,
  SmallHeader,
} from "styles/shared";
import {
  ItemDateHeader,
  HeaderWrapper,
  ActionText,
  ItemWrapper,
  HistoryIcon,
} from "styles/screens/plantHistory.styles";

type PlantHistoryProps = NativeStackScreenProps<RootStackParamList, "plantHistory">;

const temporaryWateringHistoryItems = [
  {
    date: "2022-06-18",
    actions: [
      {
        type: "watering",
        hour: "12:35",
      },
    ],
  },
  {
    date: "2022-06-17",
    actions: [
      {
        type: "watering",
        hour: "12:35",
      },
    ],
  },
  {
    date: "2022-06-16",
    actions: [
      {
        type: "watering",
        hour: "12:35",
      },
    ],
  },
];

const PlantHistory = ({ navigation }: PlantHistoryProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);

  const { userDetails }: { userDetails: IUserDetails } = useSelector(
    (state: State) => state.user
  );

  return (
    <ScreenContainer>
      <Back navigation={navigation} />
      <ColumnCenterWrapper>
        <HeaderWrapper>
          <SmallHeader>Watering history</SmallHeader>
        </HeaderWrapper>
        {temporaryWateringHistoryItems.map((item) => (
          <>
            <ItemDateHeader>{item.date}</ItemDateHeader>
            {item.actions.map(action => (
                <ItemWrapper>
                <HistoryIcon 
                resizeMode="contain"
                source={require("../../assets/water-drop.png")}/>
                <ActionText>{action.hour}</ActionText>
                </ItemWrapper>
            ))}
          </>
        ))}
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default PlantHistory;
