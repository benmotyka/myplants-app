import React, { useCallback, useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/core";
import { ImageInfo } from "expo-image-picker";
import { ScrollView, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { RootStackParamList } from "../../App";
import Back from "components/Back/Back";
import { State } from "store/reducers";
import {
  ColumnCenterWrapper,
  ScreenContainer,
  IconContainer,
  ScrollableHeader,
  MarginTopView,
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
  SectionHeaderWrapper,
  InfoText,
  ButtonWrapper,
} from "styles/screens/plantHistory.styles";
import plantsApi from "config/api/plants";
import { WateringData } from "interfaces/WateringData";
import Loader from "components/Loader/Loader";
import { formatToHour } from "util/date";
import i18n from "../../i18n";
import { ICON_SIZE_PX } from "config";
import { colors } from "styles/colors";
import BasicModal from "components/BasicModal/BasicModal";
import {
  ModalDescription,
  ModalHeader,
  ModalItem,
  ModalImage,
} from "components/BasicModal/BasicModal.styles";
import { Plant } from "interfaces/Plant";
import CopyField from "components/CopyField/CopyField";
import showToast from "util/showToast";
import { PlantImagesHistoryData } from "interfaces/PlantImagesHistoryData";
import BasicImageInput from "components/BasicImageInput/BasicImageInput";
import BasicButton from "components/BasicButton/BasicButton";
import { base64EncodeImage } from "util/images";

type PlantHistoryProps = NativeStackScreenProps<
  RootStackParamList,
  "plantHistory"
>;

const { t } = i18n;

type Sections = "watering" | "images" | "addImage";

const PlantHistory = ({
  route,
  navigation,
}: PlantHistoryProps): JSX.Element => {
  const plantId = route.params.plantId;

  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<Sections>("watering");
  const [showShareModal, setShowShareModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState<boolean | string>(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant>();
  const [wateringData, setWateringData] = useState<WateringData>();
  const [plantImagesHistoryData, setPlantImagesHistoryData] =
    useState<PlantImagesHistoryData>();
  const [image, setImage] = useState<ImageInfo | null>();

  const scrollViewRef = useRef<ScrollView & HTMLElement>();

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

  const handleAddImage = async () => {
    try {
      setLoading(true);
      const base64EncodedImage = image ? base64EncodeImage(image) : null;

      await plantsApi.post("/plants/images", {
        plantId: plantId,
        image: base64EncodedImage,
      });

      const { imagesData } = await getPlantImagesHistory();
      setPlantImagesHistoryData(imagesData);
      setImage(null);

      showToast(t("pages.plants.history.success"), "success");
      handleChangeSection("images");
    } catch (error) {
      console.log(error);
      switch (error) {
        default:
          return showToast(t("errors.general"), "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangeSection = useCallback(async (section: Sections) => {
    switch (section) {
      case "watering":
        scrollViewRef.current?.scrollTo({ x: 0 });
        setActiveSection("watering");
        break;
      case "images":
        // TODO: determine how to calculate 'center' of scrollview instead of arbitrary value
        scrollViewRef.current?.scrollTo({ x: 130 });
        setActiveSection("images");
        break;
      case "addImage":
        scrollViewRef.current?.scrollToEnd();
        setActiveSection("addImage");
        break;
    }
  }, []);

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
            <SectionHeaderWrapper
              onPress={() => handleChangeSection("watering")}
            >
              <SectionHeader active={activeSection === "watering"}>
                {t("pages.plants.history.wateringHeader")}
              </SectionHeader>
            </SectionHeaderWrapper>
            <SectionHeaderWrapper onPress={() => handleChangeSection("images")}>
              <SectionHeader active={activeSection === "images"}>
                {t("pages.plants.history.imagesHeader")}
              </SectionHeader>
            </SectionHeaderWrapper>
            <SectionHeaderWrapper
              onPress={() => handleChangeSection("addImage")}
            >
              <SectionHeader active={activeSection === "addImage"}>
                {t("pages.plants.history.addImageHeader")}
              </SectionHeader>
            </SectionHeaderWrapper>
          </ScrollableHeader>
          {activeSection === "watering" ? (
            <SectionContainer key={"wateringHistory"}>
              {!wateringData ? (
                <Loader />
              ) : !Object.keys(wateringData).length ? (
                <InfoText>{t("pages.plants.history.plantNotWatered")}</InfoText>
              ) : (
                Object.entries(wateringData).map(([day, hours]) => (
                  <ItemContainer key={day}>
                    <ItemDateHeader>{day}</ItemDateHeader>
                    {hours.map((hour) => (
                      <ItemWrapper key={hour}>
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
          ) : null}
          {activeSection === "images" ? (
            <SectionContainer key={"imagesHistory"}>
              {!plantImagesHistoryData ? (
                <Loader />
              ) : !Object.keys(plantImagesHistoryData).length ? (
                <InfoText>
                  {t("pages.plants.history.plantHasNoImages")}
                </InfoText>
              ) : (
                Object.entries(plantImagesHistoryData).map(([day, images]) => (
                  <ItemContainer key={day}>
                    <ItemDateHeader>{day}</ItemDateHeader>
                    <ScrollableImagesContainer
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      {images.map((image, index) => (
                        <TouchableOpacity
                          key={image}
                          onPress={() => setShowImageModal(image)}
                        >
                          <HistoryImage
                            resizeMode="contain"
                            source={{ uri: image }}
                          />
                        </TouchableOpacity>
                      ))}
                    </ScrollableImagesContainer>
                  </ItemContainer>
                ))
              )}
            </SectionContainer>
          ) : null}
          {activeSection === "addImage" ? (
            <SectionContainer key={"addImage"}>
              {loading ? (
                <MarginTopView>
                  <Loader />
                </MarginTopView>
              ) : (
                <>
                  <BasicImageInput
                    buttonText={t("pages.plants.history.chooseImage")}
                    image={image}
                    setImage={setImage}
                  />
                  {image ? (
                    <ButtonWrapper>
                      <BasicButton
                        text={t("pages.plants.history.addImage")}
                        onPress={handleAddImage}
                      />
                    </ButtonWrapper>
                  ) : null}
                </>
              )}
            </SectionContainer>
          ) : null}
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
      <BasicModal showModal={!!showImageModal} toggleModal={setShowImageModal}>
        <ModalImage source={{ uri: showImageModal }} />
      </BasicModal>
    </>
  );
};

export default PlantHistory;
