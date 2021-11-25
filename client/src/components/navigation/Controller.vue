<template>
  <div v-if="!onLanding && !completed">
    <v-footer dark id="survey-app-footer">
      <v-snackbar
        color="#770000"
        top
        v-model="validate"
      >
        Please fill in all required fields
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="validate = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <!-- Success Alert -->
      <v-snackbar
        color="#770000"
        top
        v-model="success"
      >
        The form was successfully submitted.
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="success = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <!-- Failed alert -->
      <v-snackbar
        color="#770000"
        top
        v-model="failed"
      >
        The survey has not been submitted.
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="failed = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <v-btn
        v-if="page > 1"
        x-large
        rounded
        @click="handleStepBack"
        color="#770000"
      >
        <v-icon left id="circle-left"> mdi-arrow-left </v-icon>
        Previous
      </v-btn>
      <v-btn
        x-large
        v-if="page <= 1"
        rounded
        @click.prevent="exitSurvey"
        color="#770000"
      >
        <!-- <a href="/" id="exit-btn"> -->
        <v-icon size="22" left>mdi-page-previous-outline</v-icon>EXIT
        <!-- </a> -->
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="page < 17"
        x-large
        right
        rounded
        @click.prevent="handleStepForward"
        color="#770000"
      >
        Proceed
        <v-icon right id="circle-right">mdi-arrow-right</v-icon>
      </v-btn>
      <!-- The original way it was -->
      <!-- v-if="step >= 17" -->
      <v-btn
        small
        v-if="page >= 17"
        rounded
        @click.prevent="handleSubmit"
        x-large
        color="#770000"
        right
      >
      <!-- Need to add validation for page 17 before submitting -->
        Submit
        <v-icon right id="circle-left" class="submit-icon">mdi-send</v-icon>
      </v-btn>
    </v-footer>
    <!-- Overlay when loading -->
    <v-row justify="center" style="position: absolute">
      <v-overlay :z-index="0" :value="overlay">
        <v-progress-circular
          :size="75"
          color="#770000"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
    </v-row>
  </div>
</template>

<script>
import { addSurvey } from '../../store/api/survey';

export default {
  props: ['onLanding', 'handleCollectAnswers', 'all_sites'],
  data() {
    return {
      validate: false,
      success: false,
      failed: false,
      completed: undefined,
      overlay: false
    }
  },
  computed: {
    page() {
      return this.$store.state.page
    },
    validation_fail: {
      get() {
        return this.$store.state.validation_fail;
      }, 
      set(value) {
        this.$store.commit('VALIDATION_TOGGLE', value);
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
    slide01: {
        get() {
          return this.$store.state.slide01.questions;
        },
        set(value) {
          this.$store.slide01.commit('UPDATE_QUESTIONS', value);
        }
      },
      slide03: {
        get() {
          return this.$store.state.slide03.questions;
        },
        set(value) {
          this.$store.slide03.commit('UPDATE_QUESTIONS', value);
        }
      },
      slide04: {
        get() {
          return this.$store.state.slide04.questions;
        },
        set(value) {
          this.$store.slide04.commit('UPDATE_QUESTIONS', value);
        }
      },
      slide05: {
        get() {
          return this.$store.state.slide05.questions;
        },
        set(value) {
          this.$store.slide05.commit('UPDATE_QUESTIONS', value);
        }
      },
      slide06: {
        get() {
          return this.$store.state.slide06.questions;
        },
        set(value) {
          this.$store.slide06.commit('UPDATE_QUESTIONS', value);
        }
      },
      slide07: {
        get() {
          return this.$store.state.slide07.questions;
        },
        set(value) {
          this.$store.slide07.commit('UPDATE_QUESTIONS', value);
        }
      },
      slide08: {
        get() {
          return this.$store.state.slide08.questions;
        },
        set(value) {
          this.$store.slide08.commit('UPDATE_QUESTIONS', value);
        }
      },
      slide09: {
        get() {
          return this.$store.state.slide09.questions;
        },
        set(value) {
          this.$store.slide09.commit('UPDATE_QUESTIONS', value);
        }
      },
      slide10: {
        get() {
          return this.$store.state.slide10.questions;
        },
        set(value) {
          this.$store.slide10.commit('UPDATE_QUESTIONS', value);
        }
      },
      slide11: {
        get() {
          return this.$store.state.slide11.questions;
        },
        set(value) {
          this.$store.slide11.commit('UPDATE_QUESTIONS', value);
        }
      },
      slide12: {
        get() {
          return this.$store.state.slide12.questions;
        },
        set(value) {
          this.$store.slide12.commit('UPDATE_QUESTIONS', value);
        }
      },
      slide13: {
        get() {
          return this.$store.state.slide13.questions;
        },
        set(value) {
          this.$store.slide13.commit('UPDATE_QUESTIONS', value);
        }
      },
      slide14: {
        get() {
          return this.$store.state.slide14.questions;
        },
        set(value) {
          this.$store.slide14.commit('UPDATE_QUESTIONS', value);
        }
      },
      slide15: {
        get() {
          return this.$store.state.slide15.questions;
        },
        set(value) {
          this.$store.slide15.commit('UPDATE_QUESTIONS', value);
        }
      },
      slide16: {
        get() {
          return this.$store.state.slide16.questions;
        },
        set(value) {
          this.$store.slide16.commit('UPDATE_QUESTIONS', value);
        }
      },
      slide17: {
        get() {
          return this.$store.state.slide17.questions;
        },
        set(value) {
          this.$store.slide17.commit('UPDATE_QUESTIONS', value);
        }
      },
  },
  created() {
    let _completed = localStorage.getItem('completed');
    if (_completed  === true) {
      this.completed = _completed;
    } else {
      localStorage.setItem('completed', false);
    }
  },
  updated() {
    let _completed = localStorage.getItem('completed');
    if (_completed === true) {
      this.completed = _completed;
    } else {
      localStorage.setItem('completed', false);
    }
  },
  methods: {
    async exitSurvey() {
      localStorage.setItem('completed', false);
      location.reload();
      localStorage.removeItem('draft');
    },
    handleStepBack() {
      if (this.page == 16 && this.slide14[12].selected == 'N/A') {
        this.$store.commit("DECREMENT");
        this.$store.commit("DECREMENT");
        this.$store.commit("PREVIOUS");
        this.$store.commit("PREVIOUS");
      } else {
        this.$store.commit("DECREMENT");
        this.$store.commit("PREVIOUS");
        if (this.page > 1) {
          this.step -= 1;
        } else {
          this.step = 0;
        }
      }
      this.validation_fail = false
    },
    handleStepForward() {
      if (this.page == 14 && this.slide14[12].selected == 'N/A') {
         if (!this.validation_fail){
          this.$store.commit("INCREMENT");
          this.$store.commit("PROCEED");
         } else {
          this.validate = true
         }
      } 
      if (!this.validation_fail){
        this.$store.commit("INCREMENT");
        this.$store.commit("PROCEED");
        this.step += 1;
      } else {
        this.validate = true
      }
    },
    handleSubmit() {
      if (this.validation_fail === false){
        this.overlay = true;
        this.handleCollectAnswers();
        if (navigator.onLine) {
          if (this.answers.mobile != 'N/A'){
            this.answers.mobile = '+27'+ this.answers.mobile;
          }
          // Makes Request (Should add survey)
          addSurvey(this.answers).then(res => {
            if (res.msg == "Survey added!, reused client code" || res.msg == "Survey added!" || res.msg == "Survey added!, community count updated") {
              this.success = true
              localStorage.setItem('completed', true);
              location.reload();
              localStorage.removeItem('draft');
              this.overlay = false;
            } else {
              this.failed = true;
              this.overlay = false;
            }
          });
        } else {
          // Pushing object to queue Object
          let surveyAnswers = this.answers;
          let localAnswers = JSON.parse(localStorage.getItem('queue'));

          if (!localAnswers) {
            localStorage.setItem('queue', JSON.stringify([surveyAnswers]));
          } else {
            localStorage.setItem('queue', JSON.stringify([...localAnswers, surveyAnswers]));
          }

          localStorage.setItem('completed', true);
          location.reload();
          localStorage.removeItem('draft');
        }
      } else {
        this.validate = true
      }
    },
  },
}
</script>

<style scoped>

</style>