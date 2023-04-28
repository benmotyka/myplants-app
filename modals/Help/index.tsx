import React, { ReactElement, useEffect, useState } from "react";
import { useModalsStore } from "store/index";
import { ModalAnimationWrapper } from "styles/shared";
import { useTheme } from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScreenOverlay, PlantContainer, SliderContainer, Text } from "./styles";

const ICON_SIZE_PX = 52;

const HelpModal = (): JSX.Element => {
    const [step, setStep] = useState(0);
    const modalsStore = useModalsStore((state) => state);
    const theme = useTheme();

    useEffect(() => {
        if (step < 3) return;
        modalsStore.setHelpModalState(false);
    }, [step]);

    const slides: ReactElement[] = [
        <>
            <SliderContainer></SliderContainer>
            <Text>Move the slider to mark your plant as watered</Text>
        </>,
        <>
            <PlantContainer>
                <MaterialCommunityIcons
                    name="gesture-tap"
                    size={ICON_SIZE_PX}
                    color={theme.white}
                />
            </PlantContainer>
            <Text>
                Tap your plant to see the watering history or add images
            </Text>
        </>,
        <>
            <PlantContainer>
                <MaterialCommunityIcons
                    name="gesture-double-tap"
                    size={ICON_SIZE_PX}
                    color={theme.white}
                />
            </PlantContainer>
            <Text>Hold it to edit its details</Text>
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
