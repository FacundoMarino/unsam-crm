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

export const getEmailVerified = async () => {
  const requestOptions = {
    method: 'GET',
    headers: headers,
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/email-verified`,
      requestOptions,
    ).then((response) => response.json());

    localStorage.setItem('browser_token', response.browser_token);
  } catch (error) {
    console.error('Error:', error);
  }
};

export const postLogin = async ({ email, password, token, telekinesis }) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      email,
      password,
      browser_token: token,
      telekinesis,
    }),
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
  telekinesis,
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
      telekinesis,
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

export const postRegisterStepTwo = async ({
  cuit,
  direccion,
  descripcion,
  empleados,
  sucursales,
  rubro,
  token,
  user,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      cuit,
      adress: direccion,
      branche_offices: sucursales,
      employees: empleados,
      descripcion,
      category: rubro,
      browser_token: token,
      ...user,
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

export const postSendEmailCode = async ({ code, token, telekinesis }) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ code, browser_token: token, telekinesis }),
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/email-verified`,
      requestOptions,
    ).then((response) => response.json());

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};
