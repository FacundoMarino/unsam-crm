const headers = new Headers({
  Authorization: `Bearer ${process.env.REACT_APP_HEADER_TOKEN}`,
  'Content-Type': 'application/json',
});

export const postServices = async ({
  token,
  telekinesis,
  service,
  descirption,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      browser_token: token,
      telekinesis,
      service,
      descirption,
    }),
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/service/resource/store`,
      requestOptions,
    ).then((response) => response.json());

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getServicies = async ({ token, telekinesis }) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      browser_token: token,
      telekinesis,
    }),
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/service/resource/show`,
      requestOptions,
    ).then((response) => response.json());

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getServiciesById = async ({ token, telekinesis, id }) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      browser_token: token,
      telekinesis,
      id,
    }),
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/service/resource/get/${id}`,
      requestOptions,
    ).then((response) => response.json());

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const updateService = async ({
  token,
  telekinesis,
  id,
  service,
  description,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      browser_token: token,
      telekinesis,
      id,
      service,
      description,
    }),
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/service/resource/update/${id}`,
      requestOptions,
    ).then((response) => response.json());

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteService = async ({ token, telekinesis, id }) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      browser_token: token,
      telekinesis,
      id,
    }),
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/service/resource/delete/${id}`,
      requestOptions,
    ).then((response) => response.json());

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};