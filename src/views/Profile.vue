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
            <div class="cards">
              <v-card
    class="mx-auto"
    max-width="344"
    dark
  >
    <v-img
      src="@/assets/upperbody.jpg"
      height="200px"
    ></v-img>

    <v-card-title class="naslov">
      Upper Body Attack 
    </v-card-title>

    <v-card-subtitle>
      READY SET <span class="go">GO</span>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        text
        color="#D29433"
      >
        START WORKOUT
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text class="show">
          Time to get the arms, shoulders and chest into it! You will need some dumbbells to get this one done.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
  <v-card
    class="mx-auto"
    max-width="344"
    dark
  >
    <v-img
      src="@/assets/lowerbody.jpg"
      height="200px"
    ></v-img>

    <v-card-title class="naslov">
      Lower Body Attack 
    </v-card-title>

    <v-card-subtitle>
      READY SET <span class="go">GO</span>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        text
        color="#D29433"
      >
        START WORKOUT
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text class="show">
          Use these timeless leg exercises to gain mass and strength on your lower body. A varied combination of reps and sets will help to keep your routine fresh.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
  </div>
  <div class="header">
      <h1 :style="{'color':'#D29433'}">My calendar</h1>
      </div>
      <div>
    <v-sheet
      tile
      height="50"
      width="500"
      class="d-flex"
      dark
    >
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
        v-model="type"
        :items="types"
        dense
        outlined
        hide-details
        class="ma-2"
        label="type"
      ></v-select>
      <v-select
        v-model="mode"
        :items="modes"
        dense
        outlined
        hide-details
        label="event-overlap-mode"
        class="ma-2"
      ></v-select>
      <v-select
        v-model="weekday"
        :items="weekdays"
        dense
        outlined
        hide-details
        label="weekdays"
        class="ma-2"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <div class="calendar">
    <v-sheet height="500" width="500" dark>
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
      ></v-calendar>
    </v-sheet>
  </div>
  </div>
  </div>
  </template>

<script>
  export default {
    data: () => ({
      show: false,
      type: 'month',
      types: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      modes: ['stack', 'column'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
      ],
      value: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    methods: {
      getEvents ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            timed: !allDay,
          })
        }

        this.events = events
      },
      getEventColor (event) {
        return event.color
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>


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

.show{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.name{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.cards{
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
}
.mx-auto {
  margin: 20px;
  font-weight: bold;
}

.go{
  color: #D29433;
  
}

.d-flex{
  margin:auto;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.calendar{
  margin: auto;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;


}
</style>