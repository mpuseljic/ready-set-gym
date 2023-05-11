<template>
<div class="main" :style="{'background-color':'black', 'height':'100%'}">
    <div class="header" :style="{'padding-left':'15px'}">
    </div>
    <div class="header">
      <h1 :style="{'color':'#D29433'}">Let's crush it!</h1>
    </div>
    <v-autocomplete
    :style="{ backgroundColor: 'gray' }"
    auto-select-first
    chips
    clearable
    deletable-chips
    dense
    multiple
    rounded
    small-chips
></v-autocomplete>

</div>

</template>

<style>


</style>
