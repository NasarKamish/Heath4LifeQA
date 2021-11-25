import questions from '../questions/02_client_information';

export const state = {
  questions,
  
}

export const mutations = {
  UPDATE_QUESTIONS(state, changes) {
    state.questions = changes
  },
 
}