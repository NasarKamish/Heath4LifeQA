<template>
  <v-stepper-content step="6">
    <!-- Addding an svg and mocing text to center for explaination on HIV and TB-->
    <div class="image-container">
      <v-img :src="require('../assets/lung.svg')" />
    </div>
    <div>
      <h2 class="explaination-text">
        Give client basic information on HIV and TB
      </h2>
    </div>
  </v-stepper-content>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>

</style>