import React, { useEffect, useRef, useState } from "react";
import { TouchableHighlight, View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { MotiView } from "moti";
import { useIsFocused } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { Navigation } from "interfaces/Navigation";
import { Watering } from "interfaces/Watering";
import {
    Body,
    Header,
    Image,
    Wrapper,
    Container,
    ItemsWrapper,
    SmallImage,
    TimeWrapper,
} from "components/Plant/styles";
import { calculateDifferenceFromNow } from "util/date";
import { useAppConfigStore, useToastStore } from "store";
import { cancelWatering, waterPlant } from "services/watering";
import i18n from "config/i18n";

const MAX_SLIDER_VALUE = 1;
const SLIDE_SUCCESS_VALUE_THRESHOLD = 0.9;
const MAX_HEADER_CHARACTERS = 10;
const REFRESH_TIME_MS = 10000;

interface Props extends Navigation {
    id: string;
    name: string;
    imgSrc?: string;
    latestWatering?: Watering;
    reminderFrequency?: number;
}

const Plant = ({
    id,
    name,
    imgSrc,
    navigation,
    latestWatering,
    reminderFrequency,
}: Props): JSX.Element => {
    const [sliderValue, setSliderValue] = useState(0);
    const [watered, setWatered] = useState(false);
    // If there was any watering, set time to last watering.
    const [timeFromLastWatering, setTimeFromLastWatering] = useState(
        latestWatering
            ? calculateDifferenceFromNow(latestWatering.createdAt)
            : null
    );
    const [showWateringReminder, setShowWateringReminder] = useState(false);

    const { t } = i18n;
    const isFocused = useIsFocused();
    const wateringRef = useRef<string>("");
    const displayToast = useToastStore((state) => state.showToast);
    const theme = useTheme();
    const appTheme = useAppConfigStore.persistent((state) => state.theme);

    // This useEffect sets and clears intervals for changing Plant time. If plant was ever watered,
    // simply create a new interval, and destory old on return. If user waters this plant, this code
    // will be ran, previous interval will be cleared and new one will be created with fallbackDate
    // as date of watering. However, if user hasn't ever watered plant, interval will not be created.
    // If new plant will be watered for the first time, interval will be created to the fallback date.
    useEffect(() => {
        if (!latestWatering && !watered) return;
        const fallbackDate = new Date();

        let interval = setInterval(() => {
            setTimeFromLastWatering(
                calculateDifferenceFromNow(
                    latestWatering ? latestWatering.createdAt : fallbackDate
                )
            );
        }, REFRESH_TIME_MS);

        if (watered) {
            clearInterval(interval);
            interval = setInterval(() => {
                setTimeFromLastWatering(
                    calculateDifferenceFromNow(fallbackDate)
                );
            }, REFRESH_TIME_MS);
        }
        return () => clearInterval(interval);
    }, [latestWatering, watered]);

    // This useEffect clears watered status of plant after changing focuses, as well as sets slider to
    // the default value.
    useEffect(() => {
        if (!watered) return;
        setWatered(false);
        setSliderValue(0);
    }, [isFocused]);

    // This useEffect checks if there's reminder frequency turned on, or plant was ever watered.
    // If both of them are true, if plant was watered by user in current state. If it wasn't,
    // (most of the times), gets number of days from last watering, and compares it with
    // selected remidnerFrequency, and finally displays alert based on these two.
    // If plant was watered in the current state, it hides reminder.
    useEffect(() => {
        if (!reminderFrequency || !timeFromLastWatering || watered) {
            setShowWateringReminder(false);
            return;
        }
        const daysFromLastWatering = parseInt(
            timeFromLastWatering.split(":")[0]
        );

        setShowWateringReminder(daysFromLastWatering >= reminderFrequency);
    }, [watered, reminderFrequency, timeFromLastWatering]);

    const onSlidingComplete = async (
        value: number | number[]
    ): Promise<void> => {
        const currentValue = typeof value !== "number" ? value[0] : value;
        setSliderValue(currentValue as number);
        if (currentValue < SLIDE_SUCCESS_VALUE_THRESHOLD * MAX_SLIDER_VALUE)
            return;

        try {
            wateringRef.current = await waterPlant(id);

            displayToast({
                text: t("components.plant.success"),
                type: "success",
                onCancel: onCancelToast,
            });
            setTimeFromLastWatering(calculateDifferenceFromNow(new Date()));
            setWatered(true);
        } catch (error) {
            displayToast({ text: t("errors.general"), type: "error" });
        }
    };

    const onLongPress = (): void => {
        navigation.navigate("editPlant", {
            plantId: id,
        });
    };

    const onPress = (): void => {
        navigation.navigate("plantHistory", {
            plantId: id,
        });
    };

    const onCancelToast = async () => {
        try {
            await cancelWatering(wateringRef.current);
            setTimeFromLastWatering(
                latestWatering
                    ? calculateDifferenceFromNow(latestWatering.createdAt)
                    : null
            );
            displayToast({
                text: t("components.plant.wateringCanceled"),
                type: "info",
            });

            setWatered(false);
            setSliderValue(0);
        } catch (error) {
            displayToast({ text: t("errors.general"), type: "error" });
        }
    };

    return (
        <Container>
            <Wrapper showWateringReminder={showWateringReminder}>
                <TouchableHighlight
                    onLongPress={onLongPress}
                    onPress={onPress}
                    delayLongPress={750}
                    underlayColor="rgba(0,0,0,0.05)"
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                >
                    <Image
                        resizeMode="cover"
                        source={
                            imgSrc
                                ? { uri: imgSrc as string }
                                : require("../../assets/plants/default_plant.jpg")
                        }
                    />
                </TouchableHighlight>

                <Body>
                    <ItemsWrapper>
                        <Header>
                            {name.length > MAX_HEADER_CHARACTERS
                                ? `${name.slice(0, MAX_HEADER_CHARACTERS)}...`
                                : name}
                        </Header>
                        {latestWatering || watered ? (
                            <TimeWrapper>
                                <Header>{timeFromLastWatering}</Header>
                                <MotiView
                                    from={{
                                        rotate: "0deg",
                                    }}
                                    animate={{
                                        rotate: watered ? "360deg" : "0deg",
                                    }}
                                    style={{
                                        marginLeft: 3,
                                    }}
                                >
                                    <SmallImage
                                        resizeMode="contain"
                                        source={
                                            appTheme === "dark"
                                                ? require("../../assets/hourglass-light.png")
                                                : require("../../assets/hourglass.png")
                                        }
                                    />
                                </MotiView>
                            </TimeWrapper>
                        ) : null}
                    </ItemsWrapper>
                    <View style={{ marginTop: "auto" }}>
                        {watered ? null : (
                            <Slider
                                value={sliderValue}
                                onSlidingComplete={onSlidingComplete}
                                thumbStyle={{
                                    backgroundColor: theme.primaryLight,
                                    borderRadius: 3,
                                    width: 35,
                                    height: 25,
                                }}
                                trackStyle={{ opacity: 0.2 }}
                                trackClickable={false}
                                maximumValue={MAX_SLIDER_VALUE}
                            />
                        )}
                    </View>
                </Body>
            </Wrapper>
        </Container>
    );
};

export default Plant;
