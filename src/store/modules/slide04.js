import questions from '../questions/04_counsellor_guideline';
export const state = {
  questions
}

export const mutations = {
  UPDATE_QUESTIONS(state, changes) {
    state.questions = changes
  }
}