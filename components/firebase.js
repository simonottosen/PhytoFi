import RNFirebase from 'react-native-firebase'

const configurationOptions = {
  apiKey: "AIzaSyAbDaMFCjAbSq105yNi8C3kVDrSOg2_6Jw",
  authDomain: "phytofi.firebaseapp.com",
  databaseURL: "https://phytofi.firebaseio.com",
  projectId: "phytofi",
  storageBucket: "phytofi.appspot.com",
  messagingSenderId: "695300792829"

}

const firebase = RNFirebase.initializeApp(configurationOptions)

export default firebase