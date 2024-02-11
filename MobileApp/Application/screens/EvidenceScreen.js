import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";

import NetInfo from "@react-native-community/netinfo";
import ActiveClass from "../components/ActiveClass";

const useInternetStatus = () => {
  const [bssid, setBssid] = useState([]);

  useEffect(() => {
    const subscribe = (state) => setBssid(state.details.bssid);

    NetInfo.addEventListener(subscribe);
  }, []);

  return bssid;
};

const EvidenceScreen = ({ navigation }) => {
  const bssid = useInternetStatus();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://192.168.5.21:5000/aktivno_predavanje/${bssid}`
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
        <View style={{ flex: 4, margin: 20 }}>
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>
            Odaberite stavku za potvrdu evidencije:
          </Text>
          <ActiveClass
            predmet={data.predmet}
            nastava={data.nastava}
            predavaonica={data.predavaonica}
            termin={data.termin}
            predavanje_id={data.predavanje_id}
            navigation={navigation}
          />
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 15,
            color: "gray",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Ne vidite termine predavanja? Provjerite je li vač uređaj u dometu
          WiFi mreže trenutne predavaonice.
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default EvidenceScreen;
