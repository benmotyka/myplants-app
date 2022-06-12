import React from "react";
import { Slider } from "@miblanchard/react-native-slider";

import {
  Body,
  Header,
  Image,
  Wrapper,
  Container,
  ItemsWrapper,
  SmallImage,
} from "./Plant.styles";
import { PlantProps } from "./Plant.interface";
import { Text, TouchableHighlight, View } from "react-native";
import { colors } from "../../styles/colors";

const MAX_SLIDER_VALUE = 1;
const SLIDE_SUCCESS_THRESHOLD = 0.9;

const Plant = ({ name, imgSrc, navigation }: PlantProps) => {
  const [sliderValue, setSliderValue] = React.useState(0);
  const [watered, setWatered] = React.useState(false);

  const submitPlant = (value: number | number[]): void => {
    const currentValue = typeof value !== "number" ? value[0] : value;
    if (currentValue >= SLIDE_SUCCESS_THRESHOLD * MAX_SLIDER_VALUE) {
      setWatered(true);
    }
  };

  const onLongPress = () => {
    console.log("hejaaa");
    //router.push(/config/plantId)
    navigation.navigate("EditPlant");
  };

  return (
    <Container>
      <Wrapper>
        <TouchableHighlight
          onLongPress={onLongPress}
          delayLongPress={750}
          underlayColor="white"
          style={{ width: "100%", height: "100%"}}
        >
          <View style={{ width: "100%", height: "100%" }}>
            <Image resizeMode="cover" source={imgSrc} />
            <Body>
              <ItemsWrapper>
                <Header>{name}</Header>
                <ItemsWrapper>
                  <SmallImage source={require("../../assets/water.svg")} />
                  <Header>00:32</Header>
                </ItemsWrapper>
              </ItemsWrapper>
              <View style={{ marginTop: "auto" }}>
                {watered ? (
                  <Text>sukces</Text>
                ) : (
                  <Slider
                    value={sliderValue}
                    onSlidingComplete={submitPlant}
                    thumbStyle={{
                      backgroundColor: colors.thumbStyle,
                      borderRadius: 3,
                      width: 35,
                      height: 25,
                      
                    }}
                    trackStyle={{ opacity: 0.2 }}
                    maximumValue={MAX_SLIDER_VALUE}
                  />
                )}
              </View>
            </Body>
          </View>
        </TouchableHighlight>
      </Wrapper>
    </Container>
  );
};

export default Plant;
