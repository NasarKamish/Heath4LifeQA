<template>
<v-stepper-content step="3">
  <v-form v-if="page == 3" ref="form" v-model="valid"> 
    <label>{{ questions[0].label }}:<span class="required">*</span></label>
    <Radio :fields="questions[0]" :intersect="intersect" />
    <v-col
      cols="12"
      xs="12"
      sm="12"
      md="6"
      lg="6"
      xl="6"
    >
      <label>{{ questions[1].label }}:</label>
      <Txt :prepends="'+27'" :type="'number'" :intersect="intersect" :fields="questions[1]" :rule="numberRule" />
    </v-col>

    <label>{{ questions[2].label }}:<span class="required">*</span></label>
    <Radio :fields="questions[2]" :intersect="intersect" />
    <v-col
      cols="12"
      xs="12"
      sm="12"
      md="6"
      lg="6"
      xl="6"
    > 
      <label>{{ questions[3].label }}:<span class="required">*</span></label>
      <Select :fields="questions[3]" />
    </v-col>
  </v-form>
</v-stepper-content>
</template>

<script>
import Radio from '../components/inputs/Radio';
import Txt from '../components/inputs/Text';
import Select from '../components/inputs/Select';

import { getPublicAreas } from '../store/api/areas';

export default {
  components: {
    Radio,
    Txt,
    Select
  },
  data() {
    return {
      numberRule: [
         v => (v && v.length ==  9) || "Must be 9 digits"
      ],
      valid : true
    }
  },
  created() {
    if (this.page == 3) {
      if (this.questions[0].selected 
        && this.questions[2].selected
        && this.questions[3].selected
      ) {
        this.validation_fail = false;
      } else {
        this.validation_fail = true;
      }
      if (this.questions[1].text != undefined){
        if (this.questions[1].text.length > 0 && this.valid){
          if (!this.validation_fail) {
            this.validation_fail = false;
          }
        } else {
          this.validation_fail = true;
        }
      }
    }
    this.handleGetAreas();
  },
  updated() {
    // Checking Validation
    if (this.page == 3) {
      if (this.questions[0].selected 
        && this.questions[2].selected
        && this.questions[3].selected
      ) {
        this.validation_fail = false;
      } else {
        this.validation_fail = true;
      }
      if (this.questions[1].text != undefined){
        if (this.questions[1].text.length > 0 && this.valid){
          if (!this.validation_fail) {
            this.validation_fail = false;
          }
        } else {
          this.validation_fail = true;
        }
        if (this.questions[1].text.length === 0) {
           this.validation_fail = false;
        }
      }
    }
  },
  methods: {
    intersect() {
      this.$forceUpdate();
    },
    validate() {
      this.$refs.form.validate();
    },
    handleGetAreas() {
      if(navigator.onLine) {
        getPublicAreas().then(data => {
          let areas = [];
          for (let i = 0; i < data.length; i++) {
            areas.push(data[i].area);
          }
          this.questions[3].answers = areas;
          localStorage.setItem('areas', JSON.stringify(areas));
        });
      } else {
        let areas = JSON.parse(localStorage.getItem('areas'));
        this.questions[3].answers = areas;
      }
    },
  },
  computed: {
    page() {
      return this.$store.state.page;
    },
    validation_fail: {
      get() {
        return this.$store.state.validation_fail;
      }, 
      set(value) {
        this.$store.commit('VALIDATION_TOGGLE', value);
      }
    },
    questions: {
      get() {
        return this.$store.state.slide03.questions;
      },
      set(value) {
        this.$store.slide03.commit('UPDATE_QUESTIONS', value);
      }
    }
  }
}

</script>

<style scoped>

</style>