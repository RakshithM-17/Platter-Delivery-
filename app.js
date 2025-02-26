const firebaseConfig = {
    apiKey: "AIzaSyDSflsPsx0G-vjKfrh0MbOZlKwOeKWIan8",
        authDomain: "seller-app-f5e0d.firebaseapp.com",
        projectId: "seller-app-f5e0d",
        storageBucket: "gs://seller-app-f5e0d.appspot.com",
        messagingSenderId: "663355668762",
        appId: "1:663355668762:android:8292b459e67c12425d54a3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// User Login Function
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login successful!");
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Delete Account Function
function deleteAccount() {
    const user = auth.currentUser;
    
    if (user) {
        // Delete user data from Firestore
        db.collection("users").doc(user.uid).delete()
            .then(() => {
                // Delete user authentication
                return user.delete();
            })
            .then(() => {
                alert("Account deleted successfully.");
            })
            .catch((error) => {
                alert("Error deleting account: " + error.message);
            });
    } else {
        alert("No user logged in.");
    }
}