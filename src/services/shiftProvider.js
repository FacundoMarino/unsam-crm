const headers = new Headers({
  Authorization: `Bearer ${process.env.REACT_APP_HEADER_TOKEN}`,
  'Content-Type': 'application/json',
});

export const postShiftsTypes = async ({ token, telekinesis }) => {
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
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/shift`,
      requestOptions,
    ).then((response) => response.json());

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const postShiftsTypesOne = async ({
  token,
  telekinesis,
  location,
  shift_type,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      browser_token: token,
      telekinesis,
      location,
      shift_type,
    }),
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/shift/step-one`,
      requestOptions,
    ).then((response) => response.json());

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const postShiftStepTWo = async ({
  token,
  telekinesis,
  shift_type,
  location,
  day,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      browser_token: token,
      telekinesis,
      shift_type,
      location,
      day,
    }),
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/shift/step-two`,
      requestOptions,
    ).then((response) => response.json());

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const postStore = async ({
  token,
  location,
  shift_type,
  telekinesis,
  day,
  hour,
  shift_type_id,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      browser_token: token,
      telekinesis,
      shift_type,
      location,
      day,
      hour,
      shift_type_id,
    }),
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/shift/store`,
      requestOptions,
    ).then((response) => response.json());

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};
