<template>
  <div class="main" :style="{ 'background-color': 'black', height: '100%' }">
    <div class="header" :style="{ 'padding-left': '15px' }"></div>
    <div class="header">
      <h1 :style="{ color: '#D29433' }">Let's crush it!</h1>
    </div>
    <v-container>
      <v-autocomplete
        v-model="store.searchTerm"
        :items="filteredCards"
        item-text="title"
        item-value="title"
        :style="{
          backgroundColor: '#696969',
          maxWidth: '700px',
          height: '45px',
          margin: 'auto',
        }"
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
    </v-container>

    <div class="header">
      <h1 :style="{ color: 'white' }">RECOMMENDED WORKOUTS</h1>
    </div>
    <div>
      <v-carousel v-model="model">
        <v-carousel-item
          v-for="(item, index) in recommendedWorkout"
          :key="index"
        >
          <v-card class="mx-auto" max-width="344" dark>
            <v-img :src="item.imageUrl" height="200px"></v-img>

            <v-card-title class="naslov">
              {{ item.id }}
            </v-card-title>

            <v-card-subtitle>
              READY SET <span class="go">GO</span>
            </v-card-subtitle>

            <v-card-actions>
              <v-btn color="#D29433" @click="startRecommendedDialog(item.id)"
                >START WORKOUT</v-btn
              >

              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-carousel-item>
      </v-carousel>
    </div>
    <v-dialog v-model="startRecommendedWorkout" max-width="500px">
      <v-card color="grey">
        <v-card-title></v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-card
              v-for="(item, index) in recommendedWorkouts"
              :key="index"
              dark
            >
              <v-img :src="item.imageUrl" height="200px"></v-img>
              <v-card-title class="justify-center">{{
                item.name
              }}</v-card-title>
              <v-card-subtitle class="text-center">
                READY SET <span class="go">GO</span>
              </v-card-subtitle>
              <v-card v-for="(item, index) in exerciseImages" :key="index">
                <v-card-title class="justify-center">
                  <v-img :src="item.imageUrl" height="200px"></v-img
                ></v-card-title>
                <v-card-subtitle class="text-center"
                  >{{ item.naziv }}
                </v-card-subtitle>
              </v-card>
            </v-card>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" @click="closeRecommendedDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="header">
      <h1 :style="{ color: 'white' }">MY WORKOUT PLAN</h1>
    </div>
    <div class="add">
      <v-btn
        @click="openDialog"
        color="#D29433"
        block
        elevation="2"
        large
        small
        tile
        x-small
        >ADD WORKOUT</v-btn
      >

      <v-dialog v-model="dialogVisible" max-width="700px">
        <v-card color="grey">
          <v-card-title>Add Workout</v-card-title>
          <v-card-text>
            <v-form>
              <v-file-input
                v-model="selectedFile"
                label="Select an image"
                accept="image/*"
              ></v-file-input>
              <v-text-field
                v-model="workoutName"
                label="Workout Name"
              ></v-text-field>
            </v-form>
            <div>
              <span class="userError" v-if="workoutnameError"
                >Workout name can't be blank!</span
              >
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="#D29433" @click="saveWorkout" :loading="loading"
              >Save</v-btn
            >
            <v-btn color="secondary" @click="closeDialog">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="addWorkoutDialog" max-width="700px">
        <v-card color="grey">
          <v-card-title>Add exercises to your workout</v-card-title>
          <v-card-text>
            <v-container fluid>
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
            <v-btn color="secondary" @click="closeExerciseDialog">Cancel</v-btn>
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

            <v-card-text> READY SET <span class="go">GO</span> </v-card-text>

            <v-card-actions>
              <v-btn color="#D29433" @click="startWorkoutDialog(item.id)"
                >Start Workout</v-btn
              >

              <v-btn
                color="red"
                @click="deleteWorkout(item.id)"
                icon
                style="margin-left: 150px"
              >
                <v-icon>mdi-delete</v-icon></v-btn
              >
            </v-card-actions>
          </v-card>
        </v-carousel-item>
      </v-carousel>
    </div>
    <v-dialog v-model="exerciseDialog" max-width="500px">
      <v-card color="grey">
        <v-card-title></v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-card
              v-for="(item, index) in myworkoutexercises"
              :key="index"
              dark
            >
              <v-img :src="item.imageUrl" height="200px"></v-img>
              <v-card-title class="justify-center">{{
                item.name
              }}</v-card-title>
              <v-card-subtitle class="text-center">
                READY SET <span class="go">GO</span>
              </v-card-subtitle>
              <v-card v-for="(item, index) in exerciseImages" :key="index">
                <v-card-title class="justify-center">
                  <v-img :src="item.imageUrl" height="200px"></v-img
                ></v-card-title>
                <v-card-subtitle class="text-center"
                  >{{ item.naziv }}
                </v-card-subtitle>
              </v-card>
            </v-card>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" @click="closeMyExerciseDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="header">
      <h1 :style="{ color: 'white' }">EXERCISE LIST</h1>
    </div>

    <div class="exerciselist" v-for="card in filteredCards" :key="card.title">
      <v-card class="mx-auto" max-width="344" dark style="margin-bottom: 20px">
        <v-img :src="card.url" :alt="card.title" height="200px"></v-img>

        <v-card-title class="naslov-vjezbe">
          {{ card.title }}
        </v-card-title>
      </v-card>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import store from "@/store";
import { firebase, db, storage } from "@/firebase";

export default {
  components: {},
  data: () => ({
    workoutnameError: false,
    selected: [],
    exercises: [],
    addWorkoutDialog: false,
    dialogVisible: false,
    selectedFile: null,
    workoutName: "",
    model: 0,
    workoutcards: [],
    exercisecards: [],
    show: false,
    model1: 0,
    added: false,
    colors: ["black"],

    store: store,
    myworkouts: [],
    exerciseDialog: false,
    myworkoutexercises: [],
    loading: false,
    exercisesinworkout: [],
    exerciseImages: [],
    startRecommendedWorkout: false,
    recommendedWorkouts: [],
    recommendedWorkout: [],
    recommendedWorkoutExercises: [],
  }),

  created() {
    const db = firebase.firestore();

    db.collection("exercises")
      .get()
      .then((querySnapshot) => {
        const exercisecards = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const exercisecard = {
            url: data.imageUrl,
            title: doc.id,
          };

          exercisecards.push(exercisecard);
        });

        this.exercisecards = exercisecards;
      });

    this.fetchMyWorkouts();
    this.fetchRecommendedWorkouts();
  },

  computed: {
    filteredCards() {
      let searchTerm = this.store.searchTerm;
      return this.exercisecards.filter((card) =>
        card.title.includes(searchTerm)
      );
    },
  },


  methods: {
    startRecommendedDialog(documentId) {
      const db = firebase.firestore();
      const recommendedRef = db
        .collection("recommendedWorkout")
        .doc(documentId);

      recommendedRef.get().then((doc) => {
        const fbrecommended = [];
        if (doc.exists) {
          const data = doc.data();

          fbrecommended.push({
            imageUrl: data.imageUrl,
            name: data.name,
            exercises: data.exercises,
          });
          this.recommendedWorkouts = fbrecommended;
          this.recommendedWorkoutExercises = fbrecommended.map(
            (item) => item.exercises
          );
          const extractedArray = Array.from(this.recommendedWorkoutExercises);
          const nestedArray = extractedArray[0];
          this.fetchExerciseImages(nestedArray);
        }
      });
      this.startRecommendedWorkout = true;
    },

    startWorkoutDialog(documentId) {
      const userId = firebase.auth().currentUser.uid;
      const db = firebase.firestore();
      const workoutsRef = db
        .collection("users")
        .doc(userId)
        .collection("myworkouts");
      const workoutDoc = workoutsRef.doc(documentId);

      workoutDoc.get().then((doc) => {
        const fbdata = [];
        if (doc.exists) {
          const data = doc.data();
          fbdata.push({
            id: data.id,
            name: data.name,
            imageUrl: data.imageUrl,
            exercises: data.exercises,
          });
          this.myworkoutexercises = fbdata;
          this.exercisesinworkout = fbdata.map((item) => item.exercises);
          const extractedArray = Array.from(this.exercisesinworkout);
          const nestedArray = extractedArray[0];
          this.fetchExerciseImages(nestedArray);
        }
      });
      this.exerciseDialog = true;
    },

    deleteWorkout(documentId) {
      const db = firebase.firestore();
      const userId = firebase.auth().currentUser.uid;
      const usersCollection = db.collection("users");
      const userDocumentRef = usersCollection.doc(userId);
      const myWorkoutsCollectionRef = userDocumentRef.collection("myworkouts");
      const workoutDocumentRef = myWorkoutsCollectionRef.doc(documentId);

      workoutDocumentRef.delete().then(() => {
        const itemIndex = this.myworkouts.findIndex((i) => i.id === documentId);
        if (itemIndex !== -1) {
          this.myworkouts.splice(itemIndex, 1);
        }
      });
    },

    fetchMyWorkouts() {
      const db = firebase.firestore();
      const userId = firebase.auth().currentUser.uid;
      const workoutRef = db.collection("users").doc(userId);

      workoutRef
        .collection("myworkouts")
        .get()
        .then((querySnapshot) => {
          const myworkouts = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            myworkouts.push({ id: doc.id, imageUrl: data.imageUrl });
          });

          this.myworkouts = myworkouts;
        });
    },

    addExerciseToWorkoutCard(exercise) {
      const workoutCard = this.workoutcards.find(
        (card) => card.subtitle === exercise.workoutCard
      );
      if (workoutCard) {
        workoutCard.exercises.push(exercise);
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
      this.addWorkoutDialog = false;
      this.resetFields();
      this.saveWorkouts();
    },

    resetFields() {
      this.selectedFile = null;
      this.workoutnameError = false;
    },

    closeMyExerciseDialog() {
      this.exerciseDialog = false;
      this.resetFields();
    },


    async saveWorkout() {
      if (this.workoutName === "") {
        this.workoutnameError = true;
      } else {
        this.workoutnameError = false;
        try {
          this.loading = true;
          const db = firebase.firestore();
          const storageRef = firebase.storage().ref();
          const currentUser = firebase.auth().currentUser;
          const userId = currentUser.uid;

          const timestamp = new Date().getTime();
          const fileName = `${userId}_${timestamp}`;
          const fileRef = storageRef.child(`workoutImages/${fileName}`);
          const snapshot = await fileRef.put(this.selectedFile);
          const downloadURL = await snapshot.ref.getDownloadURL();

          await db
            .collection("users")
            .doc(userId)
            .collection("myworkouts")
            .doc(this.workoutName)
            .set({
              name: this.workoutName,
              imageUrl: downloadURL,
            });
          this.closeDialog();
        } catch (error) {}

        this.addWorkoutDialog = true;
        this.fetchExercises();
        this.fetchMyWorkouts();
        const itemIndex = this.myworkouts.findIndex(
          (i) => i.id === this.workoutName
        );
        if (itemIndex !== -1) {
          this.myworkouts.splice(itemIndex, 1);
        }
        this.loading = false;
      }
    },

    fetchExercises() {
      db.collection("exercises")
        .get()
        .then((querySnapshot) => {
          const exercises = [];
          querySnapshot.forEach((doc) => {
            exercises.push({ id: doc.id });
          });
          this.exercises = exercises;
        });
    },

    saveWorkouts() {
      const db = firebase.firestore();
      const userId = firebase.auth().currentUser.uid;
      const workoutsRef = db
        .collection("users")
        .doc(userId)
        .collection("myworkouts")
        .doc(this.workoutName);

      workoutsRef.update({ exercises: this.selected }).then(() => {
        this.closeExerciseDialog();
      });
      this.workoutName = "";
      this.selected = [];
      this.fetchMyWorkouts();
    },

    fetchExerciseImages(exerciseIds) {
      const db = firebase.firestore();

      const validExerciseIds = exerciseIds.filter(
        (exerciseId) => typeof exerciseId === "string"
      );

      const exerciseRefs = validExerciseIds.map((exerciseId) =>
        db.collection("exercises").doc(exerciseId)
      );

      Promise.all(exerciseRefs.map((exerciseRef) => exerciseRef.get())).then(
        (querySnapshots) => {
          const exercisecards = querySnapshots.map((doc) => {
            if (doc.exists) {
              const data = doc.data();
              const exercisecard = {
                imageUrl: data.imageUrl,
                naziv: doc.id,
              };
              return JSON.parse(JSON.stringify(exercisecard));
            } else {
              return null;
            }
          });

          const filteredExercisecards = exercisecards.filter(
            (card) => card !== null
          );
          this.exerciseImages = filteredExercisecards;
        }
      );
    },

    fetchRecommendedWorkouts() {
      const db = firebase.firestore();
      const recommendedRef = db.collection("recommendedWorkout");

      recommendedRef.get().then((querySnapshot) => {
        const recommendedWorkouts = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          recommendedWorkouts.push({
            id: doc.id,
            imageUrl: data.imageUrl,
            exercises: data.exercises,
          });
        });
        this.recommendedWorkout = recommendedWorkouts;
      });
    },
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add {
  margin: 50px;
}
.go {
  color: #d29433;
}
.naslov-vjezbe {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
