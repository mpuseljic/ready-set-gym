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

firebase.auth().onAuthStateChanged((user) => {
  const currentRoute = router.currentRoute;

  if (user) {
    console.log("User " + user.email);
    store.currentUser = user.email;

    if (!currentRoute.meta.needsUser) {
      router.push({ name: "home" });
    }
  } else {
    console.log("No user");
    store.currentUser = null;

    if (currentRoute.meta.needsUser) {
      router.push({ name: "login" });
    }
  }
});

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
