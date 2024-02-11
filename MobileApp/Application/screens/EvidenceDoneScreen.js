import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

const EvidenceDoneScreen = ({ navigation }) => {
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
            source={require("../assets/green_tick.jpg")}
            style={{ width: 80, height: 80, marginTop: 20 }}
          />
          <Text style={styles.text}>Prisutnost evidentirana.</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.pressable}
          onPress={() => navigation.navigate("Evidencija")}
        >
          <Text style={styles.button}>OK</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    fontWeight: "bold",
    margin: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    marginTop: 100,
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: "#007aff",
    borderRadius: 20,
    fontSize: 20,
    color: "white",
    paddingVertical: 15,
    paddingHorizontal: 90,
    textAlign: "center",
  },
  pressable: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default EvidenceDoneScreen;
