import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ProfessorSubject = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Studentlist", {
          predavanje_id: props.predavanje_id,
          predmet: props.predmet,
          nastava: props.nastava,
          datum: props.datum,
          navigation: props.navigation,
        });
      }}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>{props.predmet}</Text>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={styles.text}>{`${props.nastava} ${props.datum}`}</Text>
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
  heading: {
    textAlign: "left",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "bold",
  },
  text: {
    textAlign: "left",
    fontSize: 14,
    lineHeight: 24,
  },
});

export default ProfessorSubject;
