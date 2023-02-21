import { Button, KeyboardAvoidingView } from "react-native";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function ToDoScreen(route) {
  //the activity is updated automatically by onChanges in the input fields
  const [activity, setActivity] = useState(route.route.params.activity);
  const [isShowingDeleteConfirmation, setShowingDeleteConfirmation] =
    useState(false);
  const navigation = useNavigation();

  //deletes the current activity from storage
  async function handleDelete() {
    //reads activities in storage
    const activitiesInStorage = await AsyncStorage.getItem("activities").catch(
      function (error) {
        console.log("ERROR" + error.message);
        throw error;
      }
    );
    //deletes the index of the current activity, then cleans the resulting array.
    //Remember: using "delete" in an array just empties the data in the index,
    //and has to be cleaned out.
    var activities = JSON.parse(activitiesInStorage);
    delete activities[route.route.params.index];
    var cleanActivities = [];
    activities.map((activity) => {
      cleanActivities.push(activity);
    });
    const jsonActivities = JSON.stringify(cleanActivities);
    //updates the activities in storage & sends alert to user
    await AsyncStorage.setItem("activities", jsonActivities);
    Alert.alert("Activity deleted.", "", [
      {
        text: "OK",
        onPress: () => {
          //          navigation.navigate("HomeScreen");
          navigation.pop();
        },
      },
    ]);
  }

  //saves the current activity into storage as an update
  async function handleSave() {
    //reads the activities in storage into a new copy
    const activitiesInStorage = await AsyncStorage.getItem("activities").catch(
      function (error) {
        console.log("ERROR" + error.message);
        throw error;
      }
    );
    //writes the current activity into the copy
    var activities = JSON.parse(activitiesInStorage);
    activities[route.route.params.index] = activity;
    const jsonActivities = JSON.stringify(activities);
    //updates the storage with the changes
    await AsyncStorage.setItem("activities", jsonActivities);
    Alert.alert("Activity saved!", "", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  }

  //View
  return (
    <View style={{ backgroundColor: "#DDA15E", height: "100%" }}>
      <View style={styles.container}>
        <TextInput
          editable={true}
          multiline={false}
          style={styles.textInputSmall}
          defaultValue={activity.title}
          onChangeText={(text) => {
            //updates the current activity when this is changed
            const update = activity;
            update.title = text;
            setActivity(update);
          }}
        />
      </View>
      <Text style={styles.heading}>Description</Text>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <TextInput
            editable={true}
            multiline={true}
            numberOfLines={5}
            style={styles.textInputLarge}
            defaultValue={activity.description}
            onChangeText={(text) => {
              //updates the current activity when this is changed
              const update = activity;
              update.description = text;
              setActivity(update);
            }}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button
            title="DELETE"
            color={"red"}
            onPress={() => {
              setShowingDeleteConfirmation(true);
            }}
          ></Button>
        </View>
        <View style={styles.button}>
          <Button title="SAVE" color={"green"} onPress={handleSave}></Button>
        </View>
      </View>
      {isShowingDeleteConfirmation && (
        <View>
          <Text style={styles.heading}>
            Are you sure you want to delete this activity?
          </Text>
          <View style={styles.buttonsContainer}>
            <View style={styles.button}>
              <Button
                title="YES, DELETE"
                color={"red"}
                onPress={handleDelete}
              ></Button>
            </View>
            <View style={styles.button}>
              <Button
                title="NO, CANCEL"
                color={"grey"}
                onPress={() => {
                  setShowingDeleteConfirmation(false);
                }}
              ></Button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

//To-do screen styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEFAE0",
    borderRadius: 50,
    padding: 10,
    margin: 10,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
  },
  body: {
    fontSize: 20,
  },
  textInputSmall: {
    fontSize: 20,
    padding: 5,
  },
  textInputLarge: {
    fontSize: 20,
    height: 300,
    textAlignVertical: "top",
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  button: {
    width: "40%",
    margin: 10,
  },
});

export default ToDoScreen;
