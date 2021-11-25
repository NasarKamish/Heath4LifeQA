import api from './api';

const URL = api.URL;

const loginUser = async (data) => {
  try {
    let token = window.localStorage.getItem("hct-token");
    const response =  await fetch(`${URL}/user`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        "h4l-token": token
      },
    });
    return response.json();
  } catch (err) {
    console.log(err.message)
  }
}

export { loginUser };