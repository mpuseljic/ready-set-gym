<template>
  <div class="main" :style="{ 'background-color': 'black', height: '100%' }">
    <div class="header" :style="{ 'padding-left': '15px' }">
      <v-btn to="/" color="black" :style="{ width: '30px' }">
        <v-icon x-large color="white"> mdi-chevron-left </v-icon>
      </v-btn>
    </div>
    <h2 :style="{ color: 'white', 'text-align': 'center' }">
      Create your account
    </h2>
    <div class="input-signup">
      <h3 :style="{ color: 'white' }">First name</h3>
      <input type="first-name" v-model="userName" class="input-field" />
      <h3 :style="{ color: 'white' }">Last name</h3>
      <input type="last-name" v-model="surname" class="input-field" />
      <h3 :style="{ color: 'white' }">E-mail</h3>
      <input type="email" v-model="email" class="input-field" />
      <h3 :style="{ color: 'white' }">Password</h3>
      <input type="password" v-model="password" class="input-field" />

      <div class="submit">
        <v-btn
          type="button"
          @click="signUp"
          color="green"
          :style="btnstyleGreen"
          :disabled="isDisabled"
          :loading="loading"
        >
          Create account
        </v-btn>
      </div>
      <div>
        <span class="passError" v-if="passError"
          >Lozinka mora imati 6 znakova!</span
        >
        <span class="passError" v-if="emailError">E-mail nije ispravan!</span>
        <span class="passError" v-if="emailExists"
          >Račun sa E-mail adresom već postoji!</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { firebase, db } from "@/firebase";

export default {
  name: "Signup",
  data() {
    //funkcija
    return {
      btnstyleGreen: {
        borderRadius: "20px",
        width: "300px",
        marginTop: "10px",
      },
      userName: "",
      surname: "",
      email: "",
      password: "",
      loading: false,
      passError: false,
      emailError: false,
      emailExists: false,
    };
  },

  methods: {
    signUp(email, password, name, surname) {
      this.emailError = false;
      this.passError = false;
      email = this.email;
      password = this.password;
      name = this.userName;
      surname = this.surname;
      this.loading = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          if (user) {
            // User created successfully
            const userDocRef = db.collection("users").doc(user.uid);

            // Add user details to the "users" collection
            userDocRef
              .set({
                ime: name,
                prezime: surname,
                email: email,
              })
              .then(() => {
                console.log("User added to collection successfully");
              })

              .catch((error) => {
                console.error("Error adding user to collection:", error);
              });
          } else {
            console.error("User object is undefined");
          }
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            console.error("Invalid email:", error.message);
            this.emailError = true;
            this.loading = false;
            this.email = "";
          } else if (error.code === "auth/weak-password") {
            console.error("Weak password:", error.message);
            this.passError = true;
            this.loading = false;
            this.password = "";
          } else if (error.code === "auth/email-already-in-use") {
            this.emailExists = true;
            this.loading = false;
            this.email = "";
          } else {
            console.error("Sign-up error:", error);
          }
        });
    },
  },

  computed: {
    isDisabled() {
      return !(this.userName && this.surname && this.email && this.password);
    },
  },
};
</script>
<style>
.input-signup {
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
.passError {
  color: red;
}
</style>