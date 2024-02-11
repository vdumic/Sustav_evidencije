import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

const MainScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 3 }}>
        <View style={{ flex: 1, marginTop: 100, marginLeft: 20 }}>
          <Image
            source={require("../assets/fesb_logo.png")}
            style={{ width: 150, height: 60 }}
          />
        </View>
        <View style={{ flex: 3, margin: 20 }}>
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>
            Prijavite se koristeći AAI račun za pristup sustavu.
          </Text>
          <Text style={{ fontSize: 17, marginEnd: 50, color: "gray" }}>
            Ako nemate AAI račun ili nailazite na poteškoće prilikom prijave,
            obratite se studentskoj službi.
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.button}>Prijava putem AAI</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
});

export default MainScreen;
