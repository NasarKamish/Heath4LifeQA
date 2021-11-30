<template>
  <v-stepper-content step="12">
    <v-form v-if="page == 12" ref="form" v-model="valid">
      <label>{{ questions[0].label }}:<span class="required">*</span></label>
      <Radio :fields="questions[0]" :intersect="intersect" />
      <div v-if="questions[0].selected == 'Yes'">
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <label
            >{{ questions[1].label }}:<span class="required">*</span></label
          >
          <Select :fields="questions[1]" multiple :intersect="intersect" />
        </v-col>
        <div
          v-if="
            questions[1].selected == '6 weeks to 3 months ago' ||
              questions[1].selected == 'In the last 6 weeks' ||
              questions[1].selected == '3 to 6 months ago'
          "
        >
          <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
            <label
              >{{ questions[2].label }}:<span class="required">*</span></label
            >
            <Select :fields="questions[2]" :intersect="intersect" />
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
            <label
              >{{ questions[3].label }}:<span class="required">*</span></label
            >
            <Select :fields="questions[3]" :intersect="intersect" />
          </v-col>
          <label
            >{{ questions[8].label }}:<span class="required">*</span></label
          >
          <Radio :fields="questions[8]" :intersect="intersect" />
          <div v-if="questions[8].selected == 'Yes'">
            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
              <label
                >{{ questions[6].label }}:<span class="required">*</span></label
              >
              <Select :fields="questions[6]" :intersect="intersect" multiple />
            </v-col>
          </div>
        </div>
      </div>
      <div v-if="questions[0].selected">
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <label
            >{{ questions[4].label }}:<span class="required">*</span></label
          >
          <Select :fields="questions[4]" :intersect="intersect" />
        </v-col>
        <div
          v-if="
            questions[3].selected == 'In the last 6 weeks' ||
              questions[4].selected == 'Yes – in the last 6 weeks'
          "
        >
          <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
            <label
              >{{ questions[5].label }}:<span class="required">*</span></label
            >
            <Txt
              :fields="questions[5]"
              :rule="textField"
            />
          </v-col>
        </div>

        <div v-if="questions[8].selected == 'No'">
					<v-chip
						color="#770000"
						outlined
						text-color="#770000"
						label
					>
						<h2>Results show screening is Negative.</h2>
					</v-chip>
				</div>
				<div v-if="questions[6].selected">
					<div v-if="questions[6].selected.length > 0">
						<v-chip
							color="#770000"
							outlined
							text-color="#770000"
							label
						>
							<h2>Results show screening is Positive.</h2>
						</v-chip>
					</div>
				</div>

        <div v-if="questions[0].selected == 'No'">
          <label>{{ questions[7].label }}:<span class="required">*</span></label>
          <p><v-chip class="ma-2" color="#770000" outlined> N/A</v-chip></p>
        </div>
        <div v-if="over6Months == true">
          <label>{{ questions[7].label }}:<span class="required">*</span></label>
          <p><v-chip class="ma-2" color="#770000" outlined> N/A</v-chip></p>
        </div>
      </div>
    </v-form>
  </v-stepper-content>
</template>

<script>
import Txt from "../components/inputs/Text";
import Select from "../components/inputs/Select";
import Radio from "../components/inputs/Radio";

export default {
  components: {
    Txt,
    Select,
    Radio,
  },
  data() {
    return {
      textField: [
        (v) =>
          /^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/.test(v) ||
          "No special character or blank spaces",
      ],
      valid: true
    };
  },
  methods: {
    intersect() {
      this.$forceUpdate();
    },
    validate() {
      this.$refs.form.validate();
    }
  },
  updated() {
    if (this.questions[0].selected == "No") {
      this.questions[1].selected = undefined;
      this.questions[2].selected = undefined;
      this.questions[3].selected = undefined;
      this.questions[6].selected = undefined;
      this.questions[7].selected = "N/A";
      this.questions[8].selected = undefined;
    }

    if (this.questions[8].selected == "No") {
      this.questions[6].selected = undefined;
      this.questions[7].selected = "Negative";
    }

    if (this.questions[8].selected == 'Yes') {
      if (this.questions[6].selected != undefined) {
        if (this.questions[6].selected.length > 0) {
          this.questions[7].selected = "Positive";
					}
				} if (this.questions[6].selected == undefined || this.questions[6].selected.length == 0) {
					this.questions[7].selected = undefined;
				}
			}

    // Checking Validation
    if (this.page == 12) {
      if (this.questions[0].selected) {
        this.validation_fail = false;
        if (this.questions[0].selected == "No") {
          if (this.questions[4].selected && this.questions[7].selected == "N/A") {
            if (!this.validation_fail){
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }
        }

        if (this.questions[0].selected == "Yes") {
          if (this.questions[1].selected) {
            if (!this.validation_fail) {
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }

          if (
            this.questions[1].selected === "6 to 12 months ago" ||
            this.questions[1].selected === "More than 12 months ago"
          ) {
            if (!this.validation_fail) {
              this.validation_fail = false;
            }
          }

          if (
            this.questions[1].selected !== "6 to 12 months ago" &&
            this.questions[1].selected !== "More than 12 months ago"
          ) {
            if (this.questions[2].selected) {
              if (!this.validation_fail) {
                this.validation_fail = false;
              }
            } else {
              this.validation_fail = true;
            }

            if (this.questions[3].selected) {
              if (!this.validation_fail) {
                this.validation_fail = false;
              }
            } else {
              this.validation_fail = true;
            }

            if (this.questions[8].selected) {
              if (!this.validation_fail) {
                this.validation_fail = false;
              }
            } else {
              this.validation_fail = true;
            }
            if (this.questions[8].selected == "Yes") {
              if (this.questions[6].selected) {
                if (!this.validation_fail) {
                  this.validation_fail = false;
                }
              } else {
                this.validation_fail = true;
              }
            }
          }
        }

        if (
          this.questions[3].selected == "In the last 6 weeks" ||
          this.questions[4].selected == "Yes – in the last 6 weeks"
        ) {
          if (this.questions[5].text != undefined) {
            if (this.questions[5].text.length > 0 && this.valid) {
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

        if (this.questions[4].selected) {
          if (!this.validation_fail) {
            this.validation_fail = false;
          }
        } else {
          this.validation_fail = true;
        }
      } else {
        this.validation_fail = true;
      }

      if (this.questions[7].selected) {
        if (!this.validation_fail) {
          this.validation_fail = false;
        }
      } else {
        this.validation_fail = true;
      }
    }
  },
  created() {
    // Checking Validation
    if (this.page == 12) {
      if (this.questions[0].selected) {
        this.validation_fail = false;
        if (this.questions[0].selected == "No") {
          if (this.questions[4].selected && this.questions[7].selected == "N/A") {
            if (!this.validation_fail){
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }
        }

        if (this.questions[0].selected == "Yes") {
          if (this.questions[1].selected) {
            if (!this.validation_fail) {
              this.validation_fail = false;
            }
          } else {
            this.validation_fail = true;
          }

          if (this.over6Months) {
            if (!this.validation_fail) {
              this.validation_fail = false;
            }
          }

          if (!this.over6Months) {
            if (this.questions[2].selected) {
              if (!this.validation_fail) {
                this.validation_fail = false;
              }
            } else {
              this.validation_fail = true;
            }

            if (this.questions[3].selected) {
              if (!this.validation_fail) {
                this.validation_fail = false;
              }
            } else {
              this.validation_fail = true;
            }

            if (this.questions[8].selected) {
              if (!this.validation_fail) {
                this.validation_fail = false;
              }
            } else {
              this.validation_fail = true;
            }
            if (this.questions[8].selected == "Yes") {
              if (this.questions[6].selected) {
                if (!this.validation_fail) {
                  this.validation_fail = false;
                }
              } else {
                this.validation_fail = true;
              }
            }
          }
        }

        if (
          this.questions[3].selected == "In the last 6 weeks" ||
          this.questions[4].selected == "Yes – in the last 6 weeks"
        ) {
          if (this.questions[5].text != undefined) {
            if (this.questions[5].text.length > 0 && this.valid) {
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

        if (this.questions[4].selected) {
          if (!this.validation_fail) {
            this.validation_fail = false;
          }
        } else {
          this.validation_fail = true;
        }
      } else {
        this.validation_fail = true;
      }

      if (this.questions[7].selected) {
        if (!this.validation_fail) {
          this.validation_fail = false;
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
        this.$store.commit("VALIDATION_TOGGLE", value);
      },
    },
    over6Months() {
      if (
        this.questions[1].selected === "6 to 12 months ago" ||
        this.questions[1].selected === "More than 12 months ago"
      )
      return true;
      else return false;
    },
    questions: {
      get() {
        return this.$store.state.slide12.questions;
      },
      set(value) {
        this.$store.slide12.commit("UPDATE_QUESTIONS", value);
      },
    },
    sti_default: {
      get() {
        return this.$store.state.sti_default;
      },
      set(value) {
        this.$store.commit("UPDATE_STIDEFAULT", value);
      },
    },
  },
};
</script>

<style scoped></style>
