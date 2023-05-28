<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <v-btn href="/" text>
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
      <router-view />
    </v-main>
    <navbar v-if="store.currentUser" />
  </v-app>
</template>

<script>
import store from "@/store";
import Navbar from "@/components/Navbar.vue";
import { firebase } from "@/firebase";
import router from "@/router";



export default {
  name: "app",

  components: {
    Navbar,
  },
  data() {
    return {
      store,
    };
  },
};
</script>
