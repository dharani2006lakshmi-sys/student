import { db } from "./firebase.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.addStudent = async () => {
const name = document.getElementById("name").value;
const dept = document.getElementById("dept").value;
const year = document.getElementById("year").value;

await addDoc(collection(db, "students"), { name, dept, year });
load();
};

async function load() {
const snap = await getDocs(collection(db, "students"));
const list = document.getElementById("list");
list.innerHTML = "";

snap.forEach(doc => {
const li = document.createElement("li");
li.textContent = doc.data().name + " - " + doc.data().dept;
list.appendChild(li);
});
}

load();
