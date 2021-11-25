<template>
	<v-stepper-content step="17">
		<v-form v-if="page == 17" ref="form" v-model="valid">
			<label>{{ questions[3].label }}:<span class="required">*</span></label>
      <Time :intersect="intersect" :fields="questions[3]" :time="momentTimeIn" :editDate="false" />
			<label>{{ questions[0].label }}:<span class="required">*</span></label>
			<Radio :fields="questions[0]" :intersect="intersect" />
			<div v-if="questions[0].selected == 'Yes'">
				 <v-col
          cols="12"
          xs="12"
          sm="12"
          md="8"
          lg="8"
          xl="8"
        >
					<label>{{ questions[1].label }}:<span class="required">*</span></label>
					<TxtArea :fields="questions[1]" :rule="textField" :intersect="intersect"/>
				 </v-col>
				<label>{{ questions[2].label }}:<span class="required">*</span></label>
				<Calender
					:fields="questions[2]"
					:minDate="timeIn"
					:intersect="intersect"
				/>
			</div>
		</v-form>
	</v-stepper-content>
</template>

<script>
	import moment from 'moment';
	import Radio from "../components/inputs/Radio";
	import TxtArea from "../components/inputs/TextArea";
	import Calender from "../components/inputs/Date";
	import Time from '../components/inputs/Time.vue';

	export default {
		components: {
			Radio,
			TxtArea,
			Calender,
			Time
		},
		data(){
			return {
				valid : true,
				textField: [
					v => !!v || "This field is required",
					v => /^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/.test(v) || "No special character or blank spaces"
     		],
			}
		},
		methods: {
			intersect() {
      this.$forceUpdate();
			},
				validate() {
				this.$refs.form.validate();
			}
		},
		created() {
			// Checking Validation 
			if (this.page == 17) {
				this.validation_fail = false;
				if (this.questions[0].selected) {	
					if (this.questions[0].selected == 'No') {
						if (this.timeOut) {
							if (!this.validation_fail){
								this.validation_fail = false;
							}
						} else {
							this.validation_fail = true;
						}
					}

					if (this.questions[0].selected == "Yes") {
						if (!this.validation_fail){
							this.validation_fail = false;
						}
						if (this.questions[1].text != undefined) {
							if (this.questions[1].text.length > 0
							&& this.valid) {
								if (!this.validation_fail) {
									this.validation_fail = false;
								}
							} else {
								this.validation_fail = true;
							}
						}
						if ( this.questions[2].date) {
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
			// To clear the list of the following questions if No is selected
			if (this.questions[0].selected == "No") {
				this.questions[1].text = undefined
				this.questions[2].date = undefined;
			}

			// Checking Validation 
			if (this.page == 17) {
				this.validation_fail = false;
				if (this.questions[0].selected) {	
					if (this.questions[0].selected == 'No') {
						if (this.timeOut) {
							if (!this.validation_fail){
								this.validation_fail = false;
							}
						} else {
							this.validation_fail = true;
						}
					}

					if (this.questions[0].selected == "Yes") {
						if (!this.validation_fail){
							this.validation_fail = false;
						}
						if (this.questions[1].text != undefined) {
							if (this.questions[1].text.length > 0
							&& this.valid) {
								if (!this.validation_fail) {
									this.validation_fail = false;
								}
							} else {
								this.validation_fail = true;
							}
						}
						if ( this.questions[2].date) {
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
			timeOut: {
				get(){
					return this.$store.state.timeOut;
				},
				set(value) {
					this.$store.commit('UPDATE_TIMEOUT', value)
				}
			},
			momentTimeIn() {
				return moment(this.timeOut).format('lll');
   	 	},
			timeIn() {
				return this.$store.state.timeIn;
			},
			questions: {
				get() {
					return this.$store.state.slide17.questions;
				},
				set(value) {
					this.$store.slide17.commit("UPDATE_QUESTIONS", value);
				},
			},
			answers: {
        get() {
          return this.$store.state.answers
        },
        set(value) {
          this.$store.commit('UPDATE_ANSWERS', value)
        }
      },
			slide01() {
				return this.$store.state.slide01;
			},
			slide05() {
				return this.$store.state.slide05;
			}
		},
	};
</script>

<style scoped>
.centered {
	border: solid #770000 5px;
	border-radius: 1%;
	padding: 10px;
	margin: 0 auto;
	text-align: center;
}
#csf_code_header {
	padding: 4px 19px;
	width: 120px;
	font-style: normal;
	font-weight: normal;
	font-size: 22px;
	text-decoration: none;
	background: #770000;
	color: #ffffff;
	box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.25);
	border-radius: 27px;
}

#code_input {
	display: flex;
	justify-content: center;
	padding: 0 40% !important;
}

#csf_code {
	color: #770000;
	font-size: 40px;
}

</style>
