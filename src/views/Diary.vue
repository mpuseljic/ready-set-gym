<template>
  <div class="main" :style="{'background-color':'black', 'height':'100%'}">
    <div class="header" :style="{'padding-left':'15px'}">
      <v-btn color="black" :style="{'width':'30px'}">
        <v-icon x-large color="white">
          mdi-chevron-left
        </v-icon>
      </v-btn>
    </div>
    <div class="header">
      <h1 :style="{'color':'#D29433'}">My diary</h1>
    </div>
    <v-container>
      <v-date-picker
        color="#D29433"
        v-model="selectedDate"
        class="mt-4"
        style="max-height: 350px;"
        ></v-date-picker>
    </v-container>
    <v-container class="text-center">
      <v-textarea
        v-model="content"
        background-color="#D29433"
        color="orange orange-darken-4"
        label="Write something..."
      ></v-textarea>
    </v-container>
      <v-container>
      <v-btn
        rounded
        color="red"
        dark
        @click="deleteContent"

      >
        DELETE
      </v-btn>
      <v-btn
        rounded
        color="green"
        dark
        @click="saveContent"

      >
        SAVE
      </v-btn>
      </v-container>
    

  </div>
</template>

<script>
import { firebase } from '@/firebase'

export default {
  components:{
   
  },
  data() {
    return {
      selectedDate: null,
      content: ''
    };
  },
  methods: {
    deleteContent() {
      this.content = '';
    },
    saveContent(){
      const db = firebase.firestore();
      const userId = firebase.auth().currentUser.uid;
      const diaryRef = db.collection("users").doc(userId).collection("mydiary").doc(this.selectedDate);

      diaryRef
        .set({ 
          text: this.content
        })
        .then(() => {
          console.log("Diary saved successfully!");
          this.content = ''
          this.selectedDate = null
        })
        .catch((error) => {
          console.error("Error saving workouts:", error);
        });
    },

  },
  watch: {
    selectedDate(newDate) {
      console.log("Selected date:", newDate);
    }
  }
};
</script>
