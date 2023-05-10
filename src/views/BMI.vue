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
  <div class="bmi">
    <v-container>
    <v-row>
      <v-col cols="6">
        <v-text-field
          color="white"
          class="height"
          v-model="height"
          label="Height (cm)"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          class="weight"
          color="white"
          v-model="weight"
          label="Weight (kg)"
          type="number"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn class="btn" color="green" @click="calculateBMI">Calculate</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="bmi !== null">
      <v-col>
        <h2 class="result">Your BMI: {{ bmi }}</h2>
      </v-col>
    </v-row>
  </v-container>
  </div>
</div>
</template>

<script>
export default {
  name: 'BMICalculator',
  data() {
    return {
      height: null,
      weight: null,
      bmi: null,
    };
  },
  methods: {
    calculateBMI() {
      if (this.height && this.weight) {
        const heightInMeters = this.height / 100;
        this.bmi = (this.weight / (heightInMeters * heightInMeters)).toFixed(2);
      } else {
        this.bmi = null;
      }
    },
  },
};
</script>

<style>

.bmi{
  margin: auto;
  display: flex;
}

.height{
  background-color: #D29433;
    width: 300px;
    min-width: 100px;
    padding: 20px;
    border-radius: 20px;
    text-align: center;
    margin: 5px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size:medium;
}

.weight{
  background-color: #D29433;
    width: 300px;
    min-width: 100px;
    padding: 20px;
    border-radius: 20px;
    text-align: center;
    margin: 5px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: medium;

}

.result{
  color: white;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.btn{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  padding: 10px;
}
</style>