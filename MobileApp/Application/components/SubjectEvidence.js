import { Text, View } from "react-native";
import ProgressCircle from "react-native-progress-circle";

const SubjectEvidence = (props) => {
  return (
    <View>
      <Text
        style={{
          marginVertical: 20,
          fontSize: 17,
        }}
      >
        {props.naziv}
      </Text>
      <View style={{ justifyContent: "center", flexDirection: "row" }}>
        <ProgressCircle
          percent={(props.prisutan / props.termini) * 100}
          radius={60}
          borderWidth={8}
          color="green"
          shadowColor="#999"
          bgColor="#fff"
        >
          <Text
            style={{ fontSize: 18 }}
          >{`${props.prisutan}/${props.termini}`}</Text>
        </ProgressCircle>
      </View>
    </View>
  );
};

export default SubjectEvidence;
