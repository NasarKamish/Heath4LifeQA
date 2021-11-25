import api from './api';

const URL = api.URL;

const addArea = async (data) => {
  try {
    let token = window.localStorage.getItem("hct-token");
    const response = await fetch(`${URL}/areas`, {
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

const getPublicAreas = async () =>  {
  try {
    let token = window.localStorage.getItem("hct-token");
    const response =  await fetch(`${URL}/areas/public`, {
        method: 'GET',
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

const getAreas = async () => {
  try {
    let token = window.localStorage.getItem("hct-token");
    const response = await fetch(`${URL}/areas`, {
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

const getAreaByID = (id) => {
  try {
    let token = window.localStorage.getItem("hct-token");
    const response = fetch(`${URL}/areas/${id}`, {
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

const updateArea = (id, data) => {
  try {
    let token = window.localStorage.getItem("hct-token");
    const response = fetch(`${URL}/areas/${id}`, {
      method: "PUT",   
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

const deleteArea = (id) => {
  try {
    let token = window.localStorage.getItem("hct-token");
    const response = fetch(`${URL}/areas/${id}`, {
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

export { addArea, getPublicAreas, getAreas, getAreaByID, updateArea, deleteArea };