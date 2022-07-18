import React from "react";
import { TouchableHighlight, View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";

import {
  Body,
  Header,
  Image,
  Wrapper,
  Container,
  ItemsWrapper,
  SmallImage,
} from "components/Plant/Plant.styles";
import { PlantProps } from "components/Plant/Plant.interface";
import { colors } from "styles/colors";
import showToast from "util/showToast";

const MAX_SLIDER_VALUE = 1;
const SLIDE_SUCCESS_VALUE_THRESHOLD = 0.9;
const MAX_HEADER_CHARACTERS = 10;

const Plant = ({
  id,
  name,
  imgSrc,
  navigation,
  onSlidingStart,
  onSlidingFinish,
}: PlantProps): JSX.Element => {
  const [sliderValue, setSliderValue] = React.useState(0);
  const [watered, setWatered] = React.useState(false);

  const onSlidingComplete = (value: number | number[]): void => {
    const currentValue = typeof value !== "number" ? value[0] : value;
    onSlidingFinish();
    setSliderValue(currentValue as number);
    if (currentValue < SLIDE_SUCCESS_VALUE_THRESHOLD * MAX_SLIDER_VALUE) return;

    showToast("Plant watered", "success");
    setWatered(true);
  };

  const onLongPress = () => {
    navigation.navigate("editPlant", {
      plantId: id,
    });
  };

  const onPress = () => {
    navigation.navigate("plantHistory", {
      plantId: id,
    });
  }

  return (
    <Container>
      <Wrapper>
        <TouchableHighlight
          onLongPress={onLongPress}
          onPress={onPress}
          delayLongPress={750}
          underlayColor="white"
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        >
          <View style={{ width: "100%", height: "100%" }}>
            <Image resizeMode="cover" source={imgSrc} />
            <Body>
              <ItemsWrapper>
                <Header>
                  {name.length > MAX_HEADER_CHARACTERS
                    ? `${name.slice(0, MAX_HEADER_CHARACTERS)}...`
                    : name}
                </Header>
                <ItemsWrapper>
                  <SmallImage 
                  resizeMode="contain"
                  source={require("../../assets/hourglass.png")} />
                  <Header>00:32</Header>
                </ItemsWrapper>
              </ItemsWrapper>
              <View style={{ marginTop: "auto" }}>
                {watered ? null : (
                  <Slider
                    value={sliderValue}
                    onSlidingComplete={onSlidingComplete}
                    thumbStyle={{
                      backgroundColor: colors.thumbStyle,
                      borderRadius: 3,
                      width: 35,
                      height: 25,
                    }}
                    trackStyle={{ opacity: 0.2 }}
                    trackClickable={false}
                    maximumValue={MAX_SLIDER_VALUE}
                    onSlidingStart={onSlidingStart}
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
