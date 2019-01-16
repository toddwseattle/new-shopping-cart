import app from "firebase/app";
import "firebase/auth";
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
  }
  doCreateUserWithEmailandPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
