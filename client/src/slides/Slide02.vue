<template>
  <v-stepper-content step="2">
    <v-form v-if="page == 2" ref="form">
      <label>{{ questions[1].label }}:<span class="required">*</span></label>
      <Time :fields="questions[1]"  :time="momentTimeIn" :intersect="intersect" :editDate="true" />

      <label>{{ questions[2].label }}:<span class="required">*</span></label>
      <Radio
        :fields="questions[2]"
        :intersect="intersect"
      />
        <div class="age-check">
        <label>{{ questions[3].label }}:<span class="required">*</span></label>
          <Calender
            :fields="questions[3]"
            :intersect="intersect"
            :setting="'past'"
          />
          <h6 class="required too_young" v-if="checkage() < 14">
            Client too young. End session.
          </h6>
        </div>
      <div v-if="checkage() >= 14">
        <v-col
          cols="12"
          xs="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
        >
        <label>{{ questions[4].label }}:<span class="required">*</span></label>
        <Select :fields="questions[4]" :intersect="intersect" />
      </v-col>
      </div>
    </v-form>
  </v-stepper-content>
</template>

<script>
import moment from 'moment';
import Calender from '../components/inputs/Date';
import Select from '../components/inputs/Select';
import Radio from '../components/inputs/Radio';
import Time from '../components/inputs/Time';

export default {
  components: {
    Calender,
    Select,
    Radio,
    Time
  },
  data() {
    return {
      valid: true,
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    checkage() {
      var difference = new Date() - new Date(this.questions[3].date);
      var age = Math.floor(difference / 31557600000);
      this.questions[6].text = age;
      return age;
    },
    intersect() {
      this.$forceUpdate();
    },
  },
  created() {
    // Checking Validation
    if (this.page == 2) {
      if (this.timeIn 
      && this.questions[2].selected 
      && this.questions[3].date 
      && this.questions[4].selected) {
        this.validation_fail = false;
      } else {
        this.validation_fail = true;
      }
    }
  },
  updated() {
    // Checking Validation
    if (this.page == 2) {
      if (this.timeIn  
      && this.questions[2].selected 
      && this.questions[3].date 
      && this.questions[4].selected) {
        this.validation_fail = false;
      } else {
        this.validation_fail = true;
      }
    } 
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
    timeIn: {
      get() {
        return this.$store.state.timeIn
      },
       set(value) {
        this.$store.commit('UPDATE_TIMEIN', value)
      }
    },
    momentTimeIn() {
      return moment(this.timeIn).format('lll');
    },
    questions: {
      get() {
        return this.$store.state.slide02.questions;
      },
      set(value) {
        this.$store.slide02.commit('UPDATE_QUESTIONS', value);
      }
    },
    answers: {
        get() {
          return this.$store.state.answers
        },
        set(value) {
          this.$store.commit('UPDATE_ANSWERS', value)
        }
      },
  }
}
</script>

<style scoped>

.too_young {
  margin-top: -38px;
}

</style>