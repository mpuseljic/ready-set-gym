<template>
    <v-bottom-navigation
      :value="value" app
      color="#D29433"
      grow
      dark
    >
      <v-btn>
        <span>Home</span>
  
        <v-icon>mdi-home</v-icon>
      </v-btn>
  
      <v-btn>
        <span>BMI</span>
  
        <v-icon>mdi-chart-box</v-icon>
      </v-btn>
  
      <v-btn>
        <span>Diary</span>
  
        <v-icon>mdi-application-edit-outline</v-icon>
      </v-btn>
      <v-btn>
        <span>Profile</span>
  
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </template>

<script>
  export default {
    data: () => ({ value: 1 }),
  }
</script>