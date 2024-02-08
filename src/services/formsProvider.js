const headers = new Headers({
  Authorization: `Bearer ${process.env.REACT_APP_HEADER_TOKEN}`,
  'Content-Type': 'application/json',
});

export const getForms = async ({ token, telekinesis }) => {
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
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/forms/create`,
      requestOptions,
    ).then((response) => response.json());

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const newForm = async ({ token, telekinesis, name }) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      browser_token: token,
      telekinesis,
      name,
    }),
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/forms/store`,
      requestOptions,
    ).then((response) => response.json());

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteForm = async ({ token, telekinesis, id }) => {
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
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/forms/delete/${id}`,
      requestOptions,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const postComponentForm = async ({
  token,
  telekinesis,
  form_id,
  data,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      browser_token: token,
      telekinesis,
      form_id,
      data,
    }),
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/forms/form-components/all-store`,
      requestOptions,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getFormId = async ({ token, telekinesis, form_id }) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      browser_token: token,
      telekinesis,
      form_id,
    }),
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/forms/form-components/create`,
      requestOptions,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const putForm = async ({ token, telekinesis, form_id, data }) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      browser_token: token,
      telekinesis,
      form_id,
      data,
    }),
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/forms/form-components/all-update`,
      requestOptions,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const responseForm = async ({ token, telekinesis, form_id, data }) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      browser_token: token,
      telekinesis,
      form_id,
      data,
    }),
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/forms/form-responses/all-store`,
      requestOptions,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};
