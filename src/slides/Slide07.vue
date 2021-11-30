<template>
	<v-stepper-content step="7">
		<v-form v-if="page == 7" ref="form" v-model="valid">
			<label>{{ questions[0].label }}<span class="required">*</span></label>
			<Radio :fields="questions[0]" :intersect="intersect" />
			<div v-if="questions[0].selected == 'No'">
				<label>{{ questions[3].label }}<span class="required">*</span></label>
				<Radio :fields="questions[3]" :intersect="intersect" /> 
				<div v-if="questions[3].selected == 'Yes'">
					<v-col
						cols="12"
						xs="12"
						sm="12"
						md="6"
						lg="6"
						xl="6"
					>
						<label>{{ questions[1].label }}<span class="required">*</span></label>
						<Select :fields="questions[1]" multiple :intersect="intersect" />
					</v-col>
				</div>
			</div>
			<div v-if="questions[0].selected">
				<br>
				<div v-if="questions[3].selected == 'No'">
					<v-chip
						color="#770000"
						outlined
						text-color="#770000"
						label
					>
						<h2>Results show screening is Negative.</h2>
					</v-chip>
				</div>
				<div v-if="questions[1].selected">
					<div v-if="questions[1].selected.length > 0">
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
				<div v-if="questions[0].selected == 'Yes'">
					<label>{{ questions[2].label }}<span class="required">*</span></label>
					<p><v-chip class="ma-2" color="#770000" outlined>N/A</v-chip></p>
				</div>
			</div>
		</v-form>
	</v-stepper-content>
</template>

<script>
	import Radio from "../components/inputs/Radio";
	import Select from "../components/inputs/Select";

	export default {
		components: {
			Radio,
			Select,
		},
		data() {
			return {
				valid : true
			};
		},
		methods: {
			validate() {
      	this.$refs.form.validate();
    	},
			intersect() {
				this.$forceUpdate();
			},
		},
		updated() {
			if (this.questions[0].selected == "Yes") {
				this.questions[1].selected = undefined;
				this.questions[3].selected = undefined;
				this.questions[2].selected = "N/A";
			}

			if (this.questions[3].selected == "No") {
				this.questions[1].selected = undefined;
				this.questions[2].selected = "Negative";
			}

			if (this.questions[3].selected == 'Yes') {
				if (this.questions[1].selected != undefined) {
					if (this.questions[1].selected.length > 0) {
						this.questions[2].selected = "Positive";
					}
				} if (this.questions[1].selected == undefined || this.questions[1].selected.length == 0) {
					this.questions[2].selected = undefined;
				}
			}

			// Checking Validation
			if (this.page == 7) {
				if (this.questions[0].selected) {
					if (!this.validation_fail){
						this.validation_fail = false;
					}
				} else {
					this.validation_fail = true;
				}
				if (this.questions[0].selected == "Yes") {
					if(!this.validation_fail){
						this.validation_fail = false;
					}
				} else {
					this.validation_fail = true;
				}
				if (this.questions[0].selected == "No") {
					this.validation_fail = false;
					if (this.questions[3].selected) {
						if (!this.validation_fail) {
							this.validation_fail = false;
						}
						if (this.questions[3].selected == "No"){
							if (this.questions[2].selected
							){
								if (!this.validation_fail){
									this.validation_fail = false;
								}
							} else {
								this.validation_fail = true;
							}
						}
						if (this.questions[3].selected == "Yes") {
							if (this.questions[1].selected
							&& this.questions[2].selected) {
								if (!this.validation_fail){
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
			}
		},
		created() {
			// Checking Validation
			if (this.page == 7) {
				if (this.questions[0].selected) {
					if (!this.validation_fail){
						this.validation_fail = false;
					}
				} else {
					this.validation_fail = true;
				}
				if (this.questions[0].selected == "Yes") {
					if(!this.validation_fail){
						this.validation_fail = false;
					}
				} else {
					this.validation_fail = true;
				}
				if (this.questions[0].selected == "No") {
					this.validation_fail = false;
					if (this.questions[3].selected) {
						if (!this.validation_fail) {
							this.validation_fail = false;
						}
						if (this.questions[3].selected == "No"){
							if (this.questions[2].selected
							){
								if (!this.validation_fail){
									this.validation_fail = false;
								}
							} else {
								this.validation_fail = true;
							}
						}
						if (this.questions[3].selected == "Yes") {
							if (this.questions[1].selected
							&& this.questions[2].selected) {
								if (!this.validation_fail){
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
			questions: {
				get() {
					return this.$store.state.slide07.questions;
				},
				set(value) {
					this.$store.slide07.commit("UPDATE_QUESTIONS", value);
				},
			},
			// tb_default: {
			// 	get() {
			// 		return this.$store.state.tb_default;
			// 	},
			// 	set(value) {
			// 		this.$store.commit("UPDATE_TBDEFAULT", value);
			// 	},
			// },
		},
	};
</script>

<style scoped></style>
