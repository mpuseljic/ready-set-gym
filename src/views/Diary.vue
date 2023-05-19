<template>
  <div class="main" :style="{'background-color':'black', 'height':'100%'}">
    <div class="header" :style="{'padding-left':'15px'}">
      <v-btn color="black" :style="{'width':'30px'}">
        <v-icon x-large color="white">
          mdi-chevron-left
        </v-icon>
      </v-btn>
    </div>
    <div class="header">
      <h1 :style="{'color':'#D29433'}">My diary</h1>
    </div>
    <v-row justify="center">
      <v-date-picker
        color="#D29433"
        v-model="date"
        class="mt-4"
        min="2020-06-15"
        max="2024-03-20"
      ></v-date-picker>
    </v-row>
    <v-container class="text-center">
      <v-textarea
        v-model="content"
        background-color="#D29433"
        color="orange orange-darken-4"
        label="Write something..."
      ></v-textarea>
      <v-btn
        rounded
        color="red"
        dark
        @click="deleteContent"
      >
        DELETE
      </v-btn>
      <v-btn
        rounded
        color="green"
        dark
        @click="saveContent"
      >
        SAVE
      </v-btn>

    </v-container>

  </div>
</template>

<script>


export default {
  components:{
   
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      content: ''
    };
  },
  methods: {
    deleteContent() {
      this.content = '';
    },
    saveContent(){
      this.content='';
    }
  }
};
</script>
