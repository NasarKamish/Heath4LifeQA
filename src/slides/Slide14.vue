<template>
  <v-stepper-content step="14">
    <v-form v-if="page == 14" ref="form" v-model="valid"> 
      <label>{{ questions[0].label }}:<span class="required">*</span></label>
      <Radio :fields="questions[0]" :intersect="intersect" />
      <div v-if="questions[0].selected == 'No'">
        <TxtArea
          :fields="questions[1]"
          :rule="textField"
          :intersect="intersect"
        />
      </div>
      <div v-if="questions[0].selected == 'Yes'">
        <label>{{ questions[2].label }}:<span class="required">*</span></label>
        <v-row>
          <v-col
            cols="12"
            xs="12"
            sm="3"
            md="3"
            lg="2"
            xl="2"
          >
            <label>{{ questions[3].label }}:<span class="required">*</span></label>
            <Select :fields="questions[3]" :intersect="intersect" />
          </v-col>
          <v-col
            cols="12"
            xs="12"
            sm="3"
            md="3"
            lg="2"
            xl="2"
          >
            <label>{{ questions[4].label }}:<span class="required">*</span></label>
            <Txt :fields="questions[4]" :intersect="intersect" />
          </v-col>
          <v-col
            cols="12"
            xs="12"
            sm="3"
            md="3"
            lg="2"
            xl="2"
          >
            <label>{{ questions[9].label }}:<span class="required">*</span></label>
            <Select :fields="questions[9]" :intersect="intersect" />
          </v-col>
        </v-row>
        <div v-if="questions[9].selected == 'Reactive'">
          <v-row>
            <v-col
              cols="12"
              xs="12"
              sm="3"
              md="3"
              lg="2"
              xl="2"
            >
              <label>{{ questions[5].label }}:<span v-if="questions[9].selected == 'Reactive'" class="required">*</span></label>
              <Select :fields="questions[5]" :intersect="intersect" />
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="3"
              md="3"
              lg="2"
              xl="2"
            >
              <label>{{ questions[6].label }}:<span v-if="questions[9].selected == 'Reactive'" class="required">*</span></label>
              <Txt :fields="questions[6]" :intersect="intersect" />
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="3"
              md="3"
              lg="2"
              xl="2"
            >
              <label>{{ questions[10].label }}:<span v-if="questions[9].selected == 'Reactive'" class="required">*</span></label>
              <Select :fields="questions[10]" :intersect="intersect" />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              xs="12"
              sm="3"
              md="3"
              lg="2"
              xl="2"
            >
              <label>{{ questions[7].label }}:<span v-if="questions[9].selected == 'Reactive'" class="required">*</span></label>
              <Select :fields="questions[7]" :intersect="intersect" />
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="3"
              md="3"
              lg="2"
              xl="2"
            >
              <label>{{ questions[8].label }}:<span v-if="questions[9].selected == 'Reactive'" class="required">*</span></label>
              <Txt :fields="questions[8]" :intersect="intersect" />
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="3"
              md="3"
              lg="2"
              xl="2"
            >
              <label>{{ questions[11].label }}:<span v-if="questions[9].selected == 'Reactive'" class="required">*</span></label>
              <Select :fields="questions[11]" :intersect="intersect" />
            </v-col>
          </v-row>
        </div>
      </div>
      <div v-if="questions[0].selected">
        <div v-if="questions[0].selected == 'Yes'">
          <div v-if="questions[12].selected == 'Positive'">
            <v-chip
							color="#770000"
							outlined
							text-color="#770000"
							label
						>
							<h2>Results show screening is Positive.</h2>
						</v-chip>
          </div>
          <div v-if="questions[12].selected == 'Negative'">
            <v-chip
							color="#770000"
							outlined
							text-color="#770000"
							label
						>
							<h2>Results show screening is Negative.</h2>
						</v-chip>
          </div>
        </div>
        <div v-if="questions[0].selected == 'No'">
          <label>{{ questions[12].label }}:<span class="required">*</span></label>
          <p><v-chip
            class="ma-2"
            color="#770000"
            outlined
          >N/A</v-chip></p>
        </div>
      </div>
    </v-form>
  </v-stepper-content>
</template>

<script>
import Radio from '../components/inputs/Radio';
import Txt from '../components/inputs/Text';
import Time from '../components/inputs/Time';
import TxtArea from '../components/inputs/TextArea';
import Select from '../components/inputs/Select';
import Areas from '../pages/adminOptions/Areas.vue';

export default {
  components: {
    Radio,
    Txt,
    Time,
    TxtArea,
    Select,
    Areas
  },
  data() {
    return {
      // numberRule: [
      //   v =>
      //     Number.isInteger(Number(v)) || "The value must be an integer/number"
      // ],
        textField: [
        v => /^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/.test(v) || "No special character or blank spaces"
      ],
      valid : true
    }
  },
  updated() {
    if (this.questions[9].selected) {
      let array_results = [
        this.questions[9].selected,
        this.questions[10].selected,
        this.questions[11].selected,
      ];
      let new_array = array_results.filter((item) => {
        return item != undefined;
      });

      if (new_array.length == 1) {
        if (new_array[0] == "Reactive") {
          this.questions[12].selected = "Positive";
        }
        if (new_array[0] == "Non-reactive") {
          this.questions[12].selected = "Negative";
        }
      }

      if (new_array.length > 1) {
          const reactive = new_array.filter((item) => item == "Reactive");
          const non_reactive = new_array.filter((item) => item == "Non-reactive")
          if (reactive.length > 1) {
            this.questions[12].selected = "Positive";
          } 
          if (non_reactive.length > 1) {
              this.questions[12].selected = "Negative";
          }
      }
      if (this.questions[9].selected == "Non-reactive") {
        this.questions[5].selected = undefined;
        this.questions[6].text = undefined;
        this.questions[10].selected = undefined;
        this.questions[7].selected = undefined;
        this.questions[8].text = undefined;
        this.questions[11].selected = undefined;
      }
    }

    if (this.questions[0].selected == 'No') {
        this.questions[3].selected = undefined;
        this.questions[4].text = undefined;
        this.questions[9].selected = undefined;
        this.questions[5].selected = undefined;
        this.questions[6].text = undefined;
        this.questions[10].selected = undefined;
        this.questions[7].selected = undefined;
        this.questions[8].text = undefined;
        this.questions[11].selected = undefined;
        this.questions[12].selected = 'N/A';
    }
    if (this.questions[0].selected == 'Yes') {
      this.questions[1].text = undefined
    }

    // Checking Validation 
    if (this.page == 14) {
      if (this.questions[0].selected){
        this.validation_fail = false;
        if (this.questions[0].selected == 'No') {
          if (this.questions[1].text != undefined) {
            if (this.questions[1].text && this.valid) {
              if (!this.validation_fail) {
                this.validation_fail = false;
              }
            } else {
              this.validation_fail = true;
            }
          } else {
              this.validation_fail = true;
          }

          if (this.questions[12].selected == 'N/A') {
            if (!this.validation_fail) {
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }
        } 

        if (this.questions[0].selected == 'Yes') {
          if (this.questions[4].text != undefined) {
            if (this.questions[3].selected
              && this.questions[4].text.length > 0
              && this.questions[9].selected
            ) {
              if (!this.validation_fail) {
                this.validation_fail = false;
              }
            } else {
              this.validation_fail = true;
            }

            if (this.questions[3].selected
              && this.questions[4].text.length > 0
              && this.questions[9].selected == 'Reactive'){
                if (this.questions[6].text != undefined) {
                  if (this.questions[5].selected
                  && this.questions[6].text.length > 0
                  && this.questions[10].selected) {
                    if (!this.validation_fail) {
                    this.validation_fail = false;
                  }
                } else {
                  this.validation_fail = true;
                }
              }

              if (this.questions[8].text != undefined) {
                if (this.questions[7].selected
                && this.questions[8].text.length > 0
                && this.questions[11].selected) {
                  if (!this.validation_fail) {
                    this.validation_fail = false;
                  }
                } else {
                  this.validation_fail = true;
                }
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
  created() {
    // Checking Validation 
   if (this.page == 14) {
      if (this.questions[0].selected){
        this.validation_fail = false;
        if (this.questions[0].selected == 'No') {
          if (this.questions[1].text != undefined) {
            if (this.questions[1].text > 0 && this.valid) {
              if (!this.validation_fail) {
                this.validation_fail = false;
              }
            } else {
              this.validation_fail = true;
            }
          } else {
              this.validation_fail = true;
          }

          if (this.questions[12].selected == 'N/A') {
            if (!this.validation_fail) {
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }
        } 

        if (this.questions[0].selected == 'Yes') {
          if (this.questions[4].text != undefined) {
            if (this.questions[3].selected
              && this.questions[4].text.length > 0
              && this.questions[9].selected
            ) {
              if (!this.validation_fail) {
                this.validation_fail = false;
              }
            } else {
              this.validation_fail = true;
            }

            if (this.questions[3].selected
              && this.questions[4].text.length > 0
              && this.questions[9].selected == 'Reactive'){
                if (this.questions[6].text != undefined) {
                  if (this.questions[5].selected
                  && this.questions[6].text.length > 0
                  && this.questions[10].selected) {
                    if (!this.validation_fail) {
                    this.validation_fail = false;
                  }
                } else {
                  this.validation_fail = true;
                }
              }

              if (this.questions[8].text != undefined) {
                if (this.questions[7].selected
                && this.questions[8].text.length > 0
                && this.questions[11].selected) {
                  if (!this.validation_fail) {
                    this.validation_fail = false;
                  }
                } else {
                  this.validation_fail = true;
                }
              }
            }
          } else {
            this.validation_fail = true;
          }
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
        return this.$store.state.slide14.questions;
      },
      set(value) {
        this.$store.slide14.commit('UPDATE_QUESTIONS', value);
      }
    }
  }
}
</script>