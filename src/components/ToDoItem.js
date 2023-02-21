import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

function ToDoItem(props) {
  const navigation = useNavigation();
  const [isFaded, setIsFaded] = useState(props.activity.isFaded);

  return (
    <View style={!isFaded ? styles.container : styles.faded}>
      <TouchableOpacity
        style={styles.body}
        onPress={() => {
          //navigation.replace("ToDoItem_to_ToDoScreen", {
          navigation.navigate("ToDoItem_to_ToDoScreen", {
            activity: props.activity,
            index: props.index,
          });
        }}
      >
        <Text style={styles.body}>{props.activity.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (isFaded) {
            setIsFaded(false);
            props.fadeActivity(props.index, false);
          } else {
            setIsFaded(true);
            props.fadeActivity(props.index, true);
          }
        }}
      >
        <Text style={styles.completeButton}> </Text>
      </TouchableOpacity>
    </View>
  );
}

//https://coolors.co/palette/606c38-283618-fefae0-dda15e-bc6c25
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#DDA15E",
    borderRadius: 50,
    padding: 10,
    margin: 10,
  },
  faded: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#ebe1a3",
    borderRadius: 50,
    padding: 10,
    margin: 10,
  },
  completeButton: {
    width: 30,
    height: 30,
    backgroundColor: "#606C38",
    borderRadius: 100,
  },
  body: {
    fontSize: 25,
    width: "90%",
  },
});

export default ToDoItem;
