<template>
  <div class="main" :style="{ 'background-color': 'black', height: '100%' }">
    <div class="header" :style="{ 'padding-left': '15px' }">
      <v-btn to="/" color="black" :style="{ width: '30px' }">
        <v-icon x-large color="white"> mdi-chevron-left </v-icon>
      </v-btn>
    </div>
    <h2 :style="{ color: 'white', 'text-align': 'center' }">
      Log in to your account
    </h2>
    <div class="input-login">
      <h3 :style="{ color: 'white' }">E-mail</h3>
      <input type="email" v-model="username" class="input-field" />
      <h3 :style="{ color: 'white' }">Password</h3>
      <input type="password" v-model="password" class="input-field" />
      <div class="submit">
        <v-btn
          type="button"
          color="green"
          :style="btnstyleGreen"
          @click="login()"
          :loading="loading"
        >
          Login
        </v-btn>
        <v-btn color="gray" :style="btnstyleGray"> Cancel </v-btn>
      </div>
      <div>
        <span class="userError" v-if="userError">User not found!</span>
        <span class="userError" v-if="passError">Invalid password!</span>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "@/firebase";

export default {
  name: "Login",
  data() {
    return {
      btnstyleGreen: {
        borderRadius: "20px",
        width: "300px",
      },
      btnstyleGray: {
        borderRadius: "20px",
        width: "300px",
        marginTop: "10px",
      },
      username: "",
      password: "",
      loading: false,
      userError: false,
      passError: false,
    };
  },
  methods: {
    login() {
      this.userError = false;
      this.passError = false;
      this.loading = true;
      console.log("login..." + this.username);

      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then((result) => {
          console.log("Uspješna prijava", result);
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            console.error("User not found:", error.message);
            this.userError = true;
            this.loading = false;
            this.username = "";
          } else if (error.code === "auth/wrong-password") {
            console.error("Wrong password:", error.message);
            this.passError = true;
            this.loading = false;
            this.password = "";
          } else {
            console.error("Sign-up error:", error);
          }
        });
    },
  },
};
</script>
<style>
.input-login {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.input-field {
  background-color: #d29433;
  width: 300px;
  min-width: 100px;
  padding: 8px 16px 8px 16px;
  border-radius: 20px;
  text-align: center;
  margin: 10px;
}
.submit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.userError {
  color: red;
}
</style>