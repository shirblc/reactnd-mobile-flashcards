# Mobile Flashcards

## Description

Mobile Flashcards is an app made especially for students preparing for tests. You can use it to write down questions and answers about the material, organise these questions in groups and even get quizzed about each group. Ready? Set. Study!

This project was bootstrapped with [Create React Native App](https://github.com/expo/create-react-native-app).

## Requirements

- Node.js
- Expo mobile app or iOS/Android simulator

## Installaton and Usage

1. Download or clone the repo.
2. cd into the project directory.
3. Run ```npm install``` and ```npm install -g expo-cli``` to install dependencies.
4. If you're going to run the app on your phone, download the Expo app. If you intend to run the app on a simulator, you'll need to install it before running the app. For more information about either option, check the [official Expo docs](https://docs.expo.io/get-started/installation/).
5. Run ```expo start``` to start the server.
6. With the server running, scan the QR on your device (remember to make sure you're using the same network as your computer). This should start the Expo app, running Mobile Flashcards. 
7. Add cards, get quizzed, and enjoy the app!

*The app was tested on an iOS device (running iOS 14) and works correctly. It should work similarly on Android.

## Contents

The project contains a number of important files:

1. **app.js** - App component (root component.)
2. **index.js** - the base JavaScript file, which registers the root component.

### Actions

**Located in:** [src/actions](./src/actions) 

Contains the Redux store actions required to run the app. Actions are divided into three files:

1. **decks.js** - Contains actions relating to the various decks of cards in the user's app.
2. **questions.js** - Contains actions relating to the questions within each decks.
3. **shared.js** - Contains async action creator for getting initial data of both decks and questions.

### Components

**Located in:** [src/components](./src/components)

Contains the app's components. These include:

1. **Deck.js** - A simple Deck component. Contains the Deck's name and the number of cards in it.
2. **Home.js** - The Home component. Contains a list of the user's decks, with each item triggering navigation to the selected deck.
3. **AddDeck.js** - AddDeck component, used to create a new deck of cards.
4. **OpenDeck.js** - OpenDeck component. Contains details about the current deck, as well as options to add another card and to run a quiz with that deck's cards.
5. **Quiz.js** - Quiz component. Displays the chosen deck's questions and displays a user score once the user goes through all cards.
6. **AddQ.js**- AddQ component, used to create a new question (card).
7. **Settings.js** - Settings component. Currently used to update notifications settings.

### Reducers

**Located in:** [src/reducers](./src/reducers) 

Contains the reducers used by this app's store. There are currently three reducers, mirroring the three parts of the store, as well as an entry point:

1. **decks.js** - Contains the reducer updating the decks in the app. Responsible for the 'decks' part of the store.
2. **index.js** - Entry point for reducers. Contains the `combineReducers` call, combining the two reducers and returning a single reducer to be used by the store.
3. **questions.js** - Contains the reducer updating the list of game questions. Responsible for the 'questions' part of the store.

### Utils

**Located in:** [src/utils](./src/utils) 

1. **storage.js**- Contains utility methods for accessing and modifying AsyncMemory.
2. **notifications.js** - Contains utility methods for handling local notifications.

## Dependencies

This project utilises several dependencies:

1. **react** - the React framework.
2. **react-dom** - React's package of DOM-specific methods.
3. **react-native** - Packages containing the React Native APIs.
4. **expo** - Packages containing Expo's API. For more information, check their [GitHub repo](https://github.com/expo/expo).
5. **@react-native-async-storage/async-storage** - Used to access AsyncStorage. Check their [documentation](https://react-native-async-storage.github.io/async-storage/) for more information.
6. **react-navigation** - Packages containing React Navigation's API (enabling Native navigation). Check their [documentation](https://reactnavigation.org) for more information.
7. **redux** and **react-redux** - Redux store and React-specific Redux bindings.
8. **redux-thunk** - A Redux middleware for handling asynchronous requests.

## Known Issues

There are no current issues at the time.
