import { StyleSheet, View, Text, Pressable } from "react-native";

const DeactivateClass = (props) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      predavanje_id: props.predavanje_id,
    }),
  };

  const deactivateClass = async () => {
    try {
      await fetch(
        "http://192.168.5.21:5000/neaktivno_predavanje",
        requestOptions
      ).then((response) => {
        response.json();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{props.predmet}</Text>
      <Text style={styles.middleText}>{props.nastava}</Text>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Text style={styles.smallText}>{props.termin}</Text>
        <Text style={styles.smallText}>{props.predavaonica}</Text>
      </View>
      <View>
        <Pressable
          onPress={() => {
            deactivateClass();
            props.navigation.navigate("Deactivated");
          }}
          style={{
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text style={styles.buttonText}>Deaktiviraj</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007aff",
    padding: 20,
    borderRadius: 30,
    justifyContent: "center",
    marginTop: 20,
  },
  heading: {
    color: "white",
    textAlign: "left",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "bold",
  },
  middleText: {
    color: "white",
    textAlign: "left",
    fontSize: 15,
    lineHeight: 24,
  },
  smallText: {
    color: "white",
    textAlign: "left",
    fontSize: 15,
    lineHeight: 24,
    marginTop: 5,
    marginBottom: 10,
    fontWeight: "bold",
  },
  buttonText: {
    backgroundColor: "#fafafa",
    borderRadius: 15,
    fontSize: 15,
    color: "#007aff",
    textAlign: "center",
    paddingVertical: 10,
  },
});

export default DeactivateClass;
