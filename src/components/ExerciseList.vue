<template>
  <v-card
    class="mx-auto"
    max-width="344"
    dark
  >
    <v-img
      :src="ecard.url"
      height="200px"
    ></v-img>

    <v-card-title class="naslov-vjezbe">
      {{ ecard.title }} 
    </v-card-title>

    <v-card-actions>

      <v-btn icon 
        :style="{width: '35px', margin: 'auto'}"
        @click="addedToFav"
      >
      <v-icon :color="srce" size="30">mdi-heart</v-icon>
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
export default {
    name: 'ExcerciseList',
    props: ['ecard'],
    data: () => ({
      added: false,
      colors: [
        'black'
      ],
      cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', },],
      srce: 'gray'
    }),
    methods: {
      addedToFav() {
        console.log("Favorite button clicked");
        console.log("Exercise: ", this.ecard.title)
        if (!this.added){
          this.added = true
          this.srce = 'red'


          this.$emit('addExerciseToWorkoutCard', this.ecard);
        } else {
          this.added = false
          this.srce = 'gray'
        }
        

      }
    },
}
</script>

<style>
.naslov-vjezbe{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>