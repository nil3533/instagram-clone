import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBjne6KGpZOebtf9W8YciVQmpChamK3kr0",
  authDomain: "instagram-clone-demo-4125f.firebaseapp.com",
  projectId: "instagram-clone-demo-4125f",
  storageBucket: "instagram-clone-demo-4125f.appspot.com",
  messagingSenderId: "110888396196",
  appId: "1:110888396196:web:0f5cb73b0ec2426d24cd31",
};

firebase.initializeApp(firebaseConfig);

const authentication = firebase.auth();
const storage = firebase.storage();

export { storage, authentication };
