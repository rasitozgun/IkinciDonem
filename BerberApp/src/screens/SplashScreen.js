import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
});

export default SplashScreen;
