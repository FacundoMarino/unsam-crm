const headers = new Headers({
  Authorization: `Bearer ${process.env.REACT_APP_HEADER_TOKEN}`,
  'Content-Type': 'application/json',
});

export const getEnterprisesProvider = async ({ token, telekinesis }) => {
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
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/task/enterprises`,
      requestOptions,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const postTask = async ({
  token,
  telekinesis,
  enterprise_id,
  tipo_tarea,
  status,
  comment,
  form_id,
  shift_type,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      browser_token: token,
      telekinesis,
      enterprise_id,
      tipo_tarea,
      status,
      comment,
      form_id,
      shift_type,
    }),
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/task/store`,
      requestOptions,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getTaskProvider = async ({
  token,
  telekinesis,
  enterprise_id,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      browser_token: token,
      telekinesis,
      enterprise_id,
    }),
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/task`,
      requestOptions,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const updateTaskProvider = async ({
  token,
  telekinesis,
  enterprise_id,
  status,
  id,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      browser_token: token,
      telekinesis,
      enterprise_id,
      status,
      id,
    }),
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/task/update/${id}`,
      requestOptions,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};
