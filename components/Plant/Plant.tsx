import React from "react";
import { Slider } from "@miblanchard/react-native-slider";

import { Body, Header, Image, Wrapper, Container } from "./Plant.styles";
import { PlantProps } from "./Plant.interface";
import { Text } from "react-native";

const MAX_SLIDER_VALUE = 1;
const SLIDE_SUCCESS_THRESHOLD = 0.9;

const Plant = ({ name, imgSrc }: PlantProps) => {
  const [sliderValue, setSliderValue] = React.useState(0);
  const [watered, setWatered] = React.useState(false);

  const submitPlant = (value: number | number[]): void => {
    const currentValue = typeof value !== "number" ? value[0] : value;
    if (currentValue >= SLIDE_SUCCESS_THRESHOLD * MAX_SLIDER_VALUE) {
      setWatered(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Image resizeMode="cover" source={imgSrc} />
        <Body>
          <Header>{name}</Header>
          {watered ? (
            <Text>sukces</Text>
          ) : (
            <Slider
              value={sliderValue}
              onSlidingComplete={submitPlant}
              thumbStyle={{
                backgroundColor: "#444444",
                borderRadius: 5,
                width: 35,
                height: 25,
              }}
              trackStyle={{ opacity: 0.3 }}
              maximumValue={MAX_SLIDER_VALUE}
            />
          )}
        </Body>
      </Wrapper>
    </Container>
  );
};

export default Plant;
