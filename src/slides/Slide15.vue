<template>
  <v-stepper-content step="15">
    <v-form v-if="page == 15" ref="form" v-model="valid"> 
      <div v-if="ref_questions[12].selected == 'Negative'">
        <label>{{ questions[0].label }}:<span class="required">*</span></label>
         <v-col
          xs="12"
          sm="9"
          md="6"
          lg="6"
          xl="6"
        >
          <Select :fields="questions[0]" :intersect="intersect" />
         </v-col>
        <div v-if="Number(questions[0].selected) > 0">
            <v-row>
              <v-col
                xs="12"
                sm="6"
                md="4"
                lg="4"
                xl="4"
              >
                <label>{{ questions[2].label }}<span class="required">*</span></label>
                <Select :intersect="intersect" :fields="questions[2]" />
              </v-col>
              <v-col
              cols="12"
              x="12"
              sm="6"
              md="4"
              lg="4"
              xl="4"
              >
                <label>{{ questions[3].label }}<span class="required">*</span></label>
                <Select :intersect="intersect" :fields="questions[3]" />
              </v-col>
              <v-col
                xs="12"
                sm="6"
                md="4"
                lg="4"
                xl="4"
              >
                <label>{{ questions[4].label }}:<span class="required">*</span></label>
                <Txt :fields="questions[4]" :rule="textField" :intersect="intersect" />
              </v-col>
            </v-row>
        </div>
        <div v-if="Number(questions[0].selected) > 1">
          <v-row>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              md="4"
              lg="4"
              xl="4"
            >
              <label>{{ questions[7].label }}<span class="required">*</span></label>
              <Select :intersect="intersect" :fields="questions[7]" />
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              md="4"
              lg="4"
              xl="4"
            >
              <label>{{ questions[9].label }}:<span class="required">*</span></label>
              <Select :intersect="intersect" :fields="questions[9]" />
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              md="4"
              lg="4"
              xl="4"
            >
              <label>{{ questions[10].label }}<span class="required">*</span></label>
              <Txt :fields="questions[10]" :rule="textField" :intersect="intersect" />
            </v-col>
          </v-row>
        </div>
        <div v-if="Number(questions[0].selected) > 2">
          <v-row>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              md="4"
              lg="4"
              xl="4"
            >
              <label>{{ questions[8].label }}<span class="required">*</span></label>
              <Select :intersect="intersect" :fields="questions[8]" />
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              md="4"
              lg="4"
              xl="4"
            >
              <label>{{ questions[11].label }}<span class="required">*</span></label>
              <Select :intersect="intersect" :fields="questions[11]" />
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              md="4"
              lg="4"
              xl="4"
            >
              <label>{{ questions[12].label }}<span class="required">*</span></label>
              <Txt :fields="questions[12]" :intersect="intersect" />
            </v-col>
          </v-row>
        </div>
        <div v-if="questions[0].selected == '0'">
        <v-col
          cols="12"
          xs="12"
          sm="9"
          md="6"
          lg="6"
          xl="6"
        >
          <label>{{ questions[1].label }}:<span class="required">*</span></label>
          <Txt :fields="questions[1]" :rule="textField" :intersect="intersect" />
        </v-col>
        </div>
      </div>
      <div v-if="ref_questions[12].selected == 'Positive'">
        <label>{{ questions[5].label }}:<span class="required">*</span></label>
        <Select :intersect="intersect" :fields="questions[5]" />
        <!--show steps selected-->
        <v-row>
          <v-col
              cols="12"
              xs="12"
              sm="6"
              md="6"
              lg="6"
              xl="6"
            >
            <Txt
              v-if="
                questions[5].selected.includes(
                  'Step 1: Dealing with fears and feelings'
                ) || false
              "
              :fields="questions[6].answers[0]"
              :rule="textField"
              :intersect="intersect"
            />
          </v-col>
          <v-col
              cols="12"
              xs="12"
              sm="6"
              md="6"
              lg="6"
              xl="6"
            >
            <Txt
              v-if="
                questions[5].selected.includes(
                  'Step 2: Go to clinic for tests'
                ) || false
              "
              :fields="questions[6].answers[1]"
              :rule="textField"
              :intersect="intersect"
            />
          </v-col>
          <v-col
              cols="12"
              xs="12"
              sm="9"
              md="6"
              lg="6"
              xl="6"
            >
            <Txt
              v-if="
                questions[5].selected.includes(
                  'Step 3: Disclosure and support'
                ) || false
              "
              :fields="questions[6].answers[2]"
              :rule="textField"
              :intersect="intersect"
            />
          </v-col>
          <v-col
              cols="12"
              xs="12"
              sm="9"
              md="6"
              lg="6"
              xl="6"
            >
            <Txt
              v-if="
                questions[5].selected.includes(
                  'Step 4: Risk reduction'
                ) || false
              "
              :fields="questions[6].answers[3]"
              :rule="textField"
              :intersect="intersect"
            />
          </v-col>
        </v-row>
        <!--enter number of risks-->
        <v-col
          cols="12"
          xs="12"
          sm="9"
          md="6"
          lg="6"
          xl="6"
        >
          <label>{{ questions[0].label }}:<span class="required">*</span></label>
          <Select :intersect="intersect" :fields="questions[0]"  />
        </v-col>
        <!--show risks entered-->
        <div v-if="Number(questions[0].selected) > 0">
          <v-row>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              md="4"
              lg="4"
              xl="4"
            >
              <label>{{ questions[2].label }}<span class="required">*</span></label>
              <Select :intersect="intersect" :fields="questions[2]" />
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              md="4"
              lg="4"
              xl="4"
            >
              <label>{{ questions[3].label }}<span class="required">*</span></label>
              <Select :intersect="intersect" :fields="questions[3]"  />
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              md="4"
              lg="4"
              xl="4"
            >
              <label>{{ questions[4].label }}:<span class="required">*</span></label>
              <Txt :fields="questions[4]" :rule="textField" :intersect="intersect" />
            </v-col>
          </v-row>
        </div>
        <div v-if="Number(questions[0].selected) > 1">
          <v-row>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              md="4"
              lg="4"
              xl="4"
            >
              <label>{{ questions[7].label }}<span class="required">*</span></label>
              <Select :intersect="intersect" :fields="questions[7]" />
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              md="4"
              lg="4"
              xl="4"
            >
              <label>{{ questions[9].label }}:<span class="required">*</span></label>
              <Select :intersect="intersect" :fields="questions[9]" />
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              md="4"
              lg="4"
              xl="4"
            >
              <label>{{ questions[10].label }}<span class="required">*</span></label>
              <Txt :fields="questions[10]" :rule="textField" :intersect="intersect" />
            </v-col>
          </v-row>
        </div>
        <div v-if="Number(questions[0].selected) > 2">
          <v-row>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              md="4"
              lg="4"
              xl="4"
            >
              <label>{{ questions[8].label }}<span class="required">*</span></label>
              <Select :intersect="intersect" :fields="questions[8]" />
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              md="4"
              lg="4"
              xl="4"
            >
              <label>{{ questions[11].label }}<span class="required">*</span></label>
              <Select :intersect="intersect" :fields="questions[11]" />
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              md="4"
              lg="4"
              xl="4"
            >
              <label>{{ questions[12].label }}<span class="required">*</span></label>
              <Txt :fields="questions[12]" :rule="textField" :intersect="intersect" />
            </v-col>
          </v-row>
        </div>
        <!--maintain --->
        <div v-if="questions[0].selected == '0'">
           <v-col
              cols="12"
              xs="12"
              sm="9"
              md="6"
              lg="6"
              xl="6"
            >
            <label>{{ questions[1].label }}:<span class="required">*</span></label>
            <Txt :fields="questions[1]" :rule="textField" :intersect="intersect" />
           </v-col>
        </div>
      </div>
    </v-form>
  </v-stepper-content>
</template>

<script>
// import Radio from '../components/inputs/Radio';
import Txt from '../components/inputs/Text';
import Select from '../components/inputs/Select.vue';

export default {
  components: {
    // Radio,
    Txt,
    Select
  },
  data() {
    return {
      textField: [
         v => /^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/.test(v) || "No special character or blank spaces"
      ],
      valid: true
    }
  },
  methods: {
    intersect() {
      this.$forceUpdate();
    },
    validate() {
      this.$refs.form.validate();
    },
  },
  created () {
    // Checking Validation 
    if (this.page === 15) {
      if (this.questions[0].selected && this.valid) {
        this.validation_fail = false;
      } else {
        this.validation_fail = true;
      }
      if (this.questions[0].selected) {
        if (Number(this.questions[0].selected) === 0) {
          if (this.questions[1].text && this.valid) {
            if (!this.validation_fail){
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }
        }
        if (Number(this.questions[0].selected) === 1) {
          if (this.questions[2].selected
          && this.questions[3].selected
          && this.questions[4].text
          && this.valid) {
            if (!this.validation_fail) {
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }
        }
        if (Number(this.questions[0].selected) === 2) {
          if (this.questions[2].selected
          && this.questions[3].selected
          && this.questions[4].text
          &&  this.questions[7].selected
          && this.questions[9].selected
          && this.questions[10].text
          && this.valid
          ) {
            if (!this.validation_fail) {
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }
        }
        if (Number(this.questions[0].selected) === 3) {
          if (this.questions[2].selected
          && this.questions[3].selected
          && this.questions[4].text
          &&  this.questions[7].selected
          && this.questions[9].selected
          && this.questions[10].text
          && this.questions[8].selected
          && this.questions[11].selected
          && this.questions[12].text
          && this.valid
          ) {
            if (!this.validation_fail) {
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }
        }
      }
      if (this.ref_questions[12].selected == 'Positive') {
        if (this.questions[5].selected.includes('Step 1: Dealing with fears and feelings')){
          if (this.questions[6].answers[0].text && this.valid) {
            if (!this.validation_fail) {
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }
        } 
        if (this.questions[5].selected.includes('Step 2: Go to clinic for tests')) {
          if (this.questions[6].answers[1].text && this.valid) {
              if(!this.validation_fail) {
                this.validation_fail = false;
              }
          } else {
            this.validation_fail = true;
          }
        }
        if (this.questions[5].selected.includes('Step 3: Disclosure and support')) {
            if (this.questions[6].answers[2].text && this.valid) {
            if(!this.validation_fail){
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }
        }
        if (this.questions[5].selected.includes('Step 4: Risk reduction')) {
            if (this.questions[6].answers[3].text && this.valid) {
            if(!this.validation_fail) {
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }
        }
      }
    }
  },
  updated() {
    if (this.questions[0].selected > 0) {
      this.questions[1].text = undefined
    }

    // Checking Validation
    if (this.page === 15) {
      if (this.questions[0].selected && this.valid) {
        this.validation_fail = false;
      } else {
        this.validation_fail = true;
      }
      if (this.questions[0].selected) {
        if (Number(this.questions[0].selected) === 0) {
          if (this.questions[1].text && this.valid) {
            if (!this.validation_fail){
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }
        }
        if (Number(this.questions[0].selected) === 1) {
          if (this.questions[2].selected
          && this.questions[3].selected
          && this.questions[4].text
          && this.valid) {
            if (!this.validation_fail) {
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }
        }
        if (Number(this.questions[0].selected) === 2) {
          if (this.questions[2].selected
          && this.questions[3].selected
          && this.questions[4].text
          &&  this.questions[7].selected
          && this.questions[9].selected
          && this.questions[10].text
          && this.valid
          ) {
            if (!this.validation_fail) {
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }
        }
        if (Number(this.questions[0].selected) === 3) {
          if (this.questions[2].selected
          && this.questions[3].selected
          && this.questions[4].text
          &&  this.questions[7].selected
          && this.questions[9].selected
          && this.questions[10].text
          && this.questions[8].selected
          && this.questions[11].selected
          && this.questions[12].text
          && this.valid
          ) {
            if (!this.validation_fail) {
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }
        }
      }
      if (this.ref_questions[12].selected == 'Positive') {
        if (this.questions[5].selected.includes('Step 1: Dealing with fears and feelings')){
          if (this.questions[6].answers[0].text && this.valid) {
            if (!this.validation_fail) {
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }
        } 
        if (this.questions[5].selected.includes('Step 2: Go to clinic for tests')) {
          if (this.questions[6].answers[1].text && this.valid) {
              if(!this.validation_fail) {
                this.validation_fail = false;
              }
          } else {
            this.validation_fail = true;
          }
        }
        if (this.questions[5].selected.includes('Step 3: Disclosure and support')) {
            if (this.questions[6].answers[2].text && this.valid) {
            if(!this.validation_fail){
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }
        }
        if (this.questions[5].selected.includes('Step 4: Risk reduction')) {
            if (this.questions[6].answers[3].text && this.valid) {
            if(!this.validation_fail) {
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }
        }
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
    ref_questions() {
      return this.$store.state.slide14.questions
    },
    questions: {
      get() {
        return this.$store.state.slide15.questions;
      },
      set(value) {
        this.$store.slide15.commit('UPDATE_QUESTIONS', value);
      }
    }
  }
}

</script>

<style scoped>

</style>