import api from './api';

const URL = api.URL;

const getCommunityNumber = async () => {
  try {
    const response =  await fetch(`${URL}/sites/community-number`, {
      method: 'GET',
      mode: 'cors',
    });
    return response.json();
  } catch (err) {
    console.error(err.message);
  }
}
const communityIncrement = async (id, code) => {
  try {
    let data = { code_number: code };
    const response =  await fetch(`${URL}/sites/community-number/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      }
    });
    return response.json();
  } catch (err) {
    console.error(err.message);
  }
}

export { getCommunityNumber, communityIncrement };