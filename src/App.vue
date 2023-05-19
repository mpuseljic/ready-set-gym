<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >
      <v-btn
        href="/"
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
    <navbar v-if="store.currentUser"/>
  </v-app>
  
</template>

<script>
import store from '@/store'
import Navbar from '@/components/Navbar.vue'
import {firebase} from '@/firebase';

firebase.auth().onAuthStateChanged((user) => {
  if(user){
    console.log("User " + user.email);
    store.currentUser = user.email;
  }else{
    console.log("No user");
    store.currentUser = null;
  }
})


export default {
  name: 'app',

  components: {
    Navbar,
  },
  data() {
    return {
      store

  };
},


};
</script>
