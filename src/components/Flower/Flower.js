import React from "react";
import styles from "./Flower.styles";
import { Image, View, Text } from "react-native";

const Flower = ({ name, imgSrc }) => {
  return (
    <View style={styles.listItemContainer}>
      <View style={styles.listItem}>
        <Image
          resizeMode="cover"
          style={styles.listItemImage}
          source={imgSrc}
        />
        <Text style={{ position: "absolute" }}>{name}</Text>
      </View>
    </View>
  );
};

export default Flower;
