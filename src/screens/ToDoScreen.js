import { Button, TouchableOpacity } from "react-native";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function ToDoScreen(route) {
  //the activity is updated automatically by onChanges in the input fields
  const [activity, setActivity] = useState(route.route.params.activity);
  const [isShowingDeleteConfirmation, setShowingDeleteConfirmation] =
    useState(false);
  const navigation = useNavigation();
  const [activitiesInStorage, setActivitiesInStorage] = useState();

  async function readActivities() {
    //reads activities from storage and sets them to display
    const asyncActivities = await AsyncStorage.getItem("activities").catch(
      function (error) {
        console.log("ERROR" + error.message);
        throw error;
      }
    );
    setActivitiesInStorage(asyncActivities);
  }

  useEffect(() => {
    console.log("to do screen tart");
    //listener allows readActivities to run properly
    const listener = navigation.addListener("focus", () => {
      readActivities();
    });
    return listener;
  }, []);

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
  async function handleTitleChange(text) {
    //reads the activities in storage into a new copy
    //writes the current activity into the copy
    var newAct = activity;
    newAct.title = text;
    var activities = JSON.parse(activitiesInStorage);
    activities[route.route.params.index] = newAct;
    const jsonActivities = JSON.stringify(activities);
    //updates the storage with the changes
    AsyncStorage.setItem("activities", jsonActivities);
    setActivity(newAct);
  }

  //saves the current activity into storage as an update
  async function handleDescriptionChange(text) {
    //reads the activities in storage into a new copy
    //writes the current activity into the copy
    var newAct = activity;
    newAct.description = text;
    var activities = JSON.parse(activitiesInStorage);
    activities[route.route.params.index] = newAct;
    const jsonActivities = JSON.stringify(activities);
    //updates the storage with the changes
    AsyncStorage.setItem("activities", jsonActivities);
    setActivity(newAct);
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
            handleTitleChange(text);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setShowingDeleteConfirmation(true);
          }}
        >
          <Text style={styles.deleteButton}>   </Text>
        </TouchableOpacity>
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
                color="#a8190f"
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
              handleDescriptionChange(text);
            }}
          />
        </View>
      </KeyboardAwareScrollView>
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
    display: "flex",
    flexDirection: "row",
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
    width: "90%"
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
  deleteButton: {
    width: 35,
    height: 35,
    backgroundColor: "#a8190f",
    borderRadius: 100,
  },
});

export default ToDoScreen;
