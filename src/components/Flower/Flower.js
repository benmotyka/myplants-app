import React from "react";
import styles from "./Flower.styles";
import { Image, View, Text } from "react-native";

const Flower = ({ name, imgSrc }) => {
  return (
    <View style={styles.flowerContainer}>
      <View style={styles.flowerWrapper}>
        <Image
          resizeMode="cover"
          style={styles.flowerImage}
          source={imgSrc}
        />
        <View style={styles.flowerBody}>
        <Text style={styles.flowerHeader}>{name}</Text>

        </View>
      </View>
    </View>
  );
};

export default Flower;
