import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import ToDoItem from "../components/ToDoItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const [activitiesInDisplay, setActivitiesInDisplay] = useState();
  const [refreshOnlyBool, setRefreshOnlyBool] = useState(true);
  const navigation = useNavigation();

  async function readActivities() {
    //await AsyncStorage.clear();
    //reads activities from storage and sets them to display
    const activitiesInStorage = await AsyncStorage.getItem("activities").catch(
      function (error) {
        console.log("ERROR" + error.message);
        throw error;
      }
    );
    if (activitiesInStorage == null) {
      var defaultActivities = [];
      const jsonActivities = JSON.stringify(defaultActivities);
      await AsyncStorage.setItem("activities", jsonActivities);
      activitiesInStorage = defaultActivities;
    }
    setActivitiesInDisplay(JSON.parse(activitiesInStorage));
  }

  //saves the current activity into storage as an update
  async function fadeActivity(index, isFaded) {
    //reads the activities in storage into a new copy
    const activitiesInStorage = await AsyncStorage.getItem("activities").catch(
      function (error) {
        console.log("ERROR" + error.message);
        throw error;
      }
    );
    //updates the activity in the index with the assigned isFaded value
    var activities = JSON.parse(activitiesInStorage);
    activities[index].isFaded = isFaded;
    const jsonActivities = JSON.stringify(activities);
    //updates the storage with the changes
    AsyncStorage.setItem("activities", jsonActivities);
  }

  useEffect(() => {
    //setDefaultActivities();
    console.log("Home screen loaded");
    //listener allows readActivities to run properly
    const listener = navigation.addListener("focus", () => {
      readActivities();
    });
    return listener;
  }, []);

  async function addEmptyActivity() {
    const emptyActivity = {
      title: " ",
      description: " ",
      isFaded: false,
    };
    const activities = activitiesInDisplay;
    activities.push(emptyActivity);
    const jsonActivities = JSON.stringify(activities);
    await AsyncStorage.setItem("activities", jsonActivities);
    console.log("new activity added");
    refreshComponent();
  }

  function refreshComponent() {
    if (refreshOnlyBool) {
      setRefreshOnlyBool(false);
    } else {
      setRefreshOnlyBool(true);
    }
  }

  return (
    <View style={{ backgroundColor: "#FEFAE0", height: "100%" }}>
      <View style={{ width: "90%" }}>
        {activitiesInDisplay ? (
          <View>
            {activitiesInDisplay.length > 0 ? (
              <ScrollView>
                <View>
                  {activitiesInDisplay.map((activity, index) => {
                    return (
                      <ToDoItem
                        activity={activity}
                        key={"toDoItem" + index}
                        index={index}
                        fadeActivity={fadeActivity}
                      />
                    );
                  })}
                </View>
                <Text style={{ height: 100 }}></Text>
              </ScrollView>
            ) : (
              <Text>Tap on the + button to add more items.</Text>
            )}
          </View>
        ) : (
          <Text>Loading activities...</Text>
        )}
      </View>
      <TouchableOpacity
        onPress={addEmptyActivity}
        style={styles.addButtonContainer}
      >
        <Text style={styles.addButton}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  addButton: {
    backgroundColor: "#283618",
    height: 75,
    width: 75,
    fontSize: 50,
    borderRadius: 100,
    color: "white",
    textAlign: "center",
    alignSelf: "flex-end",
    margin: 10,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default HomeScreen;

/*
  async function testStorage(){
    await AsyncStorage.setItem("testkey", "testvalue");
    const read = await AsyncStorage.getItem("testkey");
    console.log(read)
  }
*/

/*


  var defaultActivities = [
    {
      title: "Go buy eggs",
      description: "We need 12 eggs!",
      isFaded: false
    },
    {
      title: "Go to John's birthday party",
      description: "It is at 6pm",
      isFaded: false
    },
    {
      title: "Go to the gym",
      description: "Today is leg day. Do not skip!!",
      isFaded: false
    }
  ];

  async function setDefaultActivities() {
    const jsonActivities = JSON.stringify(defaultActivities);
    await AsyncStorage.setItem("activities", jsonActivities);
    console.log("default:::");
    //console.log(defaultActivities);
    setActivitiesInDisplay(readActivities);
    // const testArray = JSON.stringify(["one", "two", "three"]);
    // await AsyncStorage.setItem("testArray", testArray).catch(
    //   function (error) {
    //     console.log("ERROR" + error.message);
    //     throw error;
    //   }
    // );;
    // const read = await AsyncStorage.getItem("testArray");
    // console.log("read::::" + read);
  }

  async function writeActivities() {
    const jsonActivities = JSON.stringify(activitiesInDisplay);
    await AsyncStorage.setItem("activities", jsonActivities);
  }

*/
