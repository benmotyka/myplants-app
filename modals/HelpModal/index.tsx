import React, { useEffect, useState } from "react";
import { useModalsStore } from "store/index";
import { DarkScreenOverlay, ModalAnimationWrapper } from "styles/shared";

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
            <DarkScreenOverlay
                onPress={() => setStep((prevStep) => prevStep + 1)}
            ></DarkScreenOverlay>
        </ModalAnimationWrapper>
    );
};

export default HelpModal;
