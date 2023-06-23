import React, { useCallback, useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/core";
import { ImageInfo } from "expo-image-picker";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import Back from "components/Back";
import {
    ColumnCenterWrapper,
    ScreenContainer,
    ScrollableHeader,
    HelperButton,
} from "styles/shared";
import {
    ItemDateHeader,
    ActionText,
    ItemWrapper,
    HistoryIcon,
    SectionContainer,
    SectionHeader,
    HistoryImage,
    ScrollableImagesContainer,
    SectionHeaderWrapper,
    InfoText,
    ButtonWrapper,
} from "styles/screens/plantHistory.styles";
import {
    RootStackParamList,
    WateringData,
    ImageData,
    PlantImagesHistoryData,
} from "interfaces";
import Loader from "components/Loader";
import { formatToHour } from "utils/date";
import { ICON_SIZE_PX } from "config";
import BasicImageInput from "components/BasicImageInput";
import BasicButton from "components/BasicButton";
import { base64EncodeImage } from "utils/images";
import { useToastStore } from "store";
import { getImagesHistory, addImageToPlant } from "services/plant";
import { getWateringHistory } from "services/watering";
import { useGetPlantDetailsFromCache } from "hooks/useGetPlantDetailsFromCache";
import i18n from "config/i18n";
import SharePlantModal from "modals/SharePlant";
import PlantImageModal from "modals/PlantImage";

type Props = NativeStackScreenProps<RootStackParamList, "plantHistory">;

const { t } = i18n;

type Sections = "watering" | "images" | "addImage";

const PlantHistory = ({ route, navigation }: Props): JSX.Element => {
    const plantId = route.params.plantId;

    const [loading, setLoading] = useState(false);
    const [activeSection, setActiveSection] = useState<Sections>("watering");
    const [showShareModal, setShowShareModal] = useState(false);
    const [showImageModalDetails, setShowImageModalDetails] =
        useState<ImageData | null>(null);
    const [wateringData, setWateringData] = useState<WateringData>();
    const [plantImagesHistoryData, setPlantImagesHistoryData] =
        useState<PlantImagesHistoryData>();
    const [image, setImage] = useState<ImageInfo | null>();
    const theme = useTheme();

    const scrollViewRef = useRef<ScrollView & HTMLElement>(null);
    const displayToast = useToastStore((state) => state.showToast);
    const isFocused = useIsFocused();

    const { plant: selectedPlant } = useGetPlantDetailsFromCache(plantId);

    const getPlantWateringHistory = async () => {
        try {
            const result = await getWateringHistory(plantId);
            setWateringData(result?.waterings);
        } catch (error) {
            switch (error) {
                default:
                    return displayToast({
                        text: t("errors.general"),
                        type: "error",
                    });
            }
        }
    };

    const getPlantImagesHistory = async () => {
        try {
            const result = await getImagesHistory(plantId);
            setPlantImagesHistoryData(result?.imagesData);
        } catch (error) {
            switch (error) {
                default:
                    return displayToast({
                        text: t("errors.general"),
                        type: "error",
                    });
            }
        }
    };

    const handleAddImage = async () => {
        try {
            setLoading(true);
            const base64EncodedImage = image ? base64EncodeImage(image) : null;

            await addImageToPlant(plantId, base64EncodedImage);

            await getPlantImagesHistory();
            setImage(null);

            displayToast({
                text: t("pages.plants.history.success"),
                type: "success",
            });
            handleChangeSection("images");
        } catch (error) {
            switch (error) {
                default:
                    return displayToast({
                        text: t("errors.general"),
                        type: "error",
                    });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChangeSection = useCallback((section: Sections) => {
        switch (section) {
            case "watering":
                scrollViewRef.current?.scrollTo({ x: 0 });
                setActiveSection("watering");
                break;
            case "images":
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
            await Promise.all([
                getPlantWateringHistory(),
                getPlantImagesHistory(),
            ]);
        })();
    }, [isFocused]);

    return (
        <>
            <ScreenContainer>
                <Back navigation={navigation} />
                <HelperButton
                    onPress={() => {
                        setShowShareModal(true);
                    }}
                >
                    <Entypo
                        name="share"
                        size={ICON_SIZE_PX}
                        color={theme.textLight}
                    />
                </HelperButton>
                <ColumnCenterWrapper fullHeight>
                    <ScrollableHeader
                        ref={scrollViewRef}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <SectionHeaderWrapper
                            onPress={() => handleChangeSection("watering")}
                        >
                            <SectionHeader
                                active={activeSection === "watering"}
                            >
                                {t("pages.plants.history.wateringHeader")}
                            </SectionHeader>
                        </SectionHeaderWrapper>
                        <SectionHeaderWrapper
                            onPress={() => handleChangeSection("images")}
                        >
                            <SectionHeader active={activeSection === "images"}>
                                {t("pages.plants.history.imagesHeader")}
                            </SectionHeader>
                        </SectionHeaderWrapper>
                        <SectionHeaderWrapper
                            onPress={() => handleChangeSection("addImage")}
                        >
                            <SectionHeader
                                active={activeSection === "addImage"}
                            >
                                {t("pages.plants.history.addImageHeader")}
                            </SectionHeader>
                        </SectionHeaderWrapper>
                    </ScrollableHeader>
                    {activeSection === "watering" ? (
                        <SectionContainer key={"wateringHistory"}>
                            {!wateringData ? (
                                <Loader topMargin />
                            ) : !Object.keys(wateringData).length ? (
                                <InfoText>
                                    {t("pages.plants.history.plantNotWatered")}
                                </InfoText>
                            ) : (
                                Object.entries(wateringData).map(
                                    ([day, hours]) => (
                                        <View key={day}>
                                            <ItemDateHeader>
                                                {day}
                                            </ItemDateHeader>
                                            {hours.map((hour) => (
                                                <ItemWrapper key={hour}>
                                                    <HistoryIcon
                                                        resizeMode="contain"
                                                        source={require("../../assets/water-drop.png")}
                                                    />
                                                    <ActionText>
                                                        {formatToHour(hour)}
                                                    </ActionText>
                                                </ItemWrapper>
                                            ))}
                                        </View>
                                    )
                                )
                            )}
                        </SectionContainer>
                    ) : null}
                    {activeSection === "images" ? (
                        <SectionContainer key={"imagesHistory"}>
                            {!plantImagesHistoryData ? (
                                <Loader topMargin />
                            ) : !Object.keys(plantImagesHistoryData).length ? (
                                <InfoText>
                                    {t("pages.plants.history.plantHasNoImages")}
                                </InfoText>
                            ) : (
                                Object.entries(plantImagesHistoryData).map(
                                    ([day, images]) => (
                                        <View key={day}>
                                            <ItemDateHeader>
                                                {day}
                                            </ItemDateHeader>
                                            <ScrollableImagesContainer
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={
                                                    false
                                                }
                                            >
                                                {images.map((image) => (
                                                    <TouchableOpacity
                                                        key={image.id}
                                                        onPress={() =>
                                                            setShowImageModalDetails(
                                                                image
                                                            )
                                                        }
                                                    >
                                                        {image.url ? (
                                                            <HistoryImage
                                                                resizeMode="contain"
                                                                source={{
                                                                    uri: image.url,
                                                                }}
                                                            />
                                                        ) : null}
                                                    </TouchableOpacity>
                                                ))}
                                            </ScrollableImagesContainer>
                                        </View>
                                    )
                                )
                            )}
                        </SectionContainer>
                    ) : null}
                    {activeSection === "addImage" ? (
                        <SectionContainer key={"addImage"}>
                            {loading ? (
                                <Loader topMargin />
                            ) : (
                                <>
                                    <BasicImageInput
                                        buttonText={t(
                                            "pages.plants.history.chooseImage"
                                        )}
                                        image={image}
                                        setImage={setImage}
                                    />
                                    {image ? (
                                        <ButtonWrapper>
                                            <BasicButton
                                                text={t(
                                                    "pages.plants.history.addImage"
                                                )}
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
            {selectedPlant ? (
                <SharePlantModal
                    shareId={selectedPlant.shareId}
                    showModal={showShareModal}
                    toggleModal={setShowShareModal}
                />
            ) : null}
            <PlantImageModal
                showModal={!!showImageModalDetails}
                toggleModal={setShowImageModalDetails}
                selectedImage={showImageModalDetails}
                refetchPlantImagesHistory={getPlantImagesHistory}
            />
        </>
    );
};

export default PlantHistory;
