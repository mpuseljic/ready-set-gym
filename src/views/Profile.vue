<template>
  <div class="main" :style="{ 'background-color': 'black', height: '100%' }">
    <div class="header">
      <h1>My profile</h1>
      <v-btn
        elevation="0"
        color="black"
        :style="{ 'padding-top': '15px' }"
        @click="logout()"
      >
        <v-icon color="red" x-large>mdi-power</v-icon>
      </v-btn>
    </div>
    <div class="icon-name">
      <v-icon color="white" size="200"> mdi-account-circle-outline</v-icon>
      <h1 class="name">{{ this.userName }} {{ this.userSurname }}</h1>
    </div>
    <div class="header">
      <h1 :style="{ color: '#D29433' }">My workouts</h1>
    </div>
    <div>
      <v-carousel v-model="model">
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
              <v-btn color="#D29433" @click="startWorkoutDialog(item.id)"
                >START WORKOUT</v-btn
              >
              <v-btn
                color="red"
                @click="deleteWorkout(item.id)"
                icon
                style="margin-left: 150px"
              >
                <v-icon>mdi-delete</v-icon></v-btn
              >

              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-carousel-item>
      </v-carousel>
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
            <v-btn color="secondary" @click="closeMyExerciseDialog"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div class="header">
      <h1 :style="{ color: '#D29433' }">My diaries</h1>
    </div>

    <v-card
      v-for="entry in diaryEntries"
      :key="entry.id"
      class="mx-auto"
      max-width="344"
      style="margin-bottom: 20px"
    >
      <v-card-title class="naslov">
        {{ entry.id }}
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon color="red" @click="deleteDiaryEntry(entry.id)"
            >mdi-delete</v-icon
          >
        </v-btn>
      </v-card-title>
      <v-card-subtitle>
        {{ entry.content }}
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import { firebase, db, storage } from "@/firebase";
import store from "@/store";

export default {
  name: "profile",
  components: {},
  props: ["firstName", "lastName"],
  data: () => ({
    cards: [],
    show: false,
    userName: "",
    userSurname: "",
    workoutName: "",
    myworkouts: [],
    diaryEntries: [],
    show: false,
    model: 0,
    exerciseDialog: false,
    myworkoutexercises: [],
    exercisesinworkout: [],
    exerciseImages: [],
  }),
  created() {
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
      })
      .catch((error) => {
        console.error("Error getting exercise collection:", error);
      });
  },
  methods: {
    closeMyExerciseDialog() {
      this.exerciseDialog = false;
    },
    deleteWorkout(documentId) {
      // Assuming you have initialized Firebase Firestore and have a reference to the Firestore instance

      // Assuming you have initialized Firebase Firestore and have a reference to the Firestore instance
      const db = firebase.firestore();
      const userId = firebase.auth().currentUser.uid; // Replace with the actual user ID

      // Get a reference to the 'users' collection
      const usersCollection = db.collection("users");

      // Get a reference to the specific user document within 'users' collection
      const userDocumentRef = usersCollection.doc(userId);

      // Get a reference to the 'myworkouts' subcollection within the user document
      const myWorkoutsCollectionRef = userDocumentRef.collection("myworkouts");

      // Get a reference to the specific workout document within 'myworkouts' subcollection
      const workoutDocumentRef = myWorkoutsCollectionRef.doc(documentId);

      // Delete the workout document
      workoutDocumentRef
        .delete()
        .then(() => {
          console.log("Workout document deleted successfully");
          const itemIndex = this.myworkouts.findIndex(
            (i) => i.id === documentId
          );
          if (itemIndex !== -1) {
            this.myworkouts.splice(itemIndex, 1);
          }
        })
        .catch((error) => {
          console.error("Error deleting workout document:", error);
        });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "login" });
        });
    },
    fetchUserData() {
      const user = store.currentUser;

      if (user) {
        const email = user;

        // Query Firestore collection
        db.collection("users")
          .where("email", "==", email)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((userDoc) => {
              const userData = userDoc.data();
              const name = userData.ime;
              const surname = userData.prezime;
              console.log("Name:", name);
              this.userName = name;
              this.userSurname = surname;
              console.log("Surname:", surname);
              // You can store or use the retrieved data as per your app's requirements
            });
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    },
    createWorkout(workoutName) {
      workoutName = this.workoutName;
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const userDocRef = db.collection("users").doc(currentUser.uid);

        if (currentUser) {
          // User created successfully
          const userDocRef = db.collection("users").doc(currentUser.uid);
          // Create "myworkouts" collection inside the user document
          userDocRef
            .collection("myworkouts")
            .doc(workoutName)
            .set({
              vjezbe: [],
            })
            .then(() => {
              console.log("myworkouts collection created successfully");
              // Handle any additional actions after sign-up and collection creation
            })
            .catch((error) => {
              console.error("Error creating myworkouts collection:", error);
            });
        }
      }
      this.workoutName = "";
    },
    fetchDiaryEntries() {
      const userId = firebase.auth().currentUser.uid;
      const diaryCollectionRef = db
        .collection("users")
        .doc(userId)
        .collection("mydiary");

      // Fetch the data from the collection
      diaryCollectionRef
        .get()
        .then((querySnapshot) => {
          const entries = [];
          querySnapshot.forEach((doc) => {
            entries.push({
              id: doc.id,

              content: doc.data().text,
            });
          });

          // Update the diaryEntries array with the fetched data
          this.diaryEntries = entries;
        })
        .catch((error) => {
          console.error("Error fetching diary entries:", error);
        });
    },
    deleteDiaryEntry(documentId) {
      // Assuming you have initialized Firebase Firestore and have a reference to the Firestore instance

      // Assuming you have initialized Firebase Firestore and have a reference to the Firestore instance
      const db = firebase.firestore();
      const userId = firebase.auth().currentUser.uid; // Replace with the actual user ID

      // Get a reference to the 'users' collection
      const usersCollection = db.collection("users");

      // Get a reference to the specific user document within 'users' collection
      const userDocumentRef = usersCollection.doc(userId);

      // Get a reference to the 'myworkouts' subcollection within the user document
      const myDiaryCollectionRef = userDocumentRef.collection("mydiary");

      // Get a reference to the specific workout document within 'myworkouts' subcollection
      const diaryDocumentRef = myDiaryCollectionRef.doc(documentId);

      // Delete the workout document
      diaryDocumentRef
        .delete()
        .then(() => {
          console.log("Diary document deleted successfully");
          const itemIndex = this.diaryEntries.findIndex(
            (i) => i.id === documentId
          );
          if (itemIndex !== -1) {
            this.diaryEntries.splice(itemIndex, 1);
          }
        })
        .catch((error) => {
          console.error("Error deleting workout document:", error);
        });
    },
    startWorkoutDialog(documentId) {
      // Retrieve the exercises for the selected workout from Firebase
      const userId = firebase.auth().currentUser.uid;
      const db = firebase.firestore();
      const workoutsRef = db
        .collection("users")
        .doc(userId)
        .collection("myworkouts");
      const workoutDoc = workoutsRef.doc(documentId);

      workoutDoc // Replace 'selectedWorkout' with the actual ID/name of the workout
        .get()
        .then((doc) => {
          const fbdata = [];
          if (doc.exists) {
            const data = doc.data();
            const { imageUrl, name, exercises } = data; // Destructure the attributes from the document data
            console.log("ImageUrl:", imageUrl);
            console.log("Name:", name);
            console.log("Exercises:", exercises);
            fbdata.push({
              id: data.id,
              name: data.name,
              imageUrl: data.imageUrl,
              exercises: data.exercises,
            });
            this.myworkoutexercises = fbdata;
            this.exercisesinworkout = fbdata.map((item) => item.exercises);
            const extractedArray = Array.from(this.exercisesinworkout);
            console.log(extractedArray);
            const nestedArray = extractedArray[0];
            console.log(nestedArray);
            this.fetchExerciseImages(nestedArray);
          } else {
            console.log("Workout document does not exist");
          }
        })
        .catch((error) => {
          console.error("Error retrieving workout document:", error);
        });
      this.exerciseDialog = true;
    },
    fetchExerciseImages(exerciseIds) {
      const db = firebase.firestore();

      const validExerciseIds = exerciseIds.filter(
        (exerciseId) => typeof exerciseId === "string"
      );

      const exerciseRefs = validExerciseIds.map((exerciseId) =>
        db.collection("exercises").doc(exerciseId)
      );

      Promise.all(exerciseRefs.map((exerciseRef) => exerciseRef.get()))
        .then((querySnapshots) => {
          const exercisecards = querySnapshots.map((doc) => {
            if (doc.exists) {
              const data = doc.data();
              const exercisecard = {
                imageUrl: data.imageUrl,
                naziv: doc.id,
              };
              return JSON.parse(JSON.stringify(exercisecard));
            } else {
              console.error(`Exercise with ID ${doc.id} does not exist.`);
              return null;
            }
          });

          const filteredExercisecards = exercisecards.filter(
            (card) => card !== null
          );

          console.log("Hello", filteredExercisecards);
          this.exerciseImages = filteredExercisecards;
        })
        .catch((error) => {
          console.error("Error getting exercise collection:", error);
        });
    },
  },
  mounted() {
    this.fetchUserData();
    this.fetchDiaryEntries();
  },
};
</script>


<style>
.header {
  padding: 0 37px 0 37px;
  color: white;
  display: flex;
  justify-content: space-between;
}
.icon-name {
  margin-top: 20px;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.name {
  color: white;
}

.show {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.name {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.d-flex {
  margin: auto;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.calendar {
  margin: auto;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.naslov {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
</style>