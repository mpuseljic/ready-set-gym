<template>
<div class="main" :style="{'background-color':'black', 'height':'100%'}">
    <div class="header" :style="{'padding-left':'15px'}">
    </div>
    <div class="header">
      <h1 :style="{'color':'#D29433'}">Let's crush it!</h1>
    </div>
    <v-autocomplete
    :style="{ backgroundColor: 'gray', width: '95.5%', margin: 'auto' }"
    auto-select-first
    chips
    clearable
    deletable-chips
    dense
    multiple
    rounded
    small-chips
    :items="items"
></v-autocomplete>

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
  </v-carousel>


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
      items: ['Bench', 'Home']
    }),
  }
</script>

<style>


</style>
