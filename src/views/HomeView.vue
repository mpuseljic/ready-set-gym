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

  <div class="header">
      <h1 :style="{'color': 'white'}">MY WORKOUT PLAN</h1>
    </div>
    <ProfileCard v-for="(card, index) in workoutcards" :key="index" :card="card" />

    <div class="header">
      <h1 :style="{'color':'white'}">EXERCISE LIST</h1>
    </div>

    <ExerciseList v-for="(ecard, index) in filteredCards" :key="index" :ecard="ecard" @addExerciseToWorkoutCard="addExerciseToWorkoutCard"/>
    
</div>


</template>

<script>
import router from '@/router';
import ProfileCard from '@/components/ProfileCard.vue';
import ExerciseList from '@/components/ExerciseList.vue';
import store from "@/store";


  export default {
    components:{
        ProfileCard,
        ExerciseList,
        
      },
    data: () => ({
      model: 0,
      carouselItems: [
        { url: require('@/assets/lowerbody.jpg'), title: 'Lower Body Attack'},
        { url: require('@/assets/upperbody.jpg'), title: 'Upper Body Attack'},
        { url: require('@/assets/crossfit.jpg'), title: 'CrossFit'},
      ],
      workoutcards: [],
      exercisecards:[],
      show: false,
      model: 0,
      added: false,
      colors: [
        'black'
      ],
      
      store: store,

    }),
    created(){
      this.workoutcards = [
      {url: require('@/assets/lowerbody.jpg'), subtitle: 'Lower Body Attack', text: 'Use these timeless leg exercises to gain mass and strength on your lower body. A varied combination of reps and sets will help to keep your routine fresh.', exercises: []},
      {url: require('@/assets/upperbody.jpg'), subtitle: 'Upper Body Attack', text: 'Build a strong upper body with these effective exercises. Focus on form and gradually increase weights to maximize results.', exercises:[]},
      ],
      this.exercisecards = [
        {url: require('@/assets/dumbellinclinepress.gif'), title: 'DUMBBELL INCLINE PRESS', workoutCard: 'Upper Body Attack'},
        {url: require('@/assets/benchdips.webp'), title: 'BENCH DIPS'},
        {url: require('@/assets/seateddumbbell.gif'), title: 'SEATED DUMBBELL REVERSE FLY'},
        {url: require('@/assets/latpulldown.gif'), title: 'LAT PULLDOWN', workoutCard: 'Upper Body Attack'},
        {url: require('@/assets/bicepcurl.gif'), title: 'BICEPS CURL'},
        {url: require('@/assets/lateralraise.gif'), title: 'FRONT TO LATERAL RAISE'},
        {url: require('@/assets/pullups.gif'), title: 'PULL UPS'},
        {url: require('@/assets/bulgarian.gif'), title: 'BULGARIAN SPLIT SQUAT'},
        {url: require('@/assets/deadlift.gif'), title: 'DEADLIFT'},
        {url: require('@/assets/hipthrust.gif'), title: 'HIP THRUST'},
        {url: require('@/assets/stepups.gif'), title: 'WEIGHTED STEP UPS'},
        {url: require('@/assets/jammerpress.gif'), title: 'BARBELL JAMMER PRESS'},
        {url: require('@/assets/goodmorning.gif'), title: 'GOOD MORNING'},
        {url: require('@/assets/cheststretch.webp'), title: 'CHEST STRETCH'},
        {url: require('@/assets/cobra.gif'), title: 'COBRA'},
        {url: require('@/assets/neckstretch.gif'), title: 'NECK STRETCH'},
        {url: require('@/assets/calfstretch.gif'), title: 'CALF STRETCH'},
        {url: require('@/assets/hamstringstretch.gif'), title: 'HAMSTRING STRETCH'},
        {url: require('@/assets/sidelunge.gif'), title: 'SIDE LUNGE STRETCH'},
        {url: require('@/assets/hipflexor.gif'), title: 'HIP FLEXOR STRETCH'},
        {url: require('@/assets/butterfly.gif'), title: 'BUTTERFLY STRETCH'},
      ]
    },
    computed: {
      filteredCards(){
        let searchTerm = this.store.searchTerm;
        return this.exercisecards.filter(ecard => ecard.title.includes(searchTerm));
        // let newCards = [];

        // for(let ecard of this.exercisecards){
        //   if(ecard.title.indexOf(searchTerm) >= 0){
        //     newCards.push(ecard)
        //   }
        // }
  
        // return newCards;
      }},
      methods: {
        addExerciseToWorkoutCard(exercise){
          console.log("ADDING EXERCISE: ", exercise.title)
          const workoutCard = this.workoutcards.find(card => card.subtitle === exercise.workoutCard);
          if(workoutCard){
            workoutCard.exercises.push(exercise);
            console.log("Exercise added to workout card: ", workoutCard.subtitle);
            console.log("Workout Card: ", workoutCard)
          }
        },

      }
  }



  
  
    
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
 /* Optional: Adjust the height of the container based on your requirements */
}



</style>
