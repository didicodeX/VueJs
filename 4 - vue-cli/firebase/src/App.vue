<script setup>
// Importation des modules nécessaires depuis Firebase
import { db } from "@/firebase/index.js";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { onMounted, ref } from "vue";
import { v4 as uuidv4 } from 'uuid';

// Déclaration des variables réactives pour les notes, la note saisie et la date saisie
let notes = ref([]); // Tableau réactif pour stocker les notes
let uneNote = ref(""); // Stocke la note saisie par l'utilisateur
let uneDate = ref(""); // Stocke la date saisie par l'utilisateur

// Utilisation de la fonction onMounted pour récupérer les notes à partir de Firestore
onMounted(async () => {
  // Ecoute en temps réel les changements dans la collection "notes"
  onSnapshot(collection(db, "notes"), (querySnapshot) => {
    // Vide le tableau notes à chaque mise à jour pour éviter les doublons
    notes.value = [];

    // Itération sur chaque document récupéré depuis Firestore
    querySnapshot.forEach((doc) => {
      let note = {
        id: doc.id, // ID du document
        date: doc.data().date, // Date de la note
        note: doc.data().note, // Contenu de la note
      };
      // Ajout de la note dans le tableau réactif
      notes.value.push(note);
    });
  });
});

// Fonction pour ajouter une nouvelle note dans Firestore
async function addNote() {
  // Vérifie que la date et la note sont bien remplies avant de les ajouter
  if (uneDate.value && uneNote.value) {
    // Ajoute une nouvelle note dans Firestore avec un ID unique généré par uuidv4
    await setDoc(doc(db, "notes", uuidv4()), { 
      date: uneDate.value, 
      note: uneNote.value 
    });
    // Réinitialise les champs après l'ajout de la note pour vider les inputs
    uneDate.value = "";
    uneNote.value = "";
  }
}

// Fonction pour supprimer une note de Firestore en fonction de son ID
async function remove(id) {
  // Suppression du document correspondant à l'ID passé en argument
  await deleteDoc(doc(db, "notes", id));
}
</script>

<template>
  <h3>Saisir une note</h3>
  <!-- Formulaire de saisie de la date et de la note -->
  <form @submit.prevent="addNote">
    <!-- Champ de saisie pour la date, relié à la variable réactive uneDate -->
    <input type="date" v-model="uneDate" required />
    <!-- Champ de saisie pour la note, relié à la variable réactive uneNote -->
    <input type="text" v-model="uneNote" placeholder="Entrez votre note" required />
    <!-- Bouton pour soumettre la note (formulaire) -->
    <input type="submit" value="Ajouter une note" />
  </form>

  <h3>Les Notes existantes</h3>
  <!-- Tableau affichant les notes récupérées depuis Firestore -->
  <table>
    <tr v-for="note in notes" :key="note.id">
      <td>{{ note.date }}</td>
      <td>{{ note.note }}</td>
      <!-- Bouton pour supprimer une note, en passant son ID à la fonction remove -->
      <td><input type="button" value="&cross;" @click="remove(note.id)" /></td>
    </tr>
  </table>
</template>

<style scoped>
form input {
  width: 180px;
}

/* Style pour le formulaire */
form {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
