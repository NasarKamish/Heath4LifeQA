import questions from '../questions/07_TB_screening';
export const state = {
  questions
}

export const mutations = {
  UPDATE_QUESTIONS(state, changes) {
    state.questions = changes
  }
}