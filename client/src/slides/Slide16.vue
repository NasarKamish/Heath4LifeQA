<template>
  <v-stepper-content step="16">
    <v-form v-if="page == 16" ref="form" v-model="valid">
       <v-col
          cols="12"
          xs="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
        > 
        <label>{{ questions[0].label }}<span class="required">*</span></label>
        <Radio :fields="questions[0]" :intersect="intersect" />
       </v-col>
      <div v-if="questions[0].selected == 'Yes'">
         <v-col
          cols="12"
          xs="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
        >
          <label>{{ questions[1].label }}<span class="required">*</span></label>
          <Select :fields="questions[1]" :intersect="intersect" />
         </v-col>
        <div v-if="questions[1].selected">
          <div v-if="questions[1].selected.includes('Other')">
             <v-col
              cols="12"
              xs="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
            >
              <label>{{ questions[3].label }}</label>
              <Txt :fields="questions[3]" :rule="textField" :intersect="intersect" />
             </v-col>
          </div>
        </div>
         <v-col
          cols="12"
          xs="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
        >
          <label>{{ questions[2].label }}<span class="required">*</span></label>
          <Select :fields="questions[2]" :intersect="intersect" />
         </v-col>
        <div v-if="questions[2].selected">
          <div v-if="questions[2].selected.includes('Other')">
             <v-col
              cols="12"
              xs="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
            >
              <label>{{ questions[4].label }}</label>
              <Txt :fields="questions[4]" :rule="textField" :intersect="intersect" />
             </v-col>
          </div>
        </div>
      </div>
    </v-form>
  </v-stepper-content>
</template>

<script>
import Radio from '../components/inputs/Radio';
import Txt from '../components/inputs/Text';
import Select from '../components/inputs/Select';

export default {
  components: {
    Radio,
    Txt,
    Select
  },
  data(){
    return {
      textField: [
        v => !!v || "This field is required",
        v => /^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/.test(v) || "No special character or blank spaces"
      ],
      valid :true
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
  created() {
    if (this.questions[0].selected == 'No') {
      this.questions[1].selected = undefined;
      this.questions[2].selected = undefined;
      this.questions[3].text = undefined;
      this.questions[4].text = undefined;
    }
    
    // Checking Validation
    if (this.page == 16) {
      if (this.questions[0].selected) {
        this.validation_fail = false;
        if (this.questions[0].selected == 'No') {
          if (!this.validation_fail) {
            this.validation_fail = false;
          }
        }
        
        if (this.questions[0].selected == 'Yes') {
          if (this.questions[1].selected) {
            if (!this.validation_fail) {
              this.validation_fail = false;
            }
            if (this.questions[1].selected.includes('Other')) {
              if (this.questions[3].text != undefined) {
                if (this.questions[3].text.length > 0) {
                  if (!this.validation_fail) {
                    this.validation_fail = false;
                  }
                } else {
                  this.validation_fail = true;
                }
              } else {
                  this.validation_fail = true;
              }
            }
          } else {
            this.validation_fail = true;
          }
          
          if (this.questions[2].selected) {
            if (!this.validation_fail) {
              this.validation_fail = false;
            }
            if (this.questions[2].selected.includes('Other')) {
              if (this.questions[4].text != undefined) {
                if (this.questions[4].text.length > 0) {
                  if (!this.validation_fail) {
                    this.validation_fail = false;
                  }
                } else {
                  this.validation_fail = true;
                }
              } else {
                this.validation_fail = true;
              }
            }
          } else {
            this.validation_fail = true;
          }
        }
      } else {
          this.validation_fail = true;
      }
    }
  },
  updated() {
    if (this.questions[0].selected == 'No') {
      this.questions[1].selected = undefined;
      this.questions[2].selected = undefined;
      this.questions[3].text = undefined;
      this.questions[4].text = undefined;
    }

    if (this.questions[1].selected) {
      if (!this.questions[1].selected.includes('Other')) {
        if (this.questions[3].text) {
          if (this.questions[3].text.length > 0) {
            this.questions[3].text = ''
          }
        }
      }
    }

    if (this.questions[2].selected) {
      if (!this.questions[2].selected.includes('Other')) {
        if (this.questions[4].text) {
          if (this.questions[4].text.length > 0) {
            this.questions[4].text = ''
          }
        }
      }
    }

    // Checking Validation
    if (this.page == 16) {
      if (this.questions[0].selected) {
        this.validation_fail = false;
        if (this.questions[0].selected == 'No') {
          if (!this.validation_fail) {
            this.validation_fail = false;
          }
        }
        
        if (this.questions[0].selected == 'Yes') {
          if (this.questions[1].selected) {
            if (!this.validation_fail) {
              this.validation_fail = false;
            }
            if (this.questions[1].selected.includes('Other')) {
              if (this.questions[3].text != undefined) {
                if (this.questions[3].text.length > 0) {
                  if (!this.validation_fail) {
                    this.validation_fail = false;
                  }
                } else {
                  this.validation_fail = true;
                }
              } else {
                this.validation_fail = true;
              }
            }
          } else {
            this.validation_fail = true;
          }
          
          if (this.questions[2].selected) {
            if (!this.validation_fail) {
              this.validation_fail = false;
            }
            if (this.questions[2].selected.includes('Other')) {
              if (this.questions[4].text != undefined) {
                if (this.questions[4].text.length > 0) {
                  if (!this.validation_fail) {
                    this.validation_fail = false;
                  }
                } else {
                  this.validation_fail = true;
                }
              } else {
                  this.validation_fail = true;
              }
            }
          } else {
            this.validation_fail = true;
          }
        }
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
    questions: {
      get() {
        return this.$store.state.slide16.questions;
      },
      set(value) {
        this.$store.slide16.commit('UPDATE_QUESTIONS', value);
      }
    }
  }
}
</script>

<style scoped>

</style>