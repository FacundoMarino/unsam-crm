const headers = new Headers({
  Authorization: `Bearer ${process.env.REACT_APP_HEADER_TOKEN}`,
  'Content-Type': 'application/json',
});

export const getNotes = async ({
  token,
  telekinesis,
  enterprise_id,
  service_id,
  data,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      browser_token: token,
      telekinesis,
      enterprise_id,
      service_id,
      data,
    }),
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/notes`,
      requestOptions,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const postNotes = async ({
  token,
  telekinesis,
  enterprise_id,
  service_id,
  note,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      browser_token: token,
      telekinesis,
      enterprise_id,
      service_id,
      note,
    }),
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/notes/store`,
      requestOptions,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};
