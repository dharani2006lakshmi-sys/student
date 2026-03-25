import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, addDoc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDIVgcyflRaYXwaV5wSeKjb1wsocNdpd_8",
  authDomain: "student-ef9fa.firebaseapp.com",
  projectId: "student-ef9fa",
  storageBucket: "student-ef9fa.firebasestorage.app",
  messagingSenderId: "668986127367",
  appId: "1:668986127367:web:0afbc2b2f6424aeef766a2",
  measurementId: "G-Y8WK1F447D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Register with role
export async function registerUser(name, email, password, role) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await setDoc(doc(db, "users", user.uid), { name, email, role, class: "", phone: "" });
  alert("Registration successful!");
}

// Login with role redirect
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const userDoc = await getDoc(doc(db, "users", user.uid));
  const role = userDoc.data().role;

  if (role === "student") {
    window.location.href = "dashboard_student.html";
  } else {
    window.location.href = "dashboard_staff.html";
  }
}

// Google Login with role check
export async function googleLogin() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (!userDoc.exists()) {
    await setDoc(doc(db, "users", user.uid), { name: user.displayName, email: user.email, role: "student", class: "", phone: "" });
    window.location.href = "complete_profile.html";
  } else {
    const role = userDoc.data().role;
    if (role === "student") {
      window.location.href = "dashboard_student.html";
    } else {
      window.location.href = "dashboard_staff.html";
    }
  }
}

// Save Profile
export async function saveProfile(className, phone) {
  const user = auth.currentUser;
  await updateDoc(doc(db, "users", user.uid), { class: className, phone: phone });
  alert("Profile updated!");
  window.location.href = "dashboard_student.html";
}

// Add Student (staff only)
export async function addStudent(name, studentClass, email) {
  await addDoc(collection(db, "students"), { name, class: studentClass, email });
  alert("Student added!");
  loadStudents();
}

// Load Students
export async function loadStudents() {
  const table = document
