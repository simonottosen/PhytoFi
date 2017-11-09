import RNFirebase from 'react-native-firebase'

const configurationOptions = {
  apiKey: "AIzaSyAbQn5CP8cU80pFhrmmTmDw5w9SOc_QfGE",
  authDomain: "securedbase-d861b.firebaseapp.com",
  databaseURL: "https://securedbase-d861b.firebaseio.com",
  projectId: "securedbase-d861b",
  storageBucket: "securedbase-d861b.appspot.com",
  messagingSenderId: "3497891805"
}

const firebase = RNFirebase.initializeApp(configurationOptions)

export default firebase