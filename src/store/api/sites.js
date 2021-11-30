import api from './api';

const URL = api.URL;

const addSite = async (data) => {
  try {
    let token = window.localStorage.getItem("hct-token");
    const response = await fetch(`${URL}/sites`, {
      method:"POST",   
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

const getPublicSites = async () =>  {
  try {
    let token = window.localStorage.getItem("hct-token");
    const response =  await fetch(`${URL}/sites/public`, {
      method: 'GET',
      mode: "cors",
      headers: {
        "h4l-token": token
      }
    });
    return response.json();
  } catch(err) {
    console.error(err.message);
  }
}

const getSites = async () => {
  try {
    let token = window.localStorage.getItem("hct-token");
    const response = await fetch(`${URL}/sites`, {
      method:"GET",   
      mode: "cors",
      headers: {
        "h4l-token": token
      }
    });
    return response.json();
  } catch(err) {
    console.error(err.message)
  }
}

const getSiteByID = (id) => {
  try {
    let token = window.localStorage.getItem("hct-token");
    const response = fetch(`${URL}/sites/${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "h4l-token": token
      }
    });
    return response.json();
  } catch(err) {
    console.error(err.message);
  }
}

const updateSite = (id, data) => {
  try {
    const response = fetch(`${URL}/sites/${id}`, {
      method:"PUT",   
      body:  JSON.stringify(data),
      mode: "cors",
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

const deleteSite = (id) => {
  try {
    let token = window.localStorage.getItem("hct-token");
    const response = fetch(`${URL}/sites/${id}`, {
      method: "DELETE",   
      mode: "cors",
      headers: {
        "h4l-token": token
      }
    });
    return response.json();
  } catch (err) {
      console.log(err.message);
  }
}

export { addSite, getPublicSites, getSites, getSiteByID, updateSite, deleteSite };
