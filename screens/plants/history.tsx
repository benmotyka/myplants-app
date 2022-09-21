import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/core";

import { RootStackParamList } from "../../App";
import Back from "components/Back/Back";
import { State } from "store/reducers";
import {
  ColumnCenterWrapper,
  Description,
  ScreenContainer,
  IconContainer,
  ScrollableHeader,
} from "styles/shared";
import {
  ItemDateHeader,
  ActionText,
  ItemWrapper,
  HistoryIcon,
  ItemContainer,
  SectionContainer,
  SectionHeader,
} from "styles/screens/plantHistory.styles";
import plantsApi from "config/api/plants";
import { WateringData } from "interfaces/WateringData";
import Loader from "components/Loader/Loader";
import { formatToHour } from "util/date";
import i18n from "../../i18n";
import { Entypo } from "@expo/vector-icons";
import { ICON_SIZE_PX } from "config";
import { colors } from "styles/colors";
import BasicModal from "components/BasicModal/BasicModal";
import {
  ModalDescription,
  ModalHeader,
  ModalItem,
} from "components/BasicModal/BasicModal.styles";
import { Plant } from "interfaces/Plant";
import CopyField from "components/CopyField/CopyField";
import { TouchableOpacity } from "react-native";

type PlantHistoryProps = NativeStackScreenProps<
  RootStackParamList,
  "plantHistory"
>;

const { t } = i18n;

type Sections = "watering" | "images";

const PlantHistory = ({
  route,
  navigation,
}: PlantHistoryProps): JSX.Element => {
  const plantId = route.params.plantId;

  const [activeSection, setActiveSection] =
    useState<Sections>("watering");
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant>();
  const [wateringData, setWateringData] = useState<WateringData>();

  const isFocused = useIsFocused();
  const { userPlants }: { userPlants: Plant[] } = useSelector(
    (state: State) => state.plants
  );

  useEffect(() => {
    const plant = userPlants.find((plant) => plant.id === plantId);
    setSelectedPlant(plant);
  }, [userPlants]);

  const getPlantWateringHistory = async () => {
    try {
      const { data } = await plantsApi.get<{ waterings: WateringData }>(
        `watering/${plantId}`
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
      }
    })();
  }, [isFocused]);

  return (
    <>
      <ScreenContainer>
        <Back navigation={navigation} />
        <IconContainer
          style={{ top: 20, right: 20 }}
          onPress={() => {
            setShowShareModal(true);
          }}
        >
          <Entypo name="share" size={ICON_SIZE_PX} color={colors.lightBlack} />
        </IconContainer>
        <ColumnCenterWrapper fullHeight>
          <ScrollableHeader
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center", columnGap: 20 }}
          >
            <TouchableOpacity onPress={() => setActiveSection("watering")}>
              <SectionHeader active={activeSection === "watering"}>
                {t("pages.plants.history.wateringHeader")}
              </SectionHeader>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveSection("images")}>
              <SectionHeader active={activeSection === "images"}>
                {t("pages.plants.history.imagesHeader")}
              </SectionHeader>
            </TouchableOpacity>
          </ScrollableHeader>
          {activeSection === "watering" ? (
            <SectionContainer>
              {!wateringData ? (
                <Loader />
              ) : !Object.keys(wateringData).length ? (
                <Description style={{ textAlign: "center" }}>
                  {t("pages.plants.history.plantNotWatered")}
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
            </SectionContainer>
          ) : (
            <SectionContainer></SectionContainer>
          )}
        </ColumnCenterWrapper>
      </ScreenContainer>
      <BasicModal showModal={showShareModal} toggleModal={setShowShareModal}>
        <ModalItem>
          <ModalHeader>
            {t("pages.plants.history.shareModal.header")}
          </ModalHeader>
          <ModalDescription>
            {t("pages.plants.history.shareModal.description")}
          </ModalDescription>
        </ModalItem>
        <ModalItem>
          {selectedPlant ? <CopyField value={selectedPlant.shareId} /> : null}
        </ModalItem>
      </BasicModal>
    </>
  );
};

export default PlantHistory;
