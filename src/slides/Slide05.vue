<template>
  <v-stepper-content step="5">
    <v-form v-if="page == 5" ref="form" v-model="valid">
      <label>{{ questions[0].label }}<span class="required">*</span></label>
      <Radio :fields="questions[0]" :intersect="intersect" />
      <div v-if="questions[0].selected == 'No'">
        <label>{{ questions[1].label }}<span class="required">*</span></label>
        <Radio :fields="questions[1]" :intersect="intersect" />
        <div v-if="questions[1].selected == 'No'">
          <label>{{ questions[5].label }}<span class="required">*</span></label>
          <Radio
            :fields="questions[5]"
            :intersect="intersect"
          />
        </div>
        <label>{{ questions[2].label }}<span class="required">*</span></label>
        <Radio :fields="questions[2]" :intersect="intersect" />
        <v-col
          cols="12"
          xs="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
        >
          <label>{{ questions[3].label }}<span class="required">*</span></label>
          <Txt
            :fields="questions[3]"
            :intersect="intersect"
            :rule="textField"
        />
        </v-col>
        <label>{{ questions[4].label }}<span class="required">*</span></label>
        <Radio :fields="questions[4]" :intersect="intersect" />
        </div>
        <label>{{ questions[6].label }}<span class="required">*</span></label>
        <Radio :fields="questions[6]" :intersect="intersect" />
        <div v-if="questions[6].selected == 'No'">
          <div class="row">
            <div class="col">
              <p class="required">
                You can not continue without client's consent.
                <a @click="exitSurvey">EXIT</a>
              </p>
            </div>
          </div>
        </div>
        <div v-if="questions[6].selected == 'Yes'">
        <v-dialog v-model="dialog" width="800px" height="500px">
          <template v-slot:activator="{ on, attrs }">
            <div class="row">
              <div class="col">
                <v-btn color="#770000" dark v-bind="attrs" v-on="on">
                  Open document
                </v-btn>
              </div>
            </div>

            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="signed"
                  x-large
                  text
                  v-bind="attrs"
                  v-on="on"
                  @click="
                    () => {
                      dialog2 = true;
                      signed = true;
                    }
                  "
                  dark
                  color="green darken-1"
                  >mdi-image
                </v-icon>
              </template>
              <span>View Signature</span>
            </v-tooltip>
            <p v-if="!signed" class="required">Need clients signature to proceed</p>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">CONSENT TO HIV TESTING</span>
            </v-card-title>
            <v-card-text>
              <div>
                <p>READ DOCUMENT TO THE CLIENT</p>
                I hereby consent to having blood taken for HIV testing
                and to be counselled. I understand that this session is
                confidential except if my life or someone else’s life is
                at risk, then my counsellor will report to the relevant
                authorities.
              </div>
              <br />
              <div>
                Ndiyavuma igazi lam litsalwe ukuhlola intsholongwane
                Ugawulayo nokuba ndinikwe iingcebiso. Ndiyaqonda ukuba
                yonke into ethethwa apha ihlala apha, ngaphandle kokuba
                ubomi bam okanye obomnye umntu busengozini. Xa kunjalo
                kwakunyanzeleka umcebisi wam achazele indawo yomthetho
                efanelekileyo.
              </div>
              <br />
              <div>
                Ek gee hiermee toestemming vir berading en dat my bloed
                getrek mag word vir 'n MIV toets. Ek verstaan dat
                hierdie sessie vertroulik is behalwe in die geval waar
                my lewe of iemand anders s’n in gevaar mag wees.Ek
                verstaan dat my berader dit dan by die betrokke owerhede
                sal aanmeld.
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="green darken-1"
                text
                dark
                @click="dialog = false"
                v-on:click="dialog2 = true"
              >
                AGREE
              </v-btn>
              <v-btn
                color="red darken-1"
                text
                dark
                @click="dialog = false"
              >
                DISAGREE
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Signature Consent -->
        <v-dialog v-model="dialog2" fullscreen>
          <v-card>
            <v-card-title id="signature-header">
              CLIENT SIGNATURE
            </v-card-title>
            <div class="container">
              <div style="display: inline-block">
                <v-btn color="primary" v-if="!pad" @click="pad = true">
                  Signature Pad
                </v-btn>
                <v-btn color="primary" v-if="pad" @click="pad = false">
                  Camera
                </v-btn>
              </div>
              <div id="signature-container">
                <form id="signaturePad">
                  <!-- Signature Pad -->
                  <v-container v-if="pad" @keypress.enter="save">
                    <div id="">
                      <h4 v-if="!pad" class="sign">
                        *File should be smaller than 2mb*
                      </h4>
                      <VueSignaturePad
                        v-if="!signed"
                        width="100%"
                        height="40vh"
                        id="signature"
                        ref="signaturePad"
                        :options="{
                          onBegin: () => {
                            $refs.signaturePad.resizeCanvas();
                          },
                        }"
                      />
                    </div>
                  </v-container>
                  <v-container v-if="!pad">
                    <Camera width="100%" :dialog2="dialog2" />
                      <div id="camera-btns">
                        <v-btn
                          style="margin-right: 10px"
                          color="green darken-1"
                          dark
                          v-on:click.prevent="capturedSave"
                        >
                          Save
                        </v-btn>
                        <v-btn
                          color="red darken-1"
                          dark
                          @click="dialog2 = false"
                        >
                          Cancel
                        </v-btn>
                      </div>
                  </v-container>
                  <!-- Image goes here -->
                  <div
                    v-if="signed && pad"
                    style=" height: 40vh; border: 3px solid #770000; width: 100%; border-radius: 15px; margin-top: 10px;"
                  >
                    <img
                      :src="this.photo"
                      width="100%"
                      height="100%"
                      style="border-radius: 10px;"
                    />
                  </div>
                  <v-card-actions v-if="!signed">
                    <v-btn
                      color="green darken-1"
                      dark
                      v-on:click.prevent="save"
                      v-if="pad"
                    >
                      Save
                    </v-btn>

                    <v-btn
                      v-if="pad"
                      color="blue darken-1"
                      dark
                      @click="undo"
                    >
                      Undo
                    </v-btn>

                    <v-btn
                      v-if="pad"
                      color="red darken-1"
                      dark
                      v-on:click="clear"
                      @click="dialog2 = false"
                    >
                      Cancel
                    </v-btn>
                  </v-card-actions>
                  <v-card-actions v-if="signed && pad">
                    <v-btn
                      color="blue darken-1"
                      dark
                      @click="signed = false"
                    >
                      Sign
                    </v-btn>
                    <v-btn
                      color="red darken-1"
                      dark
                      @click="dialog2 = false"
                    >
                      Exit
                    </v-btn>
                  </v-card-actions>
                </form>
              </div>
            </div>
          </v-card>
        </v-dialog>
      </div>
    </v-form>
  </v-stepper-content>
</template>

<script>
import Radio from '../components/inputs/Radio';
import Txt from '../components/inputs/Text';
import Camera from '../components/signatureSection/camera';

  export default {
    components: {
      Radio,
      Txt,
      Camera
    },
    data() {
      return {
        textField: [
           v => /^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/.test(v) || "No special character or blank spaces"
        ],
        dialog: false,
        dialog2: false,
        computed: undefined,
        valid : true
      }
    },
    created() {
      let _completed = localStorage.getItem('completed');
      if (_completed  === true) {
        this.completed = _completed;
      } else {
        localStorage.setItem('completed', false);
      }
      
      // Checking Validation
      if (this.page == 5) {
        if (this.questions[0].selected) {
          this.validation_fail = false;
          if (this.questions[0].selected == 'Yes') {
            if (this.questions[6].selected && this.signed){
              if (!this.validation_fail) {
                  this.validation_fail = false;
                }
            } else {
              this.validation_fail = true;
            }
          }
  
          if (this.questions[0].selected == 'No') {
            if (this.questions[1].selected == 'Yes' && this.questions[3].text != undefined) {
              if (this.questions[2].selected) {
                if (!this.validation_fail) {
                  this.validation_fail = false;
                }
              } else {
                this.validation_fail = true;
              }
  
              if (this.questions[3].text.length > 0) {
                if (!this.validation_fail) {
                  this.validation_fail = false;
                }
              } else {
                this.validation_fail = true;
              }
  
              if (this.valid) {
                if (!this.validation_fail) {
                  this.validation_fail = false;
                }
              } else {
                this.validation_fail = true;
              }
              if (this.questions[4].selected) {
                if (!this.validation_fail) {
                  this.validation_fail = false;
                }
              } else {
                this.validation_fail = true;
              }
            }
  
            if (this.questions[1].selected == 'No' && this.questions[3].text != undefined) {
              if (this.questions[5].selected) {
                if (!this.validation_fail) {
                  this.validation_fail = false;
                }
              } else {
                this.validation_fail = true;
              }
  
              if (this.questions[3].text.length > 0) {
                if (!this.validation_fail) {
                  this.validation_fail = false;
                }
              } else {
                this.validation_fail = true;
              }
  
              if (this.valid) {
                if (!this.validation_fail) {
                  this.validation_fail = false;
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
  
            if (this.signed) {
              if (!this.validation_fail) {
                this.validation_fail = false;
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
      if (this.questions[0].selected === "Yes") {
          this.questions[1].selected = undefined;
          this.questions[5].selected = undefined;
          this.questions[2].selected = undefined;
          this.questions[3].text = '';
          this.questions[4].selected = undefined;
      }

      // Checking Validation
      if (this.page == 5) {
        if (this.questions[0].selected) {
          this.validation_fail = false;
          if (this.questions[0].selected == 'Yes') {
            if (this.questions[6].selected && this.signed){
              if (!this.validation_fail) {
                  this.validation_fail = false;
                }
            } else {
              this.validation_fail = true;
            }
          }
  
          if (this.questions[0].selected == 'No') {
            if (this.questions[1].selected == 'Yes' && this.questions[3].text != undefined) {
              if (this.questions[2].selected) {
                if (!this.validation_fail) {
                  this.validation_fail = false;
                }
              } else {
                this.validation_fail = true;
              }
  
              if (this.questions[3].text.length > 0) {
                if (!this.validation_fail) {
                  this.validation_fail = false;
                }
              } else {
                this.validation_fail = true;
              }
  
              if (this.valid) {
                if (!this.validation_fail) {
                  this.validation_fail = false;
                }
              } else {
                this.validation_fail = true;
              }
              if (this.questions[4].selected) {
                if (!this.validation_fail) {
                  this.validation_fail = false;
                }
              } else {
                this.validation_fail = true;
              }
            }
  
            if (this.questions[1].selected == 'No' && this.questions[3].text != undefined) {
              if (this.questions[5].selected) {
                if (!this.validation_fail) {
                  this.validation_fail = false;
                }
              } else {
                this.validation_fail = true;
              }
  
              if (this.questions[3].text.length > 0) {
                if (!this.validation_fail) {
                  this.validation_fail = false;
                }
              } else {
                this.validation_fail = true;
              }
  
              if (this.valid) {
                if (!this.validation_fail) {
                  this.validation_fail = false;
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
  
            if (this.signed) {
              if (!this.validation_fail) {
                this.validation_fail = false;
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
    methods: {
      validate() {
      this.$refs.form.validate();
      },
      exitSurvey() {
        localStorage.setItem('completed', false);
        localStorage.removeItem('draft');
        this.$router.go(this.$router.currentRoute);
      },
      intersect() {
        this.$forceUpdate();
      },
      clear() {
				this.$refs.signaturePad.clearSignature();
			},
      undo() {
				this.$refs.signaturePad.undoSignature();
			},
			save() {
				const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
				if (!isEmpty) {
					this.photo = data;
					this.signed = true;
					this.dialog2 = false;
				} else if (isEmpty) {
					this.signature = this.photo;
					this.signed = true;
					this.dialog2 = false;
				} else {
					alert("No Signature!");
				}
			},
      capturedSave() {
				this.dialog2 = false;
				this.signed = true;
				this.pad = false;
			},
    }, 
    computed: {
      pad: {
        get() {
          return this.$store.state.pad
        }, 
        set(value) {
          this.$store.commit('PAD_UPDATE', value);
        }
      },
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
      signed: {
        get() {
          return this.$store.state.signed;
        },
        set(value) {
          this.$store.commit('UPDATE_SIGNATURE', value);
        }
      }, 
      photo: {
        get() {
          return this.$store.state.photo;
        },
        set(value) {
            this.$store.commit('UPDATE_PHOTO', value);
        }
      },
      questions: {
        get() {
          return this.$store.state.slide05.questions;
        },
        set(value) {
          this.$store.slide05.commit('UPDATE_QUESTIONS', value);
        }
      }
    }
  }
</script>

<style scoped>
#signature-header {
  background: #770000;
  display: flex;
  justify-content: center;
  color: white;
}
#signature {
  border: 3px solid #770000 !important;
  border-radius: 10px !important;
}
#camera-btns {
  display: flex;
  justify-content: space-between;
}
</style>