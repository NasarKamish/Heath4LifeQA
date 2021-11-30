import api from './api';

const URL = api.URL;

const registerUser = async (data) => {
  try {
    let token = window.localStorage.getItem("hct-token");
    const response = await fetch(`${URL}/admin`, {
      method:"POST",   
      mode: 'cors',
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

const getPublicCounsellors = async () =>  {
  try {
    let token = window.localStorage.getItem("hct-token");
    const response =  await fetch(`${URL}/user/public`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          "Content-type": "application/json"
        }
    });
    return response.json();
  } catch(err) {
    console.error(err.message);
  }
}

const getCounsellers= async () => {
  try {
    let token = window.localStorage.getItem("hct-token");
    const response = await fetch(`${URL}/user`, {
      method:"GET",   
      mode: 'cors',
      headers: {
        "h4l-token": token
      }
    });
    return response.json();
  } catch(err) {
    console.error(err.message)
  }
}

const getCounsellerByID = (id) => {
  try {
    const response = fetch(`${URL}/user/${id}`, {
      method:"GET",
      mode: 'cors',
      headers: {
        "h4l-token": token
      }
    });
    return response.json();
  } catch(err) {
    console.error(err.message);
  }
}

const updateCounseller = (id, data) => {
  try {
    let token = window.localStorage.getItem("hct-token");
    const response = fetch(`${URL}/user/${id}`, {
      method:"PUT",   
      body:  JSON.stringify(data),
      mode: 'cors',
      headers: {
        "Content-type": "application/json",
        "h4l-token": token
      }
    });
    return response.json();
  } catch(err) {
    console.error(err.message);
  }
}

const deleteCounseller = (id) => {
  try {
    let token = window.localStorage.getItem("hct-token");
    const response = fetch(`${URL}/user/${id}`, {
      method: "DELETE",   
      mode: 'cors',
      headers: {
        "h4l-token": token
      }
    });
    return response.json();
  } catch (err) {
    console.log(err.message);
  }
}

export { registerUser, getPublicCounsellors, getCounsellers, getCounsellerByID, updateCounseller, deleteCounseller };