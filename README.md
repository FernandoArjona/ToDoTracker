# ToDoTracker
This is a simple React Native app that allows the user to add activities, scroll through them, highlight them, and go to dedicated app pages for them. Those app pages have the activity's title and description, and can edit them. In addition, the activity can be deleted or saved from there.

![Screenshot00](https://github.com/FernandoArjona/ToDoTracker/blob/master/readme-images/Screenshot00.png)

**Technologies used:**
* React Native
* Javascript
* Expo
* Android Studio (for the testing emulator.)


# Walk-Through
This is a sample screen with some activities added for you. Normally, the app starts with no activities when you first install it, so you would need to add your own. You can tap on the green buttons on each of the activities to toggle their highlight, changing the activity's background back and forth from a darker to a lighter color.

![Screenshot01](https://github.com/FernandoArjona/ToDoTracker/blob/master/readme-images/Screenshot01.png)

By tapping into any of the activities, you move to another page where its description can be viewed and edited, as well as the activity title. You can also use the red button to delete the activity.

![Screenshot02](https://github.com/FernandoArjona/ToDoTracker/blob/master/readme-images/Screenshot02.png)

If you get editing the description, the app will be aware that you are using the keyboard thanks to a third party library,* and will re-arrange the display of the input fields so that you can write comfortably. Changes are saved automatically for a smoother and quicker user experience.

![Screenshot03](https://github.com/FernandoArjona/ToDoTracker/blob/master/readme-images/Screenshot03.png)
![Screenshot04](https://github.com/FernandoArjona/ToDoTracker/blob/master/readme-images/Screenshot04.png)

Should you choose to delete the activity, you can tap on the red button adjacent to the upper title field. This will show you a couple of options: one to actually delete the activity, and another to cancel this action, in case you tapped accidentally.

![Screenshot05](https://github.com/FernandoArjona/ToDoTracker/blob/master/readme-images/Screenshot05.png)

If you confirm to delete the activity, the activity will be deleted from storage and you will be alerted about this change. (If you cancel, the options to confirm and cancel deletion are hidden until you tap on the red button again.)

![Screenshot06](https://github.com/FernandoArjona/ToDoTracker/blob/master/readme-images/Screenshot06.png)

* third party library used: https://www.npmjs.com/package/react-native-keyboard-aware-scroll-view

# Technical Details

ToDoTracker is built with React Native, Expo, and is tested with Android (Pixel_XL_API_30). Granted that this is a very simple application, it does not rely on a strict design pattern in its design.

The app uses a main home page, HomeScreen.js, and a template for activity pages called ToDoScreen.js. In addition, there is a component utilized in HomeScreen.js named ToDoItem.js that instanciates the activity bars we see on the home screen. 

Data is stored locally in a JSON format as a global variable for the app. As the data is stored as a variable, it cannot be extracted as a file easily.

# Installation
APK builds are currently unavailable.

If you install the source code with GitHub to use with Expo, you will need to make sure that your development enviorment or code editor meets Expo requirements. (Emulator installation, such as from Android Studio or XCode, setting up development enviorments, and installing Expo proper. This should be run with the "npx expo start" command.)
