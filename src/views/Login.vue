<template>
    <div class="main" :style="{'background-color':'black', 'height':'100%'}">
    <div class="header" :style="{'padding-left':'15px'}">
        <v-btn to="/" color="black" :style="{'width':'30px' }">
            <v-icon
            x-large
            color="white"
            >
                mdi-chevron-left
            </v-icon>
        </v-btn>
    </div>
    <h2 :style="{'color':'white','text-align':'center'}">Log in to your account</h2>
    <div class="input-login">
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
        color="green"
        :style="btnstyleGreen"
        @click="login()"
        >
        
            Login
        </v-btn>
        <v-btn 
        color="gray"
        :style="btnstyleGray"
        >
            Cancel
        </v-btn>
        </div>
    </div>
    </div>    
</template>

<script>
import { firebase } from '@/firebase';

export default {
  name: 'Login',
  data(){
    return{
      btnstyleGreen:{
        borderRadius: '20px',
        width: '300px',
      },
      btnstyleGray:{
        borderRadius: '20px',
        width: '300px',
        marginTop: '10px'
      },
      username:"",
      password:""
    }
  },
  methods:{
    login(){
      console.log("login..." + this.username);

      firebase.auth().signInWithEmailAndPassword(this.username, this.password)
      .then((result) => {
        console.log("Uspješna prijava", result)
        
      }).catch(function(e){
        console.error("Greška", e)
      })
      
    }
  }
}
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