import React from "react";
import { Slider } from "@miblanchard/react-native-slider";

import { Body, Header, Image, Wrapper, Container } from "./Plant.styles";
import { PlantProps } from "./Plant.interface";

const MAX_SLIDER_VALUE = 1

const Plant = ({ name, imgSrc }: PlantProps) => {
  const [sliderValue, setSliderValue] = React.useState(0);

  const submitPlant = (value: number | number[]) => {
    console.log(MAX_SLIDER_VALUE)
    // if value > 0.9 then hide
  }
  return (
    <Container>
      <Wrapper>
        <Image resizeMode="cover" source={imgSrc} />
        <Body>
          <Header>{name}</Header>
          <Slider
            value={sliderValue}
            onSlidingComplete={submitPlant}
            thumbStyle={{backgroundColor: '#444444', borderRadius: 5, width: 35, height: 25}}
            trackStyle={{opacity: 0.3}}
            maximumValue={MAX_SLIDER_VALUE}
          />
        </Body>
      </Wrapper>
    </Container>
  );
};

export default Plant;
