import React from "react";
import { Text } from "react-native";

import {
  Wrapper,
  Container,
} from "components/AddNewPlant/AddNewPlant.styles";

const AddNewPlant = () => {
  return (
    <Container>
      <Wrapper>
          <Text>+</Text>
      </Wrapper>
    </Container>
  );
};

export default AddNewPlant;
