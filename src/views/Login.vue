<template>
  <div :style="myStyle" id="wrapper">


    <h2 id="naslov">READYSET<span class="gym">GYM</span></h2>
    <p id="text">
      Become stronger with our workout plans
    </p>
    <v-btn id="btn" color="#D29433" width="300px">Get started</v-btn>
    <v-btn id="btn" width="300px">Login</v-btn>

  </div>
</template>
<script>
export default {
  name: 'Login',
  data(){
    return{
      myStyle:{
        backgroundImage: `url(${require('@/assets/login.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '88vh',
      }
    }
  },
}
</script>
<style>
#wrapper {
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
}
#btn {
  margin: 8px;
}

#text{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  color: white;
  padding-bottom: 5px;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  font-weight: bold;
  
}

#naslov{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  color: white;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  white-space: nowrap;

}

.gym{
  color:#D29433;
  font-weight: bold;
  white-space: nowrap;
}
</style>