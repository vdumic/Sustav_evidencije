import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const useInternetStatus = () => {
  const [bssid, setBssid] = useState([]);

  useEffect(() => {
    const subscribe = (state) => setBssid(state.details.bssid);

    NetInfo.addEventListener(subscribe);
  }, []);

  return bssid;
};

const AvailableClasses = (props) => {
  const bssid = useInternetStatus();

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mat_broj: "1234",
      nastava_id: props.nastava_id,
      bssid: bssid,
    }),
  };

  const activateClass = async () => {
    try {
      await fetch("http://192.168.5.21:5000/predavanje", requestOptions).then(
        (response) => {
          response.json();
        }
      );
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
            activateClass();
            props.navigation.navigate("Activated");
          }}
          style={{
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text style={styles.buttonText}>Aktiviraj</Text>
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

export default AvailableClasses;
