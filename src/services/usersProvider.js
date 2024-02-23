const headers = new Headers({
  Authorization: `Bearer ${process.env.REACT_APP_HEADER_TOKEN}`,
  'Content-Type': 'application/json',
});

export const createUser = async ({
  telekinesis,
  token,
  name,
  apellido,
  telephone,
  link_meet,
  type_user,
  rol,
  sub_rol,
  email,
  password,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      telekinesis,
      browser_token: token,
      name,
      apellido,
      telephone,
      link_meet,
      type_user,
      rol,
      sub_rol,
      email,
      password,
    }),
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/users/resource/store`,
      requestOptions,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const viewUser = async ({ telekinesis, token, id }) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      telekinesis,
      browser_token: token,
      id,
    }),
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/users/resource/get/${id}`,
      requestOptions,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};
