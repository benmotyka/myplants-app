import React, { ReactElement, useEffect, useState } from "react";
import { useModalsStore } from "store/index";
import { ModalAnimationWrapper } from "styles/shared";
import { ScreenOverlay, Container, Text } from "./styles";

const slides: ReactElement[] = [
    <>
        <Container></Container>
        <Text>Tap your plant to see its details</Text>
    </>,
    <>
        <Container></Container>
        <Text>Tap your plant to see its details2</Text>
    </>,
    <>
        <Container></Container>
        <Text>Tap your plant to see its details3</Text>
    </>,
];

const HelpModal = (): JSX.Element => {
    const modalsStore = useModalsStore((state) => state);
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (step < 3) return;
        modalsStore.setHelpModalState(false);
    }, [step]);

    return (
        <ModalAnimationWrapper
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
