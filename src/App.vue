<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >
      <v-btn
        href="/home"
        text
      >
      <v-img
          alt="Vuetify Name"
          class="shrink"
          contain
          src="@/assets/logorsg.jpg"
          max-width="250"
        />
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <navbar />
  </v-app>
  
</template>

<script>

import Navbar from './components/Navbar.vue'


export default {
  name: 'App',

  components: {
    Navbar,
  },
  data: () => ({
    //
  }),
};
</script>
