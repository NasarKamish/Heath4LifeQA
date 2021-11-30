import questions from '../questions/16_referral_questions';
export const state = {
  questions
}

export const mutations = {
  UPDATE_QUESTIONS(state, changes) {
    state.questions = changes
  }
}