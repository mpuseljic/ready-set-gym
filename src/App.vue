<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >
      <div class="d-flex align-center">


      </div>

      <v-btn
        href="/"
        text
      >
      <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="@/assets/logorsg.jpg"
          width="250"
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
    Navbar
  },
  data: () => ({
    //
  }),
};
</script>
