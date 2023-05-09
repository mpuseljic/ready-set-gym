<template>
  <div :style="myStyle" id="wrapper">

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