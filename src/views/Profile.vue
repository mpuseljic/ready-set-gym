<template>
  <div class="main" :style="{'background-color':'black', 'height':'100%'}">
    <div class="header">
      <h1>My profile</h1>
      <v-btn
      elevation="0"
      color="black"
      :style="{'padding-top':'15px'}"
      >
        <v-icon 
        color="red"
        x-large
        >mdi-power</v-icon>
      </v-btn>
    </div>
    <div class="icon-name">
      <v-icon
      color="white"
      size="200"
      >
      mdi-account-circle-outline</v-icon>
      <h1 class="name">Mirna Luka</h1>
    </div>
    <div class="header">
      <h1 :style="{'color':'#D29433'}">My workouts</h1>
    </div>
  </div>
  </template>
<style>
.header {
  padding: 0 37px 0 37px;
  color: white;
  display: flex;
  justify-content: space-between;
}
.icon-name {
  margin-top: 20px;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.name {
  color: white;
}
</style>