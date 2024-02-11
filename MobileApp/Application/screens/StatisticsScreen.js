import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SubjectEvidence from "../components/SubjectEvidence";

const StatiticsScreen = ({ route }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();

    console.log(data);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://192.168.5.21:5000/statistika_prisutnosti/111-2023/${route.params.id}`
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
        <View style={styles.container}>
          <Image
            source={require("../assets/fesb_logo.png")}
            style={{ width: 150, height: 60 }}
          />
          <Ionicons
            name="close-circle-outline"
            size={50}
            onPress={() => {
              route.params.navigation.navigate("Pregled");
            }}
          />
        </View>
        <View style={{ flex: 5, margin: 20 }}>
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>
            {route.params.predmet}
          </Text>
          {data.map((nastava) => {
            return (
              <SubjectEvidence
                prisutan={nastava.student_prisutan}
                termini={nastava.broj_termina}
                naziv={nastava.nastava}
              />
            );
          })}
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default StatiticsScreen;
