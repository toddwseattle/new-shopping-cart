import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const config = {
  apiKey: "AIzaSyDttvwmMQua32kdQBaQKX_wcjtkn33iOgg",
  authDomain: "toddw-boot19-shop.firebaseapp.com",
  databaseURL: "https://toddw-boot19-shop.firebaseio.com",
  projectId: "toddw-boot19-shop",
  storageBucket: "toddw-boot19-shop.appspot.com",
  messagingSenderId: "1045693559837"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }
  doCreateUserWithEmailandPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
  user = uid => this.db.collection("users").doc(`${uid}`);
  users = () => this.db.collection("users");
  products = () => this.db.collection("products");
}

export default Firebase;
