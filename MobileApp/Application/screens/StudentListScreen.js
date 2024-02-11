import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import StudentComponent from "../components/StudentComponent";

const StudentListScreen = ({ route }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://192.168.5.21:5000/prisutni_studenti/${route.params.predavanje_id}`
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
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            {route.params.predmet}
          </Text>
          <View style={styles.smallContainer}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "semibold",
              }}
            >
              {route.params.nastava}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "semibold" }}>
              {route.params.datum}
            </Text>
          </View>
          <View>
            {data.map((student) => {
              return (
                <StudentComponent
                  key={student.mat_broj}
                  ime={student.ime}
                  prezime={student.prezime}
                  mat_broj={student.mat_broj}
                  predavanje_id={route.params.predavanje_id}
                />
              );
            })}
          </View>
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
  smallContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
  },
});

export default StudentListScreen;
