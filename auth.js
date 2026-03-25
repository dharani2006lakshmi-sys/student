import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

window.login = async () => {
const email = document.getElementById("email").value;
const pass = document.getElementById("password").value;

await signInWithEmailAndPassword(auth, email, pass);
window.location = "dashboard.html";
};

window.register = async () => {
const email = document.getElementById("email").value;
const pass = document.getElementById("password").value;

await createUserWithEmailAndPassword(auth, email, pass);
alert("Registered");
};
