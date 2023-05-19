<template>
    <div class="main" :style="{'background-color':'black', 'height':'100%'}">
    <div class="header" :style="{'padding-left':'15px'}">
        <v-btn color="black" :style="{'width':'30px'}">
            <v-icon
            x-large
            color="white"
            >
                mdi-chevron-left
            </v-icon>
        </v-btn>
    </div>
    <h2 :style="{'color':'white','text-align':'center'}">Create your account</h2>
    <div class="input-signup">
        <h3 :style="{'color':'white'}">First name</h3>
        <input 
        type="first-name" 
        v-model="name"
        class="input-field">
        <h3 :style="{'color':'white'}">Last name</h3>
        <input 
        type="last-name" 
        v-model="surname"
        class="input-field">
        <h3 :style="{'color':'white'}">E-mail</h3>
        <input 
        type="email" 
        v-model="username"
        class="input-field">
        <h3 :style="{'color':'white'}">Password</h3>
        <input 
        type="password" 
        v-model="password"
        class="input-field">

        <div class="submit">
        <v-btn 
        type="button"
        @click="signup"
        color="green"
        :style="btnstyleGreen"
        :disabled="isDisabled"
        >
            Create account
        </v-btn>
        </div>
    </div>
    </div>    
</template>

<script>
import { firebase } from "@/firebase"

export default {
  name: 'Signup',
  data(){ //funkcija
    return{
      btnstyleGreen:{
        borderRadius: '20px',
        width: '300px',
        marginTop: '10px'
      },
      name:"",
      surname:"",
      username:"",
      password:""

    }
  },
  methods: { //objekt
    signup(){

        if(this.password.length < 6){
            alert("Passsword nust be at least 6 characters long!");
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
        .then(() => {
                console.log("Uspješna registracija");
                this.$router.replace({name:"home"});
            }).catch(function(error){
                console.error("Došlo je do greške", error);
            })
        console.log("Nastavak");
    }
  },
  computed: {
    isDisabled(){
        return !(this.name && this.surname && this.username && this.password);
    }
  }

}

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
    background-color: #D29433;
    width: 300px;
    min-width: 100px;
    padding: 8px 16px 8px 16px;
    border-radius: 20px;
    text-align: center;
    margin: 10px;
}
.submit{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
}

</style>