import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  setTimeout(() => {
    navigation.navigate("TabNavigator");
  }, 3000);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 3 }}>
        <View style={{ flex: 1, marginTop: 100, marginLeft: 20 }}>
          <Image
            source={require("../assets/fesb_logo.png")}
            style={{ width: 150, height: 60 }}
          />
        </View>
        <View style={{ flex: 3, margin: 20, alignItems: "center" }}>
          <Image
            source={require("../assets/hotspot.png")}
            style={{ width: 80, height: 80, marginTop: 20 }}
          />
          <Text style={styles.heading}>
            Traženje obližnjih pristupnih točaka.
          </Text>
          <Text
            style={styles.text}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Provjerite je li Vaš uređaj u dometu WiFi mreže trenutne
            predavaonice.
          </Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    color: "gray",
    marginHorizontal: 60,
    textAlign: "center",
  },
  heading: {
    fontSize: 35,
    fontWeight: "bold",
    margin: 20,
    textAlign: "center",
  },
});

export default WelcomeScreen;
