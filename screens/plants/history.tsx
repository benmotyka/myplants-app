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
  ItemContainer,
  HistoryContainer,
} from "styles/screens/plantHistory.styles";

type PlantHistoryProps = NativeStackScreenProps<
  RootStackParamList,
  "plantHistory"
>;

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
  {
    date: "2022-06-15",
    actions: [
      {
        type: "watering",
        hour: "12:35",
      },
    ],
  },
  {
    date: "2022-06-14",
    actions: [
      {
        type: "watering",
        hour: "12:35",
      },
    ],
  },
  {
    date: "2022-06-13",
    actions: [
      {
        type: "watering",
        hour: "12:35",
      },
    ],
  },
  {
    date: "2022-06-12",
    actions: [
      {
        type: "watering",
        hour: "12:35",
      },
    ],
  },
  {
    date: "2022-06-11",
    actions: [
      {
        type: "watering",
        hour: "12:35",
      },
    ],
  },
  {
    date: "2022-06-10",
    actions: [
      {
        type: "watering",
        hour: "12:35",
      },
    ],
  },
  {
    date: "2022-06-09",
    actions: [
      {
        type: "watering",
        hour: "12:35",
      },
    ],
  },
  {
    date: "2022-06-08",
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
      <ColumnCenterWrapper fullHeight>
        <HeaderWrapper>
          <SmallHeader>Watering history</SmallHeader>
        </HeaderWrapper>
        <HistoryContainer>
        {temporaryWateringHistoryItems.map((item) => (
          <ItemContainer key={item.date}>
            <ItemDateHeader>{item.date}</ItemDateHeader>
            {item.actions.map((action) => (
              <ItemWrapper key={action.hour}>
                <HistoryIcon
                  resizeMode="contain"
                  source={require("../../assets/water-drop.png")}
                />
                <ActionText>{action.hour}</ActionText>
              </ItemWrapper>
            ))}
          </ItemContainer>
        ))}
        </HistoryContainer>
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default PlantHistory;
