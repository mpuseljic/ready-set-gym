<template>
<div class="cards">

<v-card
  class="mx-auto"
  max-width="344"
  dark
>
  <v-img
    :src="card.url"
    height="200px"
    width="400px"
  ></v-img>

  <v-card-title class="naslov">
    {{ card.subtitle }} 
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
        {{ card.text }}
      </v-card-text>
    </div>
  </v-expand-transition>
</v-card>
</div>
</template>

<script>


export default {
    name: 'ProfileCard',
    props: ['card'],
    data: () => ({
        show: false
    }),


}

</script>

<style>
.cards{
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
}
.mx-auto {
  margin: 10px;
  font-weight: bold;
}

.go{
  color: #D29433;
  
}


</style>