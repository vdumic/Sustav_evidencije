import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SubjectComponent = (props) => {
  const [nastava, setNastava] = useState([]);

  useEffect(() => {
    getSubjectTypes();
  }, []);

  const getSubjectTypes = async () => {
    try {
      const response = await fetch(
        `http://192.168.5.21:5000/tip_nastave/${props.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setNastava(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Statistics", {
          id: props.id,
          navigation: props.navigation,
          predmet: props.predmet,
        });
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{props.predmet}</Text>
        <View style={styles.arrowContainer}>
          {nastava.map((tip) => {
            return (
              <Text key={tip.naziv} style={styles.subtitle}>
                {tip.naziv}
              </Text>
            );
          })}
          <Ionicons name="arrow-forward" size={25} color="#007aff" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
    marginTop: 20,
  },
  title: {
    textAlign: "left",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "left",
    fontSize: 14,
    lineHeight: 24,
  },
  arrowContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default SubjectComponent;
