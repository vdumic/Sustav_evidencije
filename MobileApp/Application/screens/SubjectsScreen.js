import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfessorSubject from "../components/ProfessorSubject";

const SubjectsScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://192.168.5.21:5000/odrzana_nastava/1234"
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
            Održana nastava:
          </Text>
          {data.map((nastava) => {
            return (
              <ProfessorSubject
                predmet={nastava.naziv}
                nastava={nastava.nastava}
                datum={nastava.datum}
                navigation={navigation}
                predavanje_id={nastava.predavanje_id}
              />
            );
          })}
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default SubjectsScreen;
