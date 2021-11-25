const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const { v4 } = require('uuid');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

//@route GET api/surveys/:id
//@desc get survey entries
//@access Public
router.get('/', auth, async (req, res) => {
    try {
        let user = await knex.select().from('users').then((user) => { return user[0] });
        if (user.role === 'admin') {
            knex.select()
                .from('surveys').then((surveys) => {
                    res.send(surveys)
                })
        } else {
            res.status(401);
            return res.send("Access Rejected, Not Authorized");
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error")
    }
});

//@route Post api/survey
//@desc Add new survey
//@access Private
router.post('/', [
    check('counsellor_name', 'Counsellor name is required')
        .not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let {
            site_name,
            site_type,
            sub_district,
            date,
            time_in,
            counsellor_name,
            client_name_and_surname,
            gender,
            birth_date,
            last_tested,
            age_at_intake,
            grade,
            race,
            mobile,
            consent_to_sms,
            client_community,
            first_time_doing_HIV_test,
            first_time_with_LC,
            number_times_tested,
            last_HIV_test,
            last_test_result,
            scheduled_follow_up_test,
            signature,
            client_on_TB_med,
            TB_symptoms,
            TB_screening_result,
            has_client_ever_had_sex,
            kind_of_sex,
            last_had_unprotected_sex,
            blood_contact,
            STI_symptoms,
            STI_screening_result,
            time_out,
            sales_force_client_code,
            received_test_results,
            reason_for_no_result,
            risks_number,
            what_steps,
            step1_action_plan,
            step2_action_plan,
            step3_action_plan,
            step4_action_plan,
            HIV_test_results,
            test1_type,
            test1_lot_number,
            test1_results,
            test2_type,
            test2_lot_number,
            test2_results,
            test3_type,
            test3_lot_number,
            test3_results,
            maintenance_plan,
            client_risk1,
            client_risk2,
            client_risk3,
            client_risk1_stage,
            client_risk2_stage,
            client_risk3_stage,
            referred,
            referral_point,
            referral_reason,
            end_of_window_period,
            follow_up_required,
            follow_up_reason,
            follow_up_date,
            // user_id = knex.from('users').select('id')
        } = req.body;

				if (site_type === "School") {
					const oldRecord = await knex.select().from('surveys').where('client_name_and_surname', client_name_and_surname).where('birth_date', birth_date);
					if (oldRecord.length > 0) {
							sales_force_client_code = oldRecord[0].sales_force_client_code;
							const recordOR = {
								id: v4(),
								site_name,
								site_type,
								sub_district,
								date,
								time_in,
								counsellor_name,
								client_name_and_surname,
								gender,
								birth_date,
								last_tested,
								age_at_intake,
								grade,
								race,
								mobile,
								consent_to_sms,
								client_community,
								first_time_doing_HIV_test,
								first_time_with_LC,
								number_times_tested,
								last_HIV_test,
								last_test_result,
								scheduled_follow_up_test,
								signature,
								client_on_TB_med,
								TB_symptoms,
								TB_screening_result,
								has_client_ever_had_sex,
								kind_of_sex,
								last_had_unprotected_sex,
								blood_contact,
								STI_symptoms,
								STI_screening_result,
								time_out,
								sales_force_client_code,
								received_test_results,
								reason_for_no_result,
								risks_number,
								what_steps,
								step1_action_plan,
								step2_action_plan,
								step3_action_plan,
								step4_action_plan,
								HIV_test_results,
								test1_type,
								test1_lot_number,
								test1_results,
								test2_type,
								test2_lot_number,
								test2_results,
								test3_type,
								test3_lot_number,
								test3_results,
								maintenance_plan,
								client_risk1,
								client_risk2,
								client_risk3,
								client_risk1_stage,
								client_risk2_stage,
								client_risk3_stage,
								referred,
								referral_point,
								referral_reason,
								end_of_window_period,
								follow_up_required,
								follow_up_reason,
								follow_up_date,
								// user_id
							}

						knex('surveys').insert(recordOR)
							.then(function () {
								res.json({ msg: "Survey added!, reused client code" });
						})
					} else {
						const site = await knex.select().from('sites').where('site_name', site_name);
						sales_force_client_code = site[0].site_code + String(Number(site[0].code_number) + 1);
						const recordSite = {
							id: v4(),
							site_name,
							site_type,
							sub_district,
							date,
							time_in,
							counsellor_name,
							client_name_and_surname,
							gender,
							birth_date,
							last_tested,
							age_at_intake,
							grade,
							race,
							mobile,
							consent_to_sms,
							client_community,
							first_time_doing_HIV_test,
							first_time_with_LC,
							number_times_tested,
							last_HIV_test,
							last_test_result,
							scheduled_follow_up_test,
							signature,
							client_on_TB_med,
							TB_symptoms,
							TB_screening_result,
							has_client_ever_had_sex,
							kind_of_sex,
							last_had_unprotected_sex,
							blood_contact,
							STI_symptoms,
							STI_screening_result,
							time_out,
							sales_force_client_code,
							received_test_results,
							reason_for_no_result,
							risks_number,
							what_steps,
							step1_action_plan,
							step2_action_plan,
							step3_action_plan,
							step4_action_plan,
							HIV_test_results,
							test1_type,
							test1_lot_number,
							test1_results,
							test2_type,
							test2_lot_number,
							test2_results,
							test3_type,
							test3_lot_number,
							test3_results,
							maintenance_plan,
							client_risk1,
							client_risk2,
							client_risk3,
							client_risk1_stage,
							client_risk2_stage,
							client_risk3_stage,
							referred,
							referral_point,
							referral_reason,
							end_of_window_period,
							follow_up_required,
							follow_up_reason,
							follow_up_date,
							// user_id
						}
						knex('sites').where('id', site[0].id)
							.update({ code_number: String(Number(site[0].code_number) + 1) }).then(function () {
								knex('surveys').insert(recordSite)
									.then(function () {
										res.json({ msg: "Survey added!"});
								})
							})
					}
				} 
				if (site_type === "Community") {
					const comm = await knex.select().from('comm_number');
					sales_force_client_code = "COMM" + String(Number(comm[0].code_number) + 1);
						const recordComm = {
							id: v4(),
							site_name,
							site_type,
							sub_district,
							date,
							time_in,
							counsellor_name,
							client_name_and_surname,
							gender,
							birth_date,
							last_tested,
							age_at_intake,
							grade,
							race,
							mobile,
							consent_to_sms,
							client_community,
							first_time_doing_HIV_test,
							first_time_with_LC,
							number_times_tested,
							last_HIV_test,
							last_test_result,
							scheduled_follow_up_test,
							signature,
							client_on_TB_med,
							TB_symptoms,
							TB_screening_result,
							has_client_ever_had_sex,
							kind_of_sex,
							last_had_unprotected_sex,
							blood_contact,
							STI_symptoms,
							STI_screening_result,
							time_out,
							sales_force_client_code,
							received_test_results,
							reason_for_no_result,
							risks_number,
							what_steps,
							step1_action_plan,
							step2_action_plan,
							step3_action_plan,
							step4_action_plan,
							HIV_test_results,
							test1_type,
							test1_lot_number,
							test1_results,
							test2_type,
							test2_lot_number,
							test2_results,
							test3_type,
							test3_lot_number,
							test3_results,
							maintenance_plan,
							client_risk1,
							client_risk2,
							client_risk3,
							client_risk1_stage,
							client_risk2_stage,
							client_risk3_stage,
							referred,
							referral_point,
							referral_reason,
							end_of_window_period,
							follow_up_required,
							follow_up_reason,
							follow_up_date,
							// user_id
						}
					knex('comm_number').where('id', comm[0].id)
						.update({ code_number: String(Number(comm[0].code_number) + 1) }).then(function () {
						knex('surveys').insert(recordComm)
							.then(function () {
								res.json({ msg: "Survey added!, community count updated"});
						})
					})
				}
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

//@route update api/surveys/:id
//@desc Update survey by id
//@access Private
router.put('/:id', auth, async (req, res) => {
	try {
		let user = await knex.select().from('users').then((user) => { return user[0] });
		if (user.role === 'admin') {
				let {
					site_name,
					site_type,
					sub_district,
					date,
					time_in,
					counsellor_name,
					client_name_and_surname,
					gender,
					birth_date,
					last_tested,
					age_at_intake,
					grade,
					race,
					mobile,
					consent_to_sms,
					client_community,
					first_time_doing_HIV_test,
					first_time_with_LC,
					number_times_tested,
					last_HIV_test,
					last_test_result,
					scheduled_follow_up_test,
					signature,
					client_on_TB_med,
					TB_symptoms,
					TB_screening_result,
					has_client_ever_had_sex,
					kind_of_sex,
					last_had_unprotected_sex,
					blood_contact,
					STI_symptoms,
					STI_screening_result,
					time_out,
					sales_force_client_code,
					received_test_results,
					reason_for_no_result,
					risks_number,
					what_steps,
					step1_action_plan,
					step2_action_plan,
					step3_action_plan,
					step4_action_plan,
					HIV_test_results,
					test1_type,
					test1_lot_number,
					test1_results,
					test2_type,
					test2_lot_number,
					test2_results,
					test3_type,
					test3_lot_number,
					test3_results,
					maintenance_plan,
					client_risk1,
					client_risk2,
					client_risk3,
					client_risk1_stage,
					client_risk2_stage,
					client_risk3_stage,
					referred,
					referral_point,
					referral_reason,
					end_of_window_period,
					follow_up_required,
					follow_up_reason,
					follow_up_date,
					// user_id = knex.from('users').select('id')
					updated_at = new Date(),
				} = req.body;

				const updateSurvey = {};
				if (site_name) updateSurvey.site_name = site_name;
				if (site_type) updateSurvey.site_type = site_type;
				if (sub_district) updateSurvey.sub_district = sub_district;
				if (date) updateSurvey.date = date;
				if (time_in) updateSurvey.time_in = time_in;
				if (counsellor_name) updateSurvey.counsellor_name = counsellor_name;
				if (client_name_and_surname) updateSurvey.client_name_and_surname = client_name_and_surname;
				if (gender) updateSurvey.gender = gender;
				if (birth_date) updateSurvey.birth_date = birth_date;
				if (last_tested) updateSurvey.last_tested = last_tested;
				if (age_at_intake) updateSurvey.age_at_intake = age_at_intake;
				if (grade) updateSurvey.grade = grade;
				if (race) updateSurvey.race = race;
				if (mobile) updateSurvey.mobile = mobile;
				if (consent_to_sms) updateSurvey.consent_to_sms = consent_to_sms;
				if (client_community) updateSurvey.client_community = client_community;
				if (first_time_doing_HIV_test) updateSurvey.first_time_doing_HIV_test = first_time_doing_HIV_test;
				if (first_time_with_LC) updateSurvey.first_time_with_LC = first_time_with_LC;
				if (number_times_tested) updateSurvey.number_times_tested = number_times_tested;
				if (last_HIV_test) updateSurvey.last_HIV_test = last_HIV_test;
				if (last_test_result) updateSurvey.last_test_result = last_test_result;
				if (scheduled_follow_up_test) updateSurvey.scheduled_follow_up_test = scheduled_follow_up_test;
				if (signature) updateSurvey.signature = signature;
				if (client_on_TB_med) updateSurvey.client_on_TB_med = client_on_TB_med;
				if (TB_symptoms) updateSurvey.TB_symptoms = TB_symptoms;
				if (TB_screening_result) updateSurvey.TB_screening_result = TB_screening_result;
				if (has_client_ever_had_sex) updateSurvey.has_client_ever_had_sex = has_client_ever_had_sex;
				if (kind_of_sex) updateSurvey.kind_of_sex = kind_of_sex;
				if (last_had_unprotected_sex) updateSurvey.last_had_unprotected_sex = last_had_unprotected_sex;
				if (blood_contact) updateSurvey.blood_contact = blood_contact;
				if (STI_symptoms) updateSurvey.STI_symptoms = STI_symptoms;
				if (STI_screening_result) updateSurvey.STI_screening_result = STI_screening_result;
				if (time_out) updateSurvey.time_out = time_out;
				if (sales_force_client_code) updateSurvey.sales_force_client_code = sales_force_client_code;
				if (received_test_results) updateSurvey.received_test_results = received_test_results;
				if (reason_for_no_result) updateSurvey.reason_for_no_result = reason_for_no_result;
				if (risks_number) updateSurvey.risks_number = risks_number;
				if (what_steps) updateSurvey.what_steps = what_steps;
				if (step1_action_plan) updateSurvey.step1_action_plan = step1_action_plan;
				if (step2_action_plan) updateSurvey.step2_action_plan = step2_action_plan;
				if (step3_action_plan) updateSurvey.step2_action_plan = step3_action_plan;
				if (step4_action_plan) updateSurvey.step4_action_plan = step4_action_plan;
				if (HIV_test_results) updateSurvey.HIV_test_results = HIV_test_results;
				if (HIV_test_results) updateSurvey.HIV_test_results = HIV_test_results;
				if (test1_type) updateSurvey.test1_type = test1_type
				if (test1_lot_number) updateSurvey.test1_lot_number = test1_lot_number;
				if (test1_results) updateSurvey.test1_results = test1_results;
				if (test2_type) updateSurvey.test1_type = test1_type;
				if (test2_lot_number) updateSurvey.test2_lot_number = test2_lot_number;
				if (test2_results) updateSurvey.test2_results = test2_results;
				if (test3_type) updateSurvey.test3_type = test3_type;
				if (test3_lot_number) updateSurvey.test3_lot_number = test3_lot_number;
				if (test3_results) updateSurvey.test3_results = test3_results;
				if (maintenance_plan) updateSurvey.maintenance_plan = maintenance_plan;
				if (client_risk1) updateSurvey.client_risk1 = client_risk1;
				if (client_risk2) updateSurvey.client_risk2 = client_risk2;
				if (client_risk3) updateSurvey.client_risk3 = client_risk3;
				if (client_risk1_stage) updateSurvey.client_risk1_stage = client_risk1_stage;
				if (client_risk2_stage) updateSurvey.client_risk2_stage = client_risk2_stage;
				if (client_risk3_stage) updateSurvey.client_risk3_stage = client_risk3_stage;
				if (referred) updateSurvey.referred = referred;
				if (referral_point) updateSurvey.referral_point = referral_point;
				if (referral_reason) updateSurvey.referral_reason = referral_reason;
				if (end_of_window_period) updateSurvey.end_of_window_period = end_of_window_period;
				if (follow_up_required) updateSurvey.follow_up_required = follow_up_required;
				if (follow_up_reason) updateSurvey.follow_up_reason = follow_up_reason;
				if (follow_up_date) updateSurvey.follow_up_date = follow_up_date;
				if (updated_at) updateSurvey.updated_at = updated_at;

				knex('surveys').where('id', req.params.id)
					.update(updateSurvey).then(function () {
						knex.select()
							.from('surveys').where('id', req.params.id).then((surveys) => {
								res.send(surveys[0])
						})
					})
			} else {
					res.status(401);
					return res.send("Access Rejected, Not Authorized");
			}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

//@route GET api/:id
//@desc Get user's entries
//@access Private
router.get('/:id', auth, async (req, res) => {
    try {
        let user = await knex.select().from('users').then((user) => { return user[0] });
        if (user.role === 'admin') {
            knex.from('surveys')
                .where('surveys.id', req.params.id)
                .then(function (surveys) {
                    res.send(surveys[0])
                })
        } else {
            res.status(401);
            return res.send("Access Rejected, Not Authorized");
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

//@route DELETE api/surveys/:id
//@desc Delete surveys
//@access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let user = await knex.select().from('users').then((user) => { return user[0] });
        if (user.role === 'admin') {
            let exists = await knex.select().from('surveys').where('id', req.params.id).then((survey) => { return survey[0] });
            if (!exists) {
                return res.status(400).json({ msg: 'Survey Entry not Found!' });
            }
            knex('surveys').where('id', req.params.id)
                .del().then(function () {
                    res.json({ msg: 'Survey Entry Removed!' });
                })
        } else {
            res.status(401);
            return res.send("Access Rejected, Not Authorized");
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;