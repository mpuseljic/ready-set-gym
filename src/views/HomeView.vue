<template>
  <div :style="myStyle" id="wrapper">
    <v-btn id="btn" color="#D29433" width="300px">Get started</v-btn>
    <v-btn id="btn" width="300px">Login</v-btn>
  </div>
</template>
<script>
export default {
  name: 'Home',
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
h1 {
  color:brown;
}
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
</style>