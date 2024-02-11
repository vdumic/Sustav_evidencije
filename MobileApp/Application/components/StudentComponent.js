import { StyleSheet, Text, View, Pressable } from "react-native";

const StudentComponent = (props) => {
  const removeEvidence = async (mat_broj) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        predavanje_id: props.predavanje_id,
        mat_broj: mat_broj,
      }),
    };

    try {
      await fetch(
        "http://192.168.5.21:5000/ukloni_prisutnost",
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
      <Text style={{ fontSize: 18 }}>{`${props.ime} ${props.prezime}`}</Text>
      <Pressable
        onPress={() => {
          removeEvidence(props.mat_broj);
        }}
        style={{
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Text style={styles.text}>Ukloni prisutnost</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
  },
  text: {
    borderRadius: 15,
    fontSize: 15,
    color: "#007aff",
    textAlign: "center",
  },
});

export default StudentComponent;
