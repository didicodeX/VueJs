<script setup>
import { onMounted, ref } from "vue";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/index.js";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

let notes = ref([]);
let uneDate = "";
let uneNote = "";

onMounted(async () => {
  onSnapshot(collection(db, "notes"), (querySnapshot) => {
    let uneNote = {};
    let lesNotes = [];
    querySnapshot.forEach((doc) => {
      uneNote = {
        id: doc.id,
        date: doc.data().date,
        note: doc.data().note,
      };
      lesNotes.push(uneNote);
    });
    notes.value = lesNotes;
  });
});  
async function ajoute() {
  await setDoc(doc(db, "notes", uuidv4()), {
    date: uneDate,
    note: uneNote,
  });
}
async function supprime(id) {
  await deleteDoc(doc(db, "notes", id));
}
</script>
<template>
  <h3>Saisie d'une note</h3>
  <form>
    <input type="date" v-model="uneDate" />
    <input type="text" v-model="uneNote" placeholder="Entrez votre note" />
    <input type="button" value="Ajouter une note" @click="ajoute" />
  </form>
  <h3>Les notes existantes</h3>
  <table>
    <tr v-for="note in notes" v-bind:key="note.id">
      <td>
        <input type="button" value="&cross;" @click="supprime(note.id)" />
      </td>
      <td>{{ note.date }}</td>
      <td>{{ note.note }}</td>
    </tr>
  </table>
</template>
