import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function load() {
const snap = await getDocs(collection(db, "students"));
document.getElementById("count").innerText = snap.size;
}

load();
