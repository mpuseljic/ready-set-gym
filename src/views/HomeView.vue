<template>
<div class="main" :style="{'background-color':'black', 'height':'100%'}">
    <div class="header" :style="{'padding-left':'15px'}">
    </div>
    <div class="header">
      <h1 :style="{'color':'#D29433'}">Let's crush it!</h1>
    </div>
    <v-autocomplete
    :style="{ backgroundColor: 'gray' }"
    auto-select-first
    chips
    clearable
    deletable-chips
    dense
    multiple
    rounded
    small-chips
></v-autocomplete>
    <div class="header">
      <h1 :style="{'color': 'white'}">RECOMMENDED WORKOUTS</h1>
    </div>

  <v-carousel v-model="model">
    <v-carousel-item>
    <v-card
    class="mx-auto"
    max-width="344"
    dark
  >
    <v-img
      src="@/assets/upperbody.jpg"
      height="200px"
    ></v-img>

    <v-card-title class="naslov">
      Upper Body Attack 
    </v-card-title>

    <v-card-subtitle>
      READY SET <span class="go">GO</span>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        text
        color="#D29433"
      >
        START WORKOUT
      </v-btn>

      <v-spacer></v-spacer>

    </v-card-actions>
  </v-card>

    

    </v-carousel-item>
    <v-carousel-item>
    <v-card
    class="mx-auto"
    max-width="344"
    dark
  >
    <v-img
      src="@/assets/lowerbody.jpg"
      height="200px"
    ></v-img>

    <v-card-title class="naslov">
      Lower Body Attack 
    </v-card-title>

    <v-card-subtitle>
      READY SET <span class="go">GO</span>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        text
        color="#D29433"
      >
        START WORKOUT
      </v-btn>

      <v-spacer></v-spacer>

    </v-card-actions>
  </v-card>

    

    </v-carousel-item>

    <v-carousel-item>
    <v-card
    class="mx-auto"
    max-width="344"
    dark
  >
    <v-img
      src="@/assets/crossfit.jpg"
      height="200px"
    ></v-img>

    <v-card-title class="naslov">
      CrossFit 
    </v-card-title>

    <v-card-subtitle>
      READY SET <span class="go">GO</span>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        text
        color="#D29433"
      >
        START WORKOUT
      </v-btn>

      <v-spacer></v-spacer>

    </v-card-actions>
  </v-card>

    

    </v-carousel-item>
  </v-carousel>

  <div class="header">
      <h1 :style="{'color': 'white'}">MY WORKOUT PLAN</h1>
    </div>

    <v-card
    class="mx-auto"
    max-width="344"
    dark
  >
    <v-img
      src="@/assets/lowerbody.jpg"
      height="200px"
    ></v-img>

    <v-card-title class="naslov">
      Lower Body Attack 
    </v-card-title>

    <v-card-subtitle>
      READY SET <span class="go">GO</span>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        text
        color="#D29433"
      >
        START WORKOUT
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text class="show">
          Use these timeless leg exercises to gain mass and strength on your lower body. A varied combination of reps and sets will help to keep your routine fresh.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

  <v-card
    class="mx-auto"
    max-width="344"
    dark
  >
    <v-img
      src="@/assets/upperbody.jpg"
      height="200px"
    ></v-img>

    <v-card-title class="naslov">
      Upper Body Attack 
    </v-card-title>

    <v-card-subtitle>
      READY SET <span class="go">GO</span>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        text
        color="#D29433"
      >
        START WORKOUT
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text class="show">
          Time to get the arms, shoulders and chest into it! You will need some dumbbells to get this one done.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

    <div class="header">
      <h1 :style="{'color':'white'}">EXERCISE LIST</h1>
    </div>
  <v-card
    class="mx-auto"
    max-width="344"
    dark
  >
    <v-img
      src="@/assets/upperbody.jpg"
      height="200px"
    ></v-img>

    <v-card-title class="naslov-vjezbe">
      BENCH PRESS 
    </v-card-title>

    <v-card-actions>

      <v-btn icon 
        :style="{width: '35px', margin: 'auto'}"
      >
      <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text class="show">
          Time to get the arms, shoulders and chest into it! You will need some dumbbells to get this one done.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>



</div>


</template>

<script>
  export default {
    data: () => ({
      show: false,
      model: 0,
      colors: [
        'black'
      ],
      cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', },]
    }),
  }
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
 /* Optional: Adjust the height of the container based on your requirements */
}

.naslov-vjezbe{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
