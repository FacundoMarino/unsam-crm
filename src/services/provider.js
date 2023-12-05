const headers = new Headers({
  Authorization: `Bearer ${process.env.REACT_APP_HEADER_TOKEN}`,
  'Content-Type': 'application/json',
});

export const getLogin = async () => {
  const requestOptions = {
    method: 'GET',
    headers: headers,
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/login`,
      requestOptions,
    ).then((response) => response.json());

    localStorage.setItem('browser_token', response.browser_token);
  } catch (error) {
    console.error('Error:', error);
  }
};

export const postLogin = async ({ email, password, token }) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ email, password, browser_token: token }),
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/login`,
      requestOptions,
    ).then((response) => response.json());

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getRegister = async () => {
  const requestOptions = {
    method: 'GET',
    headers: headers,
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/register`,
      requestOptions,
    ).then((response) => response.json());

    localStorage.setItem('browser_token', response.browser_token);
  } catch (error) {
    console.error('Error:', error);
  }
};

export const postRegister = async ({
  email,
  password,
  token,
  nombre,
  apellido,
  telefono,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      email,
      password,
      browser_token: token,
      name: nombre,
      apellido,
      telephone: telefono,
    }),
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/register`,
      requestOptions,
    ).then((response) => response.json());

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const postSendEmailCode = async ({ code, token }) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ code, browser_token: token }),
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/login`,
      requestOptions,
    ).then((response) => response.json());

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};
