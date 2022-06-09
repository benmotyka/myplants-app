import React from "react";
import {
  Body,
  Header,
  Image,
  Wrapper,
  Container,
} from "./Plant.styles";
import { PlantProps } from "./Plant.interface";

const Plant = ({ name, imgSrc }: PlantProps) => {
  return (
    <Container>
      <Wrapper>
      <Image resizeMode="cover" source={imgSrc} />
        <Body>
          <Header>{name}</Header>
        </Body>
      </Wrapper>
    </Container>
  );
};

export default Plant;
