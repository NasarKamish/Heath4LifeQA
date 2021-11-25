import api from './api';

const URL = api.URL;

const getAllSurveys = async () => {
  try {
    const response = await fetch(`${URL}/surveys`, {
      method:"GET",   
      mode: "cors"
    });
    return response.json();
  } catch(err) {
    console.error(err.message)
  }
}

const addSurvey = async (data) => {
  try {
    let token = window.localStorage.getItem("hct-token");
    const response = await fetch(`${URL}/surveys`, {
      method: "POST",   
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        "h4l-token": token
      }
    });
    return response.json();
  } catch(err) {
    console.error(err.message)
  }
}

export { getAllSurveys, addSurvey };