<template>
  <div
    class="main"
    :style="{ 'background-color': 'black', height: '100%', margin: '0' }"
  >
    <div class="header" :style="{ 'padding-left': '15px' }">
      <v-btn color="black" :style="{ width: '30px' }"> </v-btn>
    </div>
    <div class="gender">
      <v-btn @click="maleChoose" :color="maleBtn" :style="BtnStyle">
        <v-icon size="50">mdi-gender-male</v-icon>
      </v-btn>
      <v-btn @click="femaleChoose" :color="femaleBtn" :style="BtnStyle">
        <v-icon size="50">mdi-gender-female</v-icon>
      </v-btn>
    </div>
    <div class="bmi">
      <div class="input">
        <v-text-field
          color="white"
          class="height"
          v-model="height"
          label="Height (cm)"
          type="number"
        ></v-text-field>

        <v-text-field
          class="weight"
          color="white"
          v-model="weight"
          label="Weight (kg)"
          type="number"
        ></v-text-field>
      </div>

      <v-btn class="btn" color="green" @click="calculateBMI">Calculate</v-btn>

      <div v-if="bmi != null">
        <h2 class="result">Your BMI: {{ bmi }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BMICalculator",
  components: {},
  data() {
    return {
      height: null,
      weight: null,
      bmi: null,
      male: false,
      female: false,
      femaleBtn: "gray",
      maleBtn: "gray",
      BtnStyle: {
        height: "100px",
        width: "100px",
        margin: "10px 43px 10px 43px",
        borderRadius: "20px",
        backgroundColor: "#D29433",
      },
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
    maleChoose() {
      if (this.male == false) {
        this.male = true;
        this.maleBtn = "cyan";
      } else {
        this.male = false;
        this.maleBtn = "gray";
      }
    },
    femaleChoose() {
      if (this.female == false) {
        this.female = true;
        this.femaleBtn = "pink";
      } else {
        this.female = false;
        this.femaleBtn = "gray";
      }
    },
  },
};
</script>

<style>
.gender {
  text-align: center;
}
.bmi {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input {
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.height {
  background-color: #d29433;
  /* width: 150px; */
  max-width: 300px;
  padding: 20px;
  border-radius: 20px;
  text-align: center;
  margin: 5px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: medium;
}

.weight {
  background-color: #d29433;
  /* width: 150px; */
  max-width: 300px;
  padding: 20px;
  border-radius: 20px;
  text-align: center;
  margin: 5px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: medium;
}

.result {
  color: white;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.btn {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  padding: 10px;
  margin: 20px;
}
</style>