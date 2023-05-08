<template>
<div :style="myStyle" id="wrapper">
  <h1>LOL</h1> 
</div>
 
</template>

<script>

  export default {
    name: 'Home',
    data(){
      return{
        myStyle:{
          backgroundColor: "#000000",
          height: "100%",
        }
      }
    },
    components: {

    },
  }
</script>
<style>
h1 {
  color:brown;
}
template {
  color: black;
}
</style>