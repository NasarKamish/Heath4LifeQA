<template>
  <div id="slider_container">
    <Stepper
      :intersect="intersect"
      :onLanding="onLanding"
      :handleCollectAnswers="handleCollectAnswers"
    >
      <Slide01 :intersect="intersect" />
      <Slide02 :intersect="intersect" />
      <Slide03 :intersect="intersect" />
      <Slide04 :intersect="intersect" />
      <Slide05 :intersect="intersect" />
      <Slide06 :intersect="intersect" />
      <Slide07 :intersect="intersect" />
      <Slide08 :intersect="intersect" />
      <Slide09 :intersect="intersect" />
      <Slide10 :intersect="intersect" />
      <Slide11 :intersect="intersect" />
      <Slide12 :intersect="intersect" />
      <Slide13 :intersect="intersect" />
      <Slide14 :intersect="intersect" />
      <Slide15 :intersect="intersect" />
      <Slide16 :intersect="intersect" />
      <Slide17 :intersect="intersect" />
    </Stepper>
  </div>
</template>

<script>
import Stepper from "../components/slots/Stepper";
import Slide01 from "../slides/Slide01";
import Slide02 from "../slides/Slide02";
import Slide03 from "../slides/Slide03";
import Slide04 from "../slides/Slide04";
import Slide05 from "../slides/Slide05";
import Slide06 from "../slides/Slide06";
import Slide07 from "../slides/Slide07";
import Slide08 from "../slides/Slide08";
import Slide09 from "../slides/Slide09";
import Slide10 from "../slides/Slide10";
import Slide11 from "../slides/Slide11";
import Slide12 from "../slides/Slide12";
import Slide13 from "../slides/Slide13";
import Slide14 from "../slides/Slide14";
import Slide15 from "../slides/Slide15";
import Slide16 from "../slides/Slide16";
import Slide17 from "../slides/Slide17";

export default {
  props: ["onLanding"],
  components: {
    Stepper,
    Slide01,
    Slide02,
    Slide03,
    Slide04,
    Slide05,
    Slide06,
    Slide07,
    Slide08,
    Slide09,
    Slide10,
    Slide11,
    Slide12,
    Slide13,
    Slide14,
    Slide15,
    Slide16,
    Slide17,
  },
  computed: {
    timeIn() {
      return this.$store.state.timeIn;
    },
    timeOut() {
      return this.$store.state.timeOut;
    },
    answers: {
      get() {
        return this.$store.state.answers;
      },
      set(value) {
        this.$store.commit("UPDATE_ANSWERS", value);
      },
    },
    photo: {
      get() {
        return this.$store.state.photo;
      },
      set(value) {
        this.$store.commit("UPDATE_PHOTO", value);
      },
    },
    slide01: {
      get() {
        return this.$store.state.slide01.questions;
      },
      set(value) {
        this.$store.slide01.commit("UPDATE_QUESTIONS", value);
      },
    },
    slide02: {
      get() {
        return this.$store.state.slide02.questions;
      },
      set(value) {
        this.$store.slide02.commit("UPDATE_QUESTIONS", value);
      },
    },
    slide03: {
      get() {
        return this.$store.state.slide03.questions;
      },
      set(value) {
        this.$store.slide03.commit("UPDATE_QUESTIONS", value);
      },
    },
    slide04: {
      get() {
        return this.$store.state.slide04.questions;
      },
      set(value) {
        this.$store.slide04.commit("UPDATE_QUESTIONS", value);
      },
    },
    slide05: {
      get() {
        return this.$store.state.slide05.questions;
      },
      set(value) {
        this.$store.slide05.commit("UPDATE_QUESTIONS", value);
      },
    },
    slide06: {
      get() {
        return this.$store.state.slide06.questions;
      },
      set(value) {
        this.$store.slide06.commit("UPDATE_QUESTIONS", value);
      },
    },
    slide07: {
      get() {
        return this.$store.state.slide07.questions;
      },
      set(value) {
        this.$store.slide07.commit("UPDATE_QUESTIONS", value);
      },
    },
    slide08: {
      get() {
        return this.$store.state.slide08.questions;
      },
      set(value) {
        this.$store.slide08.commit("UPDATE_QUESTIONS", value);
      },
    },
    slide09: {
      get() {
        return this.$store.state.slide09.questions;
      },
      set(value) {
        this.$store.slide09.commit("UPDATE_QUESTIONS", value);
      },
    },
    slide10: {
      get() {
        return this.$store.state.slide10.questions;
      },
      set(value) {
        this.$store.slide10.commit("UPDATE_QUESTIONS", value);
      },
    },
    slide11: {
      get() {
        return this.$store.state.slide11.questions;
      },
      set(value) {
        this.$store.slide11.commit("UPDATE_QUESTIONS", value);
      },
    },
    slide12: {
      get() {
        return this.$store.state.slide12.questions;
      },
      set(value) {
        this.$store.slide12.commit("UPDATE_QUESTIONS", value);
      },
    },
    slide13: {
      get() {
        return this.$store.state.slide13.questions;
      },
      set(value) {
        this.$store.slide13.commit("UPDATE_QUESTIONS", value);
      },
    },
    slide14: {
      get() {
        return this.$store.state.slide14.questions;
      },
      set(value) {
        this.$store.slide14.commit("UPDATE_QUESTIONS", value);
      },
    },
    slide15: {
      get() {
        return this.$store.state.slide15.questions;
      },
      set(value) {
        this.$store.slide15.commit("UPDATE_QUESTIONS", value);
      },
    },
    slide16: {
      get() {
        return this.$store.state.slide16.questions;
      },
      set(value) {
        this.$store.slide16.commit("UPDATE_QUESTIONS", value);
      },
    },
    slide17: {
      get() {
        return this.$store.state.slide17.questions;
      },
      set(value) {
        this.$store.slide17.commit("UPDATE_QUESTIONS", value);
      },
    },
  },
  methods: {
    intersect() {
      this.$forceUpdate();
    },
    booleanCheck(value) {
      if (value == "Yes") return true;
      else if (value == "No") return false;
    },
    handleCollectAnswers() {
      this.answers.site_type = this.slide01[0].selected || "N/A";
      this.answers.site_name = this.slide01[1].selected || "N/A";
      this.answers.sub_district = this.slide01[2].text || "N/A";
      this.answers.client_name_and_surname = this.slide01[4].text || "N/A";
      this.answers.counsellor_name = this.slide01[3].selected || "N/A";
      this.answers.time_in = this.timeIn || "N/A";
      this.answers.gender = this.slide02[2].selected || "N/A";
      this.answers.birth_date = this.slide02[3].date || "N/A";
      this.answers.age_at_intake = this.slide02[6].text;
      this.answers.race = this.slide03[0].selected || "N/A";
      this.answers.mobile = this.slide03[1].text || "N/A";
      this.answers.consent_to_sms =
        this.booleanCheck(this.slide03[2].selected) || false;
      this.answers.client_community = this.slide03[3].selected || "N/A";
      this.answers.grade = this.slide02[4].selected || "N/A";
      this.answers.first_time_doing_HIV_test =
        this.booleanCheck(this.slide05[0].selected) || false;
      this.answers.first_time_with_LC =
        this.booleanCheck(this.slide05[1].selected) || false;
      this.answers.consent_to_test =
        this.booleanCheck(this.slide05[6].selected) || false;
      this.answers.scheduled_follow_up_test =
        this.booleanCheck(this.slide05[5].selected) || false;
      this.answers.number_times_tested = this.slide05[2].selected || 0;
      this.answers.last_tested = this.slide05[3].text || "N/A";
      this.answers.last_HIV_test = this.slide05[3].text || "N/A";
      this.answers.last_test_result = this.slide05[4].selected || "N/A";
      this.answers.client_on_TB_med =
        this.booleanCheck(this.slide07[0].selected) || false;
      if (this.slide07[3].selected == "No") {
        this.answers.TB_symptoms = ["No symptoms"];
      } else {
        this.answers.TB_symptoms = this.slide07[1].selected || [];
      }
      this.answers.TB_screening_result = this.slide07[2].selected || "N/A";
      this.answers.blood_contact = this.slide12[4].selected || "N/A";
      this.answers.has_client_ever_had_sex =
        this.booleanCheck(this.slide12[0].selected) || false;
      this.answers.last_had_sex = this.slide12[1].selected || "N/A";
      this.answers.kind_of_sex = this.slide12[2].selected || [];
      this.answers.last_had_unprotected_sex = this.slide12[3].selected || "N/A";
      this.answers.end_of_window_period = this.slide12[5].date || "N/A";
      if (this.slide12[8].selected == "No") {
        this.answers.STI_symptoms = ["No symptoms"];
      } else {
        this.answers.STI_symptoms = this.slide12[6].selected || [];
      }
      this.answers.STI_screening_result = this.slide12[7].selected || "N/A";
      this.answers.recieved_test_results =
        this.booleanCheck(this.slide14[0].selected) || false;
      this.answers.reason_for_no_result = this.slide14[1].text || "N/A";
      this.answers.test1_type = this.slide14[3].text || "N/A";
      this.answers.test1_lot_number = this.slide14[4].text || "N/A";
      this.answers.test2_type = this.slide14[5].text || "N/A";
      this.answers.test2_lot_number = this.slide14[6].text || "N/A";
      this.answers.test3_type = this.slide14[7].text || "N/A";
      this.answers.test3_lot_number = this.slide14[8].text || "N/A";
      this.answers.test1_results = this.slide14[9].selected || "N/A";
      this.answers.test2_results = this.slide14[10].selected || "N/A";
      this.answers.test3_results = this.slide14[11].selected || "N/A";
      this.answers.HIV_test_results = this.slide14[12].selected || "N/A";
      this.answers.risk1_stage = this.slide15[3].selected || "N/A";
      this.answers.risks_number = Number(this.slide15[0].selected) || 0;
      this.answers.maintenance_plan = this.slide15[1].text || "N/A";
      this.answers.client_risk1 = this.slide15[2].selected || "N/A";
      this.answers.client_risk1_stage = this.slide15[3].selected || "N/A";
      this.answers.client_action_plan1 = this.slide15[4].text || "N/A";
      this.answers.client_risk2 = this.slide15[7].selected || "N/A";
      this.answers.client_risk2_stage = this.slide15[9].selected || "N/A";
      this.answers.client_action_plan2 = this.slide15[10].text || "N/A";
      this.answers.client_risk3 = this.slide15[8].selected || "N/A";
      this.answers.client_risk3_stage = this.slide15[11].selected || "N/A";
      this.answers.client_action_plan3 = this.slide15[12].text || "N/A";
      this.answers.what_steps = this.slide15[5].selected || [];
      this.answers.step1_action_plan = this.slide15[6].answers[0].text || "N/A";
      this.answers.step2_action_plan = this.slide15[6].answers[1].text || "N/A";
      this.answers.step3_action_plan = this.slide15[6].answers[2].text || "N/A";
      this.answers.step4_action_plan = this.slide15[6].answers[3].text || "N/A";
      this.answers.referred =
        this.booleanCheck(this.slide16[0].selected) || false;
      if (this.slide16[1].selected) {
        if (this.slide16[1].selected.includes("Other")) {
          this.slide16[1].selected.splice(
            this.slide16[1].selected.indexOf("Other"),
            1,
            this.slide16[3].text
          );
          this.answers.referral_point = this.slide16[1].selected;
        } else {
          this.answers.referral_point = this.slide16[1].selected;
        }
      } else {
        this.answers.referral_point = [];
      }
      if (this.slide16[2].selected) {
        if (this.slide16[2].selected.includes("Other")) {
          this.slide16[2].selected.splice(
            this.slide16[2].selected.indexOf("Other"),
            1,
            this.slide16[4].text
          );
          this.answers.referral_reason = this.slide16[2].selected;
        } else {
          this.answers.referral_reason = this.slide16[2].selected;
        }
      } else {
        this.answers.referral_reason = [];
      }
      this.answers.follow_up_required =
        this.booleanCheck(this.slide17[0].selected) || false;
      this.answers.follow_up_reason = this.slide17[1].text || "N/A";
      this.answers.follow_up_date = this.slide17[2].date || "N/A";
      this.answers.signature = this.photo;
      this.answers.time_out = this.timeOut;
    },
  },
};
</script>

<style>
.required {
  color: red;
  font-size: 22px;
}
.image-container {
  margin: auto;
  max-width: 220px;
  max-height: 200px;
}
.explaination-text {
  margin: auto;
  padding: 30px 20px;
  text-align: center;
  color: #770000;
}
.v-text-field.v-text-field--enclosed {
  margin: 10px 0 0 0 !important;
}
</style>
