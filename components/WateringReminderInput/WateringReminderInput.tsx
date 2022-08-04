import {
  ErrorWrapper,
  ErrorText,
} from "components/BasicTextInput/BasicTextInput.styles";
import { AnimatePresence } from "moti";
import React from "react";

import {
  Container,
  Wrapper,
  Input,
  Text,
} from "./WateringReminderInput.styles";

const WateringReminderInput = ({
  numberValue,
  setNumberValue,
  error,
}: {
  numberValue?: number;
  setNumberValue: any;
  error?: string;
}): JSX.Element => {

  return (
    <Container>
      <Wrapper>
        <Text>Every</Text>
        <Input
          value={`${numberValue}`}
          onChangeText={setNumberValue}
          keyboardType="numeric"
          errorBorder={!!error}
          maxLength={1}
        />
      </Wrapper>
      <AnimatePresence>
        {error ? (
          <ErrorWrapper
            from={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
          >
            <ErrorText>{error}</ErrorText>
          </ErrorWrapper>
        ) : null}
      </AnimatePresence>
    </Container>
  );
};

export default WateringReminderInput;
