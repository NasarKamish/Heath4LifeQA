import questions from '../questions/01_site_questions';
export const state = {
  questions
}

export const mutations = {
  UPDATE_QUESTIONS(state, changes) {
    state.questions = changes
  }
}