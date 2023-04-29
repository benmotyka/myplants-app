import React, { ReactElement, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useModalsStore } from "store/index";
import { MotiView } from "moti";
import { ModalAnimationWrapper } from "styles/shared";
import { useTheme } from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "config/i18n";
import {
    ScreenOverlay,
    PlantContainer,
    SliderContainer,
    Text,
    TextWrapper,
} from "./styles";

const TAP_ICON_SIZE_PX = 60;

const TapIcon = ({ paddingTop }: { paddingTop?: number }): JSX.Element => {
    const theme = useTheme();

    return (
        <MaterialCommunityIcons
            name="gesture-tap"
            size={TAP_ICON_SIZE_PX}
            color={theme.white}
            style={{
                paddingTop,
            }}
        />
    );
};

const HelpModal = (): JSX.Element => {
    const { t } = i18n;
    const [step, setStep] = useState(0);
    const [sliderWidth, setSliderWidth] = useState(0);
    const ref = useRef<View>(null);
    const modalsStore = useModalsStore((state) => state);

    useEffect(() => {
        if (step < 3) return;
        modalsStore.setHelpModalState(false);
    }, [step]);

    const slides: ReactElement[] = [
        <>
            <SliderContainer
                ref={ref}
                onLayout={() =>
                    ref.current?.measure((x, y, width) => setSliderWidth(width))
                }
            >
                <MotiView
                    animate={{
                        translateX: [
                            {
                                value: sliderWidth - TAP_ICON_SIZE_PX,
                                delay: 1000,
                                damping: 100,
                            },
                            { value: 2, delay: 1000, damping: 100 },
                        ],
                    }}
                    transition={{
                        loop: true,
                    }}
                >
                    <TapIcon paddingTop={15} />
                </MotiView>
            </SliderContainer>
            <TextWrapper>
                <Text>{t("components.helpModal.slider")}</Text>
            </TextWrapper>
        </>,
        <>
            <PlantContainer>
                <MotiView
                    animate={{
                        scale: [{ value: 0.8, delay: 1000 }, 1],
                    }}
                    transition={{
                        loop: true,
                    }}
                >
                    <TapIcon />
                </MotiView>
            </PlantContainer>
            <TextWrapper>
                <Text>{t("components.helpModal.history")}</Text>
            </TextWrapper>
        </>,
        <>
            <PlantContainer>
                <MotiView
                    animate={{
                        scale: [
                            { value: 0.8, delay: 1000 },
                            { value: 1, delay: 1000 },
                        ],
                    }}
                    transition={{
                        loop: true,
                    }}
                >
                    <TapIcon />
                </MotiView>
            </PlantContainer>
            <TextWrapper>
                <Text>{t("components.helpModal.edit")}</Text>
            </TextWrapper>
        </>,
    ];

    return (
        <ModalAnimationWrapper
            style={{ zIndex: 20 }}
            from={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
        >
            <ScreenOverlay onPress={() => setStep((prevStep) => prevStep + 1)}>
                {slides[step]}
            </ScreenOverlay>
        </ModalAnimationWrapper>
    );
};

export default HelpModal;
