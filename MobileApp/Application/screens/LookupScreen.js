import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";

import SubjectComponent from "../components/SubjectComponent";

const LookupScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://192.168.5.21:5000/predmeti_studenta/111-2023`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 3 }}>
        <View style={{ flex: 1, marginTop: 100, marginLeft: 20 }}>
          <Image
            source={require("../assets/fesb_logo.png")}
            style={{ width: 150, height: 60 }}
          />
        </View>
        <View style={{ flex: 5, margin: 20 }}>
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>
            Tvoji kolegiji:
          </Text>
          {data.map((kolegij) => {
            return (
              <SubjectComponent
                key={kolegij.id}
                id={kolegij.id}
                predmet={kolegij.naziv}
                navigation={navigation}
              />
            );
          })}
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default LookupScreen;
