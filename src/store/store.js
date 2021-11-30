import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import * as slide01 from './modules/slide01';
import * as slide02 from './modules/slide02';
import * as slide03 from './modules/slide03';
import * as slide04 from './modules/slide04';
import * as slide05 from './modules/slide05';
import * as slide06 from './modules/slide06';
import * as slide07 from './modules/slide07';
import * as slide08 from './modules/slide08';
import * as slide09 from './modules/slide09';
import * as slide10 from './modules/slide10';
import * as slide11 from './modules/slide11';
import * as slide12 from './modules/slide12';
import * as slide13 from './modules/slide13';
import * as slide14 from './modules/slide14';
import * as slide15 from './modules/slide15';
import * as slide16 from './modules/slide16';
import * as slide17 from './modules/slide17';

Vue.use(Vuex);

// Intialising vuex-persist for local storage
const vuexPersist = new VuexPersist({
	key: "draft",
	storage: window.localStorage,
});

export const store = new Vuex.Store({
	modules: {
		slide01,
		slide02,
		slide03,
		slide04,
		slide05,
		slide06,
		slide07,
		slide08,
		slide09,
		slide10,
		slide11,
		slide12,
		slide13,
		slide14,
		slide15,
		slide16,
		slide17
	},
	plugins: [vuexPersist.plugin],
	state: {
		progress: ((1 / 17) * 100),
		onLanding: true,
		page: 1,
		validation_fail: false,
		onLine: undefined,
		photo: undefined,
		signed: false,
		pad: true,
		timeIn: new Date().toISOString(),
		timeOut: new Date().toISOString(),
		answers: {},
	},
	mutations: {
		INCREMENT(state) {
			state.page += 1;
		},
		DECREMENT(state) {
			state.page -= 1;
		},
		PROCEED(state) {
			let percentage = (1 / 17) * 100;
			state.progress += Math.round(percentage);
			if (state.progress > 100) {
				state.progress = 100;
			}
		},
		PREVIOUS(state) {
			let percentage = (1 / 17) * 100;
			state.progress -= Math.round(percentage);
			if (state.progress < 0) {
				state.progress = 4;
			}
		},
		PAD_UPDATE(state, change) {
			state.pad = change;
		},
		UPDATE_LANDING(state, change){
			state.onLanding = change;
		},
		// UPDATE_COMPLETE(state, change) {
		// 	state.completed = change
		// },
		UPDATE_TBDEFAULT (state, change) {
			state.tb_default = change
		},
		UPDATE_STIDEFAULT (state, change) {
			state.sti_default = change
		},
		UPDATE_PROGRESS(state, change) {
			state.progress = change;
		},
		VALIDATION_TOGGLE(state, change) {
			state.validation_fail = change;
		},
		UPDATE_PHOTO(state, photo) {
			state.photo = photo;
		},
		UPDATE_SIGNATURE(state, signed) {
			state.signed = signed;
		},
		UPDATE_ANSWERS(state, answers) {
			state.answers = answers;
		},
		UPDATE_SURVEY(state, changes) {
			state.questions = changes;
		},
		UPDATE_TIMEIN(state, changes) {
			state.timeIn = changes;
		},
		UPDATE_TIMEOUT(state, changes) {
			state.timeOut = changes;
		},
		UPDATE_ONLINE_STATUS(state, status) {
			state.onLine = status;
		}
	},
});
