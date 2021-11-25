<template>
<div id="stepper_container">
  <v-stepper id="stepper" v-if="!completed" v-model="page">
    <v-progress-linear
      id="progress-line"
      background-color="red"
      color="black"
      v-model="progress"
      height="5"
    >
    </v-progress-linear>
    <v-stepper-header id="stepper-header">
      <h4>
        <v-icon mdiFeather></v-icon><em>{{ question }}</em>
      </h4>
    </v-stepper-header>

    <v-divider id="devider"></v-divider>
    <v-stepper-items id="stepper-content">
      <slot></slot>
    </v-stepper-items>
  </v-stepper>

  <v-snackbar
    class="snackbar"
    color="#770000"
    bottom
    right
    v-model="validation_alert"
  >
    Please input all required fields
    <template v-slot:action="{ attrs }">
      <v-btn
        v-bind="attrs"
        @click="validation_alert = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
  <v-snackbar
    class="snackbar"
    color="#770000"
    right
    v-model="offline"
  >
    You are offline
    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        text
        v-bind="attrs"
        @click="offline = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
  <v-snackbar
    class="snackbar"
    color="#770000"
    right
    v-model="online"
  >
    You are online
    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        text
        v-bind="attrs"
        @click="online = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
  <v-snackbar
    class="snackbar"
    color="#770000"
    right
    v-model="missingData"
  >
    Please Connect to internet
    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        text
        v-bind="attrs"
        @click="missingData = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
  <v-snackbar 
    class="snackbar"
    color="#770000"
    right
    v-model="commDataSent"
  >
    Updated Community Code
    <template  v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="CommDataSent = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
  <v-snackbar 
    class="snackbar"
    color="#770000"
    right
    v-model="siteDataSent"
  >
    Updated School Code
    <template  v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="siteDataSent = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
  <v-snackbar 
    class="snackbar"
    color="#770000"
    right
    v-model="surveyDataSent"
  >
    Draft Survey Added
    <template  v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="surveyDataSent = false">
        Close
      </v-btn>
    </template>
  </v-snackbar> 

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
  <Controller :onLanding="onLanding" :all_sites="all_sites" :handleCollectAnswers="handleCollectAnswers" />
</div>
</template>

<script>
import { addSurvey } from '../../store/api/survey';
import { getPublicSites } from '../../store/api/sites';
import Controller from '../navigation/Controller.vue';
  export default {
    props: ['handleCollectAnswers'],
    components: {
      Controller
    },
    data() {
      return {
        validation_alert: false,
        question: undefined,
        online: undefined,
        offline: undefined,
        overlay: false,
        internetStatus: undefined,
        commDataSent: false,
        siteDataSent: false,
        surveyDataSent: false,
        missingData: false,
        all_sites: [],
        completed: undefined,
      }
    },
    computed: {
      onLanding: {
        get() {
          return this.$store.state.onLanding
        },
        set(value) {
          this.$store.commit('UPDATE_LANDING', value);
        }
      },
      page(){
       return this.$store.state.page
      },
      progress: {
        get() {
          return this.$store.state.progress
        },
        set(value) {
          this.$store.commit('UPDATE_PROGRESS', value)
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
      onLine: {
				get() {
					return this.$store.state.onLine;
				},
				set(value) {
					this.$store.commit("UPDATE_ONLINE_STATUS", value);
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
      slide02: {
        get() {
          return this.$store.state.slide02.questions;
        },
        set(value) {
          this.$store.slide02.commit('UPDATE_QUESTIONS', value);
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
      slide17: {
        get() {
          return this.$store.state.slide17.questions;
        },
        set(value) {
          this.$store.slide17.commit('UPDATE_QUESTIONS', value);
        }
      },
    },
    methods: {
      exitSurvey() {
        localStorage.setItem('completed', false);
        this.$router.go(this.$router.currentRoute);
        localStorage.removeItem('draft');
			},
      handleGetSites() {
        if (navigator.onLine){
          getPublicSites().then(data => {
            this.all_sites = data;
            localStorage.setItem('all-sites', JSON.stringify(data));
          })
        } else {
          this.all_sites = JSON.parse(localStorage.getItem('all-sites'));
        }
      },
      async internetCheck() {
				if (navigator.onLine !== this.internetStatus){
					if (navigator.onLine) {
							this.onLine = true;
							this.online = true;
							this.internetStatus = true;
							let queue = localStorage.getItem('queue');
							if (queue) {
								await this.postQueuedSurveys();
								this.completed = false;
							} else {
								await this.syncStorageData();
							}
						} else {
							this.onLine = false;
							this.offline = true;
							this.internetStatus = false;
							await this.getStorageIfData();
						}
				}
      },
      async postQueuedSurveys() {
				let queue = JSON.parse(localStorage.getItem('queue'));
				if (queue) {
					for (let i = 0; i < queue.length; i++) {
						addSurvey(queue[i]).then(res => {
            console.log(res);
          });
						this.surveyDataSent = true;
					}
					localStorage.removeItem('queue');
				}
			},
      syncStorageData() {
        let all_sites = JSON.parse(localStorage.getItem('all-sites'));
				let counsellors = JSON.parse(localStorage.getItem('counsellors'));
				let areas = JSON.parse(localStorage.getItem('areas'));
				if (all_sites){
					if(this.all_sites !== all_sites){
						localStorage.setItem('all-sites', JSON.stringify(this.all_sites));
					}
				} else {
						localStorage.setItem('all-sites', JSON.stringify(this.all_sites));
				}   
				if (counsellors) {
					if (this.slide01[3].answers !== counsellors) {
						localStorage.setItem('counsellors', JSON.stringify(this.slide01[3].answers));
					}
				} else {
					localStorage.setItem('counsellors', JSON.stringify(this.slide01[3].answers));
				}

				if (areas) {
					if (this.slide03[3].answers !== areas) {
						localStorage.setItem('areas', JSON.stringify(this.slide03[3].answers));
					}
				} else {
						localStorage.setItem('areas', JSON.stringify(this.slide03[3].answers));
				}
			},
      async getStorageIfData() {
				let all_sites = await JSON.parse(localStorage.getItem('all-sites'));
				let counsellors = await JSON.parse(localStorage.getItem('counsellors'));
				let areas = await JSON.parse(localStorage.getItem('areas'));
				if (counsellors.length > 0 && areas.length > 0 && all_sites.length) {
					this.all_sites = all_sites;
					this.slide01[3].answers = counsellors;
					this.slide03[3].answers = areas;
				} else {
					this.missingData = true;
				}
			}
    },
    created() {
      this.question = 'Site Questions';
      let _completed = localStorage.getItem('completed');
      if (_completed === true) {
        this.completed = _completed;
      } else {
        localStorage.setItem('completed', false);
      }
      this.handleGetSites();
    },
    updated() {
      let _completed = localStorage.getItem('completed');
      if (_completed === true) {
        this.completed = _completed;
      } else {
        localStorage.setItem('completed', false);
      }
      this.internetCheck();

      if(this.page == 1) this.question = 'Site Questions';
      if(this.page == 2) this.question = 'Client Information (Part 1)';
      if(this.page == 3) this.question = 'Client Information (Part 2)';
      if(this.page == 4) this.question = 'Counsellor Guideline';
      if(this.page == 5) this.question = 'HIV Questions';
      if(this.page == 6) this.question = 'Counsellor Guideline';
      if(this.page == 7) this.question = 'TB Screening';
      if(this.page == 8) this.question = 'Counsellor Guideline';
      if(this.page == 9) this.question = 'HIV Information';
      if(this.page == 10) this.question = 'Counsellor Guideline';
      if(this.page == 11) this.question = 'Counsellor Guideline';
      if(this.page == 12) this.question = 'Risk Screening';
      if(this.page == 13) this.question = 'Counsellor Guideline';
      if(this.page == 14) this.question = 'HIV Testing';
      if(this.page == 15) this.question = 'HIV Risks Planning';
      if(this.page == 16) this.question = 'Referral Questions';
      if(this.page == 17) this.question = 'Follow Up Questions';
    },
  }
</script>

<style>
#stepper_container {
  height: 85vh;
  margin: 55px 0;
  width: 100vw;
  background: brown !important;
}

#survey-app-footer {
		height: 10%;
		width: 100%;
		z-index: 2px;
		bottom: 0;
		position: fixed;
		background: #770000;
}
/* #stepper {
  padding-bottom: 65px;
} */

#progress-line {
  position: fixed;
  color: black;
  background: #f56161;
}

#stepper-header {
  height: 7.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  color: #770000;
}
#devider {
  color: black;
}

#stepper-content {
  height: 85vh;
  color: black;
  overflow-y: scroll;
  /* background: #ffffff; */
  padding-bottom: 75px;
}

#completed-card {
  display: flex;
  width: 100%;
  height: 90vh;
  justify-content: center;
  align-items: center;
  background: #ffffff;
}

#header_client_code {
  margin-top: 10px;
  text-align: center !important;
  font-size: 20px;
}

#client_code {
  text-align: center;
  font-size: 50px;
  color: #770000;
}

.link {
  text-decoration: none;
  color: rgb(255, 255, 255);
}

#home_btn {
  padding: 4px 19px;
  width: 120px;
  cursor: pointer !important;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  text-decoration: none;
  background: #770000;
  color: #ffffff;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 27px;
}

.snackbar {
  padding-bottom: 85px !important;
}
</style>
