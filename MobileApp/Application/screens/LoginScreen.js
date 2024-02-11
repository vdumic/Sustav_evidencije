import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

const LoginScreen = ({ navigation }) => {
  setTimeout(() => {
    navigation.navigate("Welcome");
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
            source={require("../assets/green_tick.jpg")}
            style={{ width: 80, height: 80, marginTop: 20 }}
          />
          <Text style={{ fontSize: 35, fontWeight: "bold", margin: 20 }}>
            Prijava uspješna.
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Welcome");
            }}
          >
            <Text style={styles.text}>
              Uskoro ćete biti preusmjereni na sustav evidencije prisutnosti.
            </Text>
          </Pressable>
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
});

export default LoginScreen;
