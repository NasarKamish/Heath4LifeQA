import questions from '../questions/17_follow_up_questions';
export const state = {
  questions
}
export const mutations = {
  UPDATE_QUESTIONS(state, changes) {
    state.questions = changes
  }
}