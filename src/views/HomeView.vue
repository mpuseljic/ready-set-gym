<template>
<div class="main" :style="{'background-color':'black', 'height':'100%'}">
    <div class="header" :style="{'padding-left':'15px'}">
    </div>
    <div class="header">
      <h1 :style="{'color':'#D29433'}">Let's crush it!</h1>
    </div>

  <v-autocomplete
    v-model="store.searchTerm"
    :items="filteredCards"
    item-text="title"
    item-value="title"
    :style="{ backgroundColor: '#696969', width: '700px', height:'45px', margin: 'auto', top:'6px' }"
    auto-select-first
    chips
    clearable
    deletable-chips
    dense
    multiple
    rounded
    small-chips
    :label="'Search anything...'"
  ></v-autocomplete>
    <div class="header">
      <h1 :style="{'color': 'white'}">RECOMMENDED WORKOUTS </h1>
    </div>
<div>
    <v-carousel v-model="model">
    <v-carousel-item v-for="(item, index) in carouselItems" :key="index">
      <v-card class="mx-auto" max-width="344" dark>
        <v-img :src="item.url" height="200px"></v-img>

        <v-card-title class="naslov">
          {{ item.title }}
        </v-card-title>

        <v-card-subtitle>
          READY SET <span class="go">GO</span>
        </v-card-subtitle>

        <v-card-actions>
          
            <v-btn color="#D29433" >START WORKOUT</v-btn>
         
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-carousel-item>
  </v-carousel>
</div>

  <div class="header">
      <h1 :style="{'color': 'white'}">MY WORKOUT PLAN</h1>
    </div>
    <div class="add">
      <v-btn @click="openDialog" color="#D29433" block elevation="2" large small tile x-small>ADD WORKOUT</v-btn>

<v-dialog v-model="dialogVisible" max-width="700px">
  <v-card color="grey">
    <v-card-title>Add Workout</v-card-title>
    <v-card-text>
      <v-form>
        <v-file-input v-model="selectedFile" label="Select an image" accept="image/*"></v-file-input>
        <v-text-field v-model="workoutName" label="Workout Name"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="#D29433" @click="saveWorkout">Save</v-btn>
      <v-btn color="secondary" @click="closeDialog">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<v-dialog v-model="addWorkoutDialog" max-width="700px">
  <v-card color="grey">
    <v-card-title>Add exercises to your workout</v-card-title>
    <v-card-text>
      <v-container fluid >
    <v-row>
      <v-col
        v-for="exercise in exercises"
        :key="exercise.id"
        cols="4"
      >
        <v-checkbox
          v-model="selected"
          :label="exercise.id"
          :value="exercise.id"
        ></v-checkbox>
      </v-col>
    </v-row>
  </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn color="#D29433" @click="saveWorkouts">Save</v-btn>
      <v-btn color="secondary" @click="closeDialog">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
    </div>
    <div>
        <v-carousel v-model="model1">
    <v-carousel-item v-for="(item, index) in myworkouts" :key="index">
      <v-card class="mx-auto" max-width="344" dark>
        <v-img :src="item.imageUrl" height="200px"></v-img>

        <v-card-title class="naslov">
          {{ item.id }}
        </v-card-title>

        <v-card-subtitle>
          READY SET <span class="go">GO</span>
        </v-card-subtitle>

        <v-card-actions>
          
            <v-btn color="#D29433" >START WORKOUT</v-btn>
            <v-btn color="red" @click="deleteWorkout(item.id)">DELETE</v-btn>
         
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-carousel-item>
  </v-carousel>

  </div>
    <div class="header">
      <h1 :style="{'color':'white'}">EXERCISE LIST</h1>
    </div>

    <div class="exerciselist" v-for="card in filteredCards" :key="card.title">
      <v-card
    class="mx-auto"
    max-width="344"
    dark
  >
    <v-img
      :src="card.url"
      :alt="card.title"
      height="200px"
    ></v-img>

    <v-card-title class="naslov-vjezbe">
      {{ card.title }} 
    </v-card-title>



  </v-card>
    </div>


</div>


</template>

<script>
import router from '@/router';

import store from "@/store";
import {firebase, db, storage} from '@/firebase'


  export default {
    components:{
       
      },
    data: () => ({
      selected: [], // Stores the selected document ids
      exercises: [], // Stores the exercises documents
      addWorkoutDialog: false,
      dialogVisible: false,
      selectedFile: null,
      workoutName: '',
      model: 0,
      carouselItems: [
        { url: require('@/assets/lowerbody.jpg'), title: 'Lower Body Attack'},
        { url: require('@/assets/upperbody.jpg'), title: 'Upper Body Attack'},
        { url: require('@/assets/crossfit.jpg'), title: 'CrossFit'},
      ],
      workoutcards: [],
      exercisecards:[],
      show: false,
      model1: 0,
      added: false,
      colors: [
        'black'
      ],
      
      store: store,
      myworkouts: []

    }),
    created(){
      
      const db = firebase.firestore()

      db.collection('exercises').get()
    .then((querySnapshot) => {
      const exercisecards = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const exercisecard = {
          url: data.imageUrl,
          title: doc.id, // Use the document id as the workout name
        };

        exercisecards.push(exercisecard);
      });

      this.exercisecards = exercisecards;
    })
    .catch((error) => {
      console.error('Error getting exercise collection:', error);
    });
    
    this.fetchMyWorkouts()
  },
      
    // created(){
      

  
    computed: {
      filteredCards(){
        let searchTerm = this.store.searchTerm;
        return this.exercisecards.filter(card => card.title.includes(searchTerm));
      //   let newCards = [];

      // for(let card of this.exercisecards){
      //   if(card.title.indexOf(searchTerm) >= 0){
      //     newCards.push(card)
      //   }
      // }
  
    //  return newCards;
    
      }
    },
      methods: {
        deleteWorkout(documentId) {
    // Assuming you have initialized Firebase Firestore and have a reference to the Firestore instance

    // Assuming you have initialized Firebase Firestore and have a reference to the Firestore instance
    const db = firebase.firestore()
    const userId = firebase.auth().currentUser.uid; // Replace with the actual user ID
    
    // Get a reference to the 'users' collection
    const usersCollection = db.collection('users');

    // Get a reference to the specific user document within 'users' collection
    const userDocumentRef = usersCollection.doc(userId);

    // Get a reference to the 'myworkouts' subcollection within the user document
    const myWorkoutsCollectionRef = userDocumentRef.collection('myworkouts');

    // Get a reference to the specific workout document within 'myworkouts' subcollection
    const workoutDocumentRef = myWorkoutsCollectionRef.doc(documentId);

    // Delete the workout document
    workoutDocumentRef
      .delete()
      .then(() => {
        console.log('Workout document deleted successfully');
        const itemIndex = this.myworkouts.findIndex(i => i.id === documentId);
          if (itemIndex !== -1) {
            this.myworkouts.splice(itemIndex, 1);
          }
      })
      .catch((error) => {
        console.error('Error deleting workout document:', error);
      });
  },
        fetchMyWorkouts () {
          const db = firebase.firestore()
    const userId = firebase.auth().currentUser.uid
      const workoutRef = db.collection('users').doc(userId)


      workoutRef.collection('myworkouts').get()
    .then((querySnapshot) => {
      const myworkouts = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        myworkouts.push({ id: doc.id,
        imageUrl: data.imageUrl })
      });

      this.myworkouts = myworkouts;
    })
    .catch((error) => {
      console.error('Error getting exercise collection:', error);
    });
      
        },
        addExerciseToWorkoutCard(exercise){
          console.log("ADDING EXERCISE: ", exercise.title)
          const workoutCard = this.workoutcards.find(card => card.subtitle === exercise.workoutCard);
          if(workoutCard){
            workoutCard.exercises.push(exercise);
            console.log("Exercise added to workout card: ", workoutCard.subtitle);
            console.log("Workout Card: ", workoutCard)
          }
        },
        openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
      this.resetFields();
    },
    closeExerciseDialog() {
      this.addWorkoutDialog = false
      this.resetFields()
    },
    resetFields() {
      this.selectedFile = null;
    },
    saveWorkout() {
      // Handle saving the workout logic here
      const db = firebase.firestore();
      const storageRef = firebase.storage().ref();
      const currentUser = firebase.auth().currentUser;
      const userId = currentUser.uid; // Replace with the actual user ID

      // Generate a unique file name using a timestamp
      const timestamp = new Date().getTime();
      const fileName = `${userId}_${timestamp}`;

      // Create a reference to the storage location
      const fileRef = storageRef.child(`workoutImages/${fileName}`);

      // Upload the file to storage
      fileRef.put(this.selectedFile)
        .then(snapshot => {
          // Get the download URL of the uploaded file
          return snapshot.ref.getDownloadURL();
        })
        .then(downloadURL => {
          // Add the workout to the "myworkouts" collection under the user's document
          return db.collection('users').doc(userId).collection('myworkouts').doc(
            this.workoutName,
          ).set({
            name: this.workoutName,
            imageUrl: downloadURL
          })
        })
        .then(() => {
          console.log('Workout saved successfully');
          this.closeDialog();
        })
        .catch(error => {
          console.error('Error saving workout:', error);
        });
        this.addWorkoutDialog = true
        this.fetchExercises()
        this.fetchMyWorkouts()
        const itemIndex = this.myworkouts.findIndex(i => i.id === this.workoutName);
          if (itemIndex !== -1) {
            this.myworkouts.splice(itemIndex, 1);
          }

    },
    fetchExercises() {
      // Assuming you have initialized Firebase SDK for Firestore
      db.collection("exercises")
        .get()
        .then((querySnapshot) => {
          const exercises = [];
          querySnapshot.forEach((doc) => {
            exercises.push({ id: doc.id });
          });
          this.exercises = exercises;
        })
        .catch((error) => {
          console.error("Error fetching exercises:", error);
        });
    },
    saveWorkouts() {
      // Assuming you have initialized Firebase SDK for Firestore
      const db = firebase.firestore();
      const userId = firebase.auth().currentUser.uid;
      const workoutsRef = db.collection("users").doc(userId).collection("myworkouts").doc(this.workoutName);

      workoutsRef
        .update({ exercises: this.selected })
        .then(() => {
          console.log("Workouts saved successfully!");
          this.closeExerciseDialog()
        })
        .catch((error) => {
          console.error("Error saving workouts:", error);
        });
        this.workoutName = ''
        this.selected = []
        this.fetchMyWorkouts()

    }
  }
};



  
  
    
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
 /* Optional: Adjust the height of the container based on your requirements */
}

.add{
margin: 50px;


}

.naslov-vjezbe{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
