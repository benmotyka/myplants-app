import React, { useEffect, useRef, useState } from "react";
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
  HistoryImage,
  ScrollableImagesContainer,
  SectionHeaderWrapper
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
import { ScrollView, Text, TouchableOpacity } from "react-native";
import showToast from "util/showToast";
import { PlantImagesHistoryData } from "interfaces/PlantImagesHistoryData";

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

  const [activeSection, setActiveSection] = useState<Sections>("watering");
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant>();
  const [wateringData, setWateringData] = useState<WateringData>();
  const [plantImagesHistoryData, setPlantImagesHistoryData] =
    useState<PlantImagesHistoryData>();

  const scrollViewRef = useRef<ScrollView>();

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
      console.log(error);
      switch (error) {
        default:
          return showToast(t("errors.general"), "error");
      }
    }
  };

  const getPlantImagesHistory = async () => {
    try {
      const { data } = await plantsApi.get<{
        imagesData: PlantImagesHistoryData;
      }>(`plants/history/images/${plantId}`);
      return data;
    } catch (error) {
      console.log(error);
      switch (error) {
        default:
          return showToast(t("errors.general"), "error");
      }
    }
  };

  useEffect(() => {
    if (!isFocused) return;
    (async () => {
      const { waterings } = await getPlantWateringHistory();
      setWateringData(waterings);
      const { imagesData } = await getPlantImagesHistory();
      setPlantImagesHistoryData(imagesData);
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
            ref={scrollViewRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <SectionHeaderWrapper onPress={() => {
              scrollViewRef.current?.scrollTo({x: 0})
              setActiveSection("watering")
              }}>
              <SectionHeader active={activeSection === "watering"}>
                {t("pages.plants.history.wateringHeader")}
              </SectionHeader>
            </SectionHeaderWrapper>
            <SectionHeaderWrapper onPress={() => {
              scrollViewRef.current?.scrollToEnd()
              setActiveSection("images")
              }}>
              <SectionHeader active={activeSection === "images"}>
                {t("pages.plants.history.imagesHeader")}
              </SectionHeader>
            </SectionHeaderWrapper>
          </ScrollableHeader>
          {activeSection === "watering" ? (
            <SectionContainer key={"wateringHistory"}>
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
            <SectionContainer key={"imagesHistory"}>
              {!plantImagesHistoryData ? (
                <Loader />
              ) : !Object.keys(plantImagesHistoryData).length ? (
                <Description style={{ textAlign: "center" }}>
                  {t("pages.plants.history.plantHasNoImages")}
                </Description>
              ) : (
                Object.entries(plantImagesHistoryData).map(([day, images]) => (
                  <ItemContainer key={day}>
                    <ItemDateHeader>{day}</ItemDateHeader>
                    <ScrollableImagesContainer
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      {images.map((image, index) => (
                        <HistoryImage key={image} resizeMode="contain" source={{uri: image}} />
                      ))}
                    </ScrollableImagesContainer>
                  </ItemContainer>
                ))
              )}
            </SectionContainer>
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
