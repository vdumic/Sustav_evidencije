import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import NetInfo from "@react-native-community/netinfo";

const useInternetStatus = () => {
  const [bssid, setBssid] = useState([]);

  useEffect(() => {
    const subscribe = (state) => setBssid(state.details.bssid);

    NetInfo.addEventListener(subscribe);
  }, []);

  return bssid;
};

const ActiveClass = (props) => {
  const bssid = useInternetStatus();
  const installationId = Constants.installationId;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mat_broj: "111-2023",
      predavanje_id: props.predavanje_id,
      mobile_id: installationId,
      bssid: bssid,
    }),
  };

  const postRequest = async () => {
    try {
      await fetch(
        "http://192.168.5.21:5000/dodaj_prisutnost",
        requestOptions
      ).then((response) => {
        response.json();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        postRequest();
        props.navigation.navigate("Evidence");
      }}
    >
      <View style={styles.container}>
        <Text style={styles.bigText}>{props.predmet}</Text>
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
      </View>
    </TouchableOpacity>
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
  bigText: {
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
    fontWeight: "bold",
  },
});

export default ActiveClass;
