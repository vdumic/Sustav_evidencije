import { View, Image } from "react-native";

const SettingsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/settings.png")}
        style={{ width: 150, height: 150 }}
      />
    </View>
  );
};

export default SettingsScreen;
