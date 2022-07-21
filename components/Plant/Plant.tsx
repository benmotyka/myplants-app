import React, { useEffect } from "react";
import { TouchableHighlight, View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { useIsFocused } from "@react-navigation/native";

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
import plantsApi from "config/api/plants";
import { IUserDetails } from "interfaces/IUserDetails";
import { useSelector } from "react-redux";
import { State } from "store/reducers";
import { calculateDifferenceFromNow } from "util/date";

const MAX_SLIDER_VALUE = 1;
const SLIDE_SUCCESS_VALUE_THRESHOLD = 0.9;
const MAX_HEADER_CHARACTERS = 10;
const REFRESH_TIME_MS = 10000;

const Plant = ({
  id,
  name,
  imgSrc,
  navigation,
  onSlidingStart,
  onSlidingFinish,
  latestWatering,
}: PlantProps): JSX.Element => {
  const [sliderValue, setSliderValue] = React.useState(0);
  const [watered, setWatered] = React.useState(false);
  // If there was any watering, set time to last watering.
  const [timeFromLastWatering, setTimeFromLastWatering] = React.useState(
    latestWatering
      ? calculateDifferenceFromNow(latestWatering.created_at)
      : null
  );

  const isFocused = useIsFocused();
  const { userDetails }: { userDetails: IUserDetails } = useSelector(
    (state: State) => state.user
  );

  // This useEffect sets and clears intervals for changing Plant time. If plant was ever watered,
  // simply create a new interval, and destory old on return. If user waters this plant, this code
  // will be ran, previous interval will be cleared and new one will be created with fallbackDate
  // as date of watering. However, if user hasn't ever watered plant, interval will not be created.
  // If new plant will be watered for the first time, interval will be created to the fallback date.
  useEffect(() => {
    if (!latestWatering && !watered) return;
    const fallbackDate = new Date();

    let interval = setInterval(() => {
      setTimeFromLastWatering(
        calculateDifferenceFromNow(
          latestWatering ? latestWatering.created_at : fallbackDate
        )
      );
    }, REFRESH_TIME_MS);

    if (watered) {
      clearInterval(interval);
      interval = setInterval(() => {
        setTimeFromLastWatering(calculateDifferenceFromNow(fallbackDate));
      }, REFRESH_TIME_MS);
    }
    return () => clearInterval(interval);
  }, [latestWatering, watered]);

  // This useEffect clears watered status of plant after changing focuses, as well as sets slider to
  // the default value.
  useEffect(() => {
    if (!watered) return;

    setWatered(false);
    setSliderValue(0);
  }, [isFocused]);

  const onSlidingComplete = async (value: number | number[]): Promise<void> => {
    const currentValue = typeof value !== "number" ? value[0] : value;
    onSlidingFinish();
    setSliderValue(currentValue as number);
    if (currentValue < SLIDE_SUCCESS_VALUE_THRESHOLD * MAX_SLIDER_VALUE) return;

    try {
      await plantsApi.post(
        `/watering`,
        {
          plantId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${userDetails.jwt}`,
          },
        }
      );
      showToast("Plant watered", "success");
      setTimeFromLastWatering(calculateDifferenceFromNow(new Date()));
      setWatered(true);
    } catch (error) {
      console.log(error);
      showToast("Something went wrong. Please try again later.", "error");
    }
  };

  const onLongPress = (): void => {
    navigation.navigate("editPlant", {
      plantId: id,
    });
  };

  const onPress = (): void => {
    navigation.navigate("plantHistory", {
      plantId: id,
    });
  };

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
                  {latestWatering || watered ? (
                    <>
                      <SmallImage
                        resizeMode="contain"
                        source={require("../../assets/hourglass.png")}
                      />
                      <Header>{timeFromLastWatering}</Header>
                    </>
                  ) : null}
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
