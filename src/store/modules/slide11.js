import questions from '../questions/11_counseller_guideline';
export const state = {
  questions
}

export const mutations = {
  UPDATE_QUESTIONS(state, changes) {
    state.questions = changes
  }
}