<template>
  <div id="entries">
    <Navbar />
    <div id="content">
      <h1>Records</h1>
      <v-card id="table">
        <v-card-title>
          <v-text-field
            id="search"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="entries"
          :items-per-page="5"
          :search="search"
        ></v-data-table>
      </v-card>
      <div id="excel-btns">
        <DownloadExcel
          style="margin: 10px"
          :data="entries"
          type="csv"
					:escapeCsv="false" 
          :fields="field_titles"
					:meta="json_meta"
          >
          <v-btn color=" #F6E1E1" class="download"
          style="background: #FFFFFF ; color: #770000"
        >
            Download all data (CSV)
          <v-icon>mdi-download</v-icon>
          </v-btn>
        </DownloadExcel>
        <DownloadExcel 
					v-if="monthData.length > 0"
          style="margin: 10px"
          :data="monthData"
          type="csv"
					:escapeCsv="false"
					:meta="json_meta"
          :fields="field_titles"
				>
          <v-btn color=" #F6E1E1" class="download"
          style="background: #FFFFFF ; color: #770000"
        >
            Get {{ lastMonth }} Month (CSV)
          <v-icon>mdi-download</v-icon>
          </v-btn>
        </DownloadExcel>
      </div>
    </div>
    <v-row justify="center" style="position: absolute">
			<v-overlay :z-index="zIndex" :value="overlay">
				<v-progress-circular
					:size="75"
					color="#770000"
					indeterminate
				></v-progress-circular>
			</v-overlay>
		</v-row>
		<v-snackbar v-model="disruption">
			Something went wrong, check for invalid inputs.
			<template v-slot:action="{ attrs }">
				<v-btn text v-bind="attrs" @click="disruption = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
		<Footer />
	</div>
</template>

<script>
	import moment from "moment";
	import Navbar from "../components/Navbar";
	import Footer from "../components/Footer";
	// import JsonCSV from 'vue-json-csv'
	import Vue from "vue";
	import JsonExcel from "vue-json-excel";

	Vue.component("DownloadExcel", JsonExcel);

	Vue.config.ignoredElements = ["test"];

	export default {
		name: "Exports",
		components: { Navbar, Footer },
		data() {
			return {
				search: "",
				monthData: [],
				overlay: false,
				lastMonth: moment(Date.now()).subtract(1, 'months').format('LL').split(' ').splice(0, 1).join(''),
				disruption: false,
				zIndex: 0,
				json_meta: [
					[
						{
							key: "charset",
							value: "utf-8",
						},
					],
				],
				field_titles: {
					"Site name": "site_name",
					"Site type": "site_type",
					"Sub district": "sub_district",
					Date: "date",
					"Counsellor name": "counsellor_name",
					"Time in": "time_in",
					"Client name and surname": "client_name_and_surname",
					Gender: "gender",
					Birthdate: "birth_date",
					"Age at intake": "age_at_intake",
					Grade: "grade",
					Race: "race",
					Mobile: "mobile",
					"Consent to sms": "consent_to_sms",
					"Client community": "client_community",
					"First time doing an HIV test": "first_time_doing_HIV_test",
					"First time with Life Choices": "first_time_with_LC",
					"N times tested": "number_times_tested",
					"Last HIV test": "last_HIV_test",
					"Last test result": "last_test_result",
					"Is this a scheduled follow up test?": "scheduled_follow_up_test",
					"TB screening result": "TB_screening_result",
					"Has client ever had sex": "has_client_ever_had_sex",
					"Last had unprotected sex": "last_had_unprotected_sex",
					"Blood contact": "blood_contact",
					"STI screening result": "STI_screening_result",
					"Time out": "time_out",
					"Last name": "sales_force_client_code",
					"Salesforce Client Code": "sales_force_client_code",
					"Received test results": "received_test_results",
					"Reason for no test result": "reason_for_no_result",
					"HIV test result": "HIV_test_results",
					"Maintenance plan": "maintenance_plan",
					"Negative client risk 1": "client_risk1",
					"Negative client risk 2": "client_risk2",
					"Negative client risk 3": "client_risk3",
					"Negative client risk 1 stage": "client_risk1_stage",
					"Negative client risk 2 stage": "client_risk2_stage",
					"Negative client risk 3 stage": "client_risk3_stage",
					"Negative client risk 1 plan": "client_action_plan1",
					"Negative client risk 2 plan": "client_action_plan2",
					"Negative client risk 3 plan": "client_action_plan3",
					Referral: "referred",
					"Referral point": "referral_point",
					"Why was the client referred": "referral_reason",
					"End of window period": "end_of_window_period",
					"Follow up required": "follow_up_required",
					"Reason for follow up": "follow_up_reason",
					"Follow up date": "follow_up_date",
				},
				headers: [
					{
						text: "Site name",
						value: "site_name",
						width: "180",
						divider: true,
					},
					{
						text: "Site type",
						value: "site_type",
						width: "180",
						divider: true,
					},
					{
						text: "Sub district",
						value: "sub_district",
						width: "180",
						divider: true,
					},
					{ text: "Date", value: "date", width: "180", divider: true },
					{
						text: "Counsellor name",
						value: "counsellor_name",
						width: "180",
						divider: true,
					},
					{ text: "Time in", value: "time_in", width: "180", divider: true },
					{
						text: "Client name and surname",
						value: "client_name_and_surname",
						width: "240",
						divider: true,
					},
					{ text: "Gender", value: "gender", width: "180", divider: true },
					{
						text: "Birthdate",
						value: "birth_date",
						width: "180",
						divider: true,
					},
					{
						text: "Age at intake",
						value: "age_at_intake",
						width: "180",
						divider: true,
					},
					{ text: "Grade", value: "grade", width: "180", divider: true },
					{ text: "Race", value: "race", width: "180", divider: true },
					{ text: "Mobile", value: "mobile", width: "180", divider: true },
					{
						text: "Consent to sms",
						value: "consent_to_sms",
						width: "180",
						divider: true,
					},
					{
						text: "Client community",
						value: "client_community",
						width: "180",
						divider: true,
					},
					{
						text: "First time doing an HIV test",
						value: "first_time_doing_HIV_test",
						width: "280",
						divider: true,
					},
					{
						text: "First time with Life Choices",
						value: "first_time_with_LC",
						width: "280",
						divider: true,
					},
					{
						text: "N times tested",
						value: "number_times_tested",
						width: "240",
						divider: true,
					},
					{
						text: "Last HIV test",
						value: "last_HIV_test",
						width: "180",
						divider: true,
					},
					{
						text: "Last test result",
						value: "last_test_result",
						width: "180",
						divider: true,
					},
					{
						text: "Is this a scheduled follow up test?",
						value: "scheduled_follow_up_test",
						width: "260",
						divider: true,
					},
					{
						text: "TB screening result",
						value: "TB_screening_result",
						width: "180",
						divider: true,
					},
					{
						text: "Has client ever had sex",
						value: "has_client_ever_had_sex",
						width: "240",
						divider: true,
					},
					{
						text: "Last had unprotected sex",
						value: "last_had_unprotected_sex",
						width: "240",
						divider: true,
					},
					{
						text: "Blood contact",
						value: "blood_contact",
						width: "180",
						divider: true,
					},
					{
						text: "STI screening result",
						value: "STI_screening_result",
						width: "180",
						divider: true,
					},
					{ text: "Time out", value: "time_out", width: "180", divider: true },
					{
						text: "Last name",
						value: "sales_force_client_code",
						width: "240",
						divider: true,
					},
					{
						text: "Salesforce Client Code",
						value: "sales_force_client_code",
						width: "240",
						divider: true,
					},
					{
						text: "Received test results",
						value: "received_test_results",
						width: "180",
						divider: true,
					},
					{
						text: "Reason for no test result",
						value: "reason_for_no_result",
						width: "240",
						divider: true,
					},
					{
						text: "HIV test result",
						value: "HIV_test_results",
						width: "180",
						divider: true,
					},
					{
						text: "Maintenance plan",
						value: "maintenance_plan",
						width: "180",
						divider: true,
					},
					{
						text: "Negative client risk 1",
						value: "client_risk1",
						width: "180",
						divider: true,
					},
					{
						text: "Negative client risk 2",
						value: "client_risk2",
						width: "180",
						divider: true,
					},
					{
						text: "Negative client risk 3",
						value: "client_risk3",
						width: "180",
						divider: true,
					},
					{
						text: "Negative client risk 1 stage",
						value: "client_risk1_stage",
						width: "280",
						divider: true,
					},
					{
						text: "Negative client risk 2 stage",
						value: "client_risk2_stage",
						width: "280",
						divider: true,
					},
					{
						text: "Negative client risk 3 stage",
						value: "client_risk3_stage",
						width: "280",
						divider: true,
					},
					{
						text: "Negative client risk 1 plan",
						value: "client_action_plan1",
						width: "280",
						divider: true,
					},
					{
						text: "Negative client risk 2 plan",
						value: "client_action_plan2",
						width: "280",
						divider: true,
					},
					{
						text: "Negative client risk 3 plan",
						value: "client_action_plan3",
						width: "280",
						divider: true,
					},
					// {
					// 	text: "Pos client step 1 action plan",
					// 	value: "step1_action_plan",
					// 	width: "220",
					// 	divider: true,
					// },
					// {
					// 	text: "Pos client step 2 action plan",
					// 	value: "step2_action_plan",
					// 	width: "220",
					// 	divider: true,
					// },
					// {
					// 	text: "Pos client step 3 action plan",
					// 	value: "step3_action_plan",
					// 	width: "220",
					// 	divider: true,
					// },
					// {
					// 	text: "Pos client step 4 action plan",
					// 	value: "step4_action_plan",
					// 	width: "220",
					// 	divider: true,
					// },
					{ text: "Referral", value: "referred", width: "180", divider: true },
					{
						text: "Referral Point",
						value: "referral_point",
						width: "200",
						divider: true,
					},
					{
						text: "Why was the client referred",
						value: "referral_reason",
						width: "220",
						divider: true,
					},
					{
						text: "End of window period",
						value: "end_of_window_period",
						width: "200",
						divider: true,
					},
					{
						text: "Follow up required",
						value: "follow_up_required",
						width: "200",
						divider: true,
					},
					{
						text: "Reason for follow up",
						value: "follow_up_reason",
						width: "200",
						divider: true,
					},
					{ text: "Follow up date", value: "follow_up_date", width: "200" },
				],
				entries: [],
			};
		},
		methods: {
			enumerateDaysBetweenDates(startDate, endDate) {
				var dates = [];

				var currDate = moment(startDate).startOf("day");
				var lastDate = moment(endDate).startOf("day");

      while (currDate.add(1, "days").diff(lastDate) < 0) {
        dates.push(moment(currDate.clone().toDate()).format("L"));
      }
      this.days = dates;
    },
    handlePrepareMonthsCSV() {
      let dateFrom = moment(Date.now()).subtract(1, 'months').format('YYYY-MM-DD');
      const numOfDays = moment(dateFrom).daysInMonth();
			const numOfSubDays = moment(dateFrom).daysInMonth() - 1;
      dateFrom = dateFrom.substr(0, 7) + `-${numOfDays}`;
      dateFrom = dateFrom.replace(/-/g, "/");

					let firstDay = moment(dateFrom)
					.subtract(numOfSubDays, 'days')
					.format("YYYY-MM-DD");

				for (let i = 0; i < this.entries.length; i++) {
					let currentDate = moment(this.entries[i].date).format("YYYY-MM-DD");
					if (
						currentDate.replace(/-/g, "/") >= firstDay.replace(/-/g, "/") &&
						currentDate.replace(/-/g, "/") <= dateFrom
					) {
						this.monthData.push(this.entries[i]);
					}
				}
			},

			getEntries() {
				this.overlay = true;
				let URL = "https://health4life-api.herokuapp.com/api/surveys";
				let token = window.localStorage.getItem("hct-token");
				fetch(URL, {
					method: "GET",
					mode: "cors",
					headers: {
						'h4l-token': token
					}
				})
					.then((response) => response.json())
					.then(async (json) => {
						if (json.errors || json.msg) {
							this.overlay = false;
							this.disruption = true;
						} else {
							for (let i = 0; i < json.length; i++) {
								// Formating true to binary true
								if (json[i].first_time_doing_HIV_test == true)
									json[i].first_time_doing_HIV_test = 1;
								if (json[i].first_time_with_LC == true)
									json[i].first_time_with_LC = 1;
								if (json[i].blood_contact == true) json[i].blood_contact = 1;
								if (json[i].referred == true) json[i].referred = 1;

								// Formating false to binary value
								if (json[i].first_time_doing_HIV_test == false)
									json[i].first_time_doing_HIV_test = 0;
								if (json[i].first_time_with_LC == false)
									json[i].first_time_with_LC = 0;
								if (json[i].blood_contact == false) json[i].blood_contact = 0;
								if (json[i].referred == false) json[i].referred = 0;

								if (json[i].consent_to_sms == false) 
									json[i].consent_to_sms = "No"
								if (json[i].scheduled_follow_up_test == false)
									json[i].scheduled_follow_up_test = "No";
								if (json[i].has_client_ever_had_sex == false)
									json[i].has_client_ever_had_sex = "No";
								if (json[i].received_test_results == false)
									json[i].received_test_results = "No";
								if (json[i].follow_up_required == false)
									json[i].follow_up_required = "No (client closed)";

								if (json[i].scheduled_follow_up_test == true)
									json[i].scheduled_follow_up_test = "Yes";
								if (json[i].consent_to_sms == true)
									json[i].consent_to_sms = "Yes"
								if (json[i].has_client_ever_had_sex == true)
									json[i].has_client_ever_had_sex = "Yes";
								if (json[i].received_test_results == true)
									json[i].received_test_results = "Yes";
								if (json[i].follow_up_required == true)
									json[i].follow_up_required = "Yes";

								if (json[i].last_test_result == "Negative")
									json[i].last_test_result = "Neg";
								if (json[i].last_test_result == "Positive")
									json[i].last_test_result = "Pos";

								if (json[i].TB_screening_result == "Negative")
									json[i].TB_screening_result = "Neg";
								if (json[i].STI_screening_result == "Negative")
									json[i].STI_screening_result = "Neg";
								if (json[i].HIV_test_results == "Negative")
									json[i].HIV_test_results = "Neg";

								if (json[i].TB_screening_result == "Positive")
									json[i].TB_screening_result = "Pos";
								if (json[i].STI_screening_result == "Positive")
									json[i].STI_screening_result = "Neg";
								if (json[i].HIV_test_results == "Positive")
									json[i].HIV_test_results = "Pos";

								// Formatting N/A to empty string
								if (json[i].sub_district == "N/A") json[i].sub_district = "";
								if (json[i].last_HIV_test == "N/A") json[i].last_HIV_test = "";
								if (json[i].last_HIV_result == "N/A")
									json[i].last_HIV_result = "";
								if (json[i].last_test_result == "N/A")
									json[i].last_test_result = "";
								if (json[i].last_had_unprotected_sex == "N/A")
									json[i].last_had_unprotected_sex = "";
								if (json[i].reason_for_no_result == "N/A")
									json[i].reason_for_no_result = "";
								if (json[i].what_steps == "N/A") json[i].what_steps = "";
								// if (json[i].step1_action_plan == "N/A")
								// 	json[i].step1_action_plan = "";
								// if (json[i].step2_action_plan == "N/A")
								// 	json[i].step2_action_plan = "";
								// if (json[i].step3_action_plan == "N/A")
								// 	json[i].step3_action_plan = "";
								// if (json[i].step4_action_plan == "N/A")
								// 	json[i].step4_action_plan = "";
								if (json[i].test1_type == "N/A") json[i].test1_type = "";
								if (json[i].test2_type == "N/A") json[i].test2_type = "";
								if (json[i].test3_type == "N/A") json[i].test3_type = "";
								if (json[i].test1_lot_number == "N/A")
									json[i].test1_lot_number = "";
								if (json[i].test2_lot_number == "N/A")
									json[i].test2_lot_number = "";
								if (json[i].test3_lot_number == "N/A")
									json[i].test3_lot_number = "";
								if (json[i].test1_results == "N/A") json[i].test1_results = "";
								if (json[i].test2_results == "N/A") json[i].test2_results = "";
								if (json[i].test3_results == "N/A") json[i].test3_results = "";
								if (json[i].maintenance_plan == "N/A")
									json[i].maintenance_plan = "";
								if (json[i].client_risk1 == "N/A") json[i].client_risk1 = "";
								if (json[i].client_risk2 == "N/A") json[i].client_risk2 = "";
								if (json[i].client_risk3 == "N/A") json[i].client_risk3 = "";
								if (json[i].client_risk1_stage == "N/A")
									json[i].client_risk1_stage = "";
								if (json[i].client_risk2_stage == "N/A")
									json[i].client_risk2_stage = "";
								if (json[i].client_risk3_stage == "N/A")
									json[i].client_risk3_stage = "";
								if (json[i].client_action_plan1 == "N/A")
									json[i].client_action_plan1 = "";
								if (json[i].client_action_plan2 == "N/A")
									json[i].client_action_plan2 = "";
								if (json[i].client_action_plan3 == "N/A")
									json[i].client_action_plan3 = "";
								if (json[i].referral_point == "N/A")
									json[i].referral_point = "";
								if (json[i].referral_reason == "N/A")
									json[i].referral_reason = "";
								if (json[i].end_of_window_period == "N/A")
									json[i].end_of_window_period = "";
								if (json[i].follow_up_reason == "N/A")
									json[i].follow_up_reason = "";
								if (json[i].follow_up_date == "N/A")
									json[i].follow_up_date = "";

								// Array formatting

								if (json[i].referral_point) {
									json[i].referral_point = json[i].referral_point.toString();
									if(json[i].referral_point.includes(',')) {
											json[i].referral_point = json[i].referral_point.replace(',', ';')
									}
								}

								if (json[i].referral_reason) {
									json[i].referral_reason = json[i].referral_reason.toString();
									if(json[i].referral_reason.includes(',')) {
										json[i].referral_reason = json[i].referral_reason.replace(',', ';')
									}
								}

								json[i].gender = json[i].gender.split('').splice(0, 1);

								// Formating Dates
								json[i].date = moment(json[i].date).format("YYYY/MM/DD");

								json[i].birth_date = moment(json[i].birth_date).format(
									"YYYY/MM/DD"
								);

								if (json[i].end_of_window_period != "") {
									json[i].end_of_window_period = moment(json[i].end_of_window_period).format(
										"YYYY/MM/DD"
									);
								}
								if (json[i].follow_up_date != "") {
									json[i].follow_up_date = moment(json[i].follow_up_date).format(
										"YYYY/MM/DD"
									);
								}

								json[i].time_in =
									moment(json[i].time_in).format("YYYY/MM/DD") +
									" " +
									moment(json[i].time_in).format("LT");
								json[i].time_out =
									moment(json[i].time_out).format("YYYY/MM/DD") +
									" " +
									moment(json[i].time_out).format("LT");
							}
							this.entries = await json;
							this.handlePrepareMonthsCSV();
							this.overlay = false;
						}
					})
					.catch((err) => console.log("err: ", err));
			},
		},
		created() {
			this.getEntries();
		},
	};
</script>
<style scoped>

@media (max-width: 480px) {
	#entries {
		position: absolute;
	}
  #content {
		width: 125%;
    margin: 50px 0px !important;
		width: 100% !important;
  }

	#table {
		margin: 0px !important;
		padding: 0px !important;
		width: 100% !important;
	}
	#excel-btns {
		margin: 10px auto;
	}
}

#content {
	top: 150px;
	margin: 50px;
	padding: 20px;
	justify-content: center;
	color: #770000;
	text-align: center;
}

#table {
	margin: 10px;
	padding: 10px;
	/* background: #F6E1E1;
	color: #770000; */
}
#search {
  background:  #F6E1E1;
  border: 1px solid #770000;
  color: #770000;
  border-radius: 15px;
}
#excel-btns {
  display: inline-flex;
}
#table .cursor:hover {
  cursor: pointer;
  color: #F6E1E1;
}
.buttons{
  display: flex;
  justify-content: space-between;
}
</style>
