const headers = new Headers({
  Authorization: `Bearer ${process.env.REACT_APP_HEADER_TOKEN}`,
  'Content-Type': 'application/json',
});

export const createQuestion = async ({
  telekinesis,
  token,
  question,
  response,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      telekinesis,
      browser_token: token,
      question,
      response,
    }),
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/question-response/resource/store`,
      requestOptions,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const updateQuestion = async ({
  telekinesis,
  token,
  question,
  response,
  id,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      telekinesis,
      browser_token: token,
      question,
      response,
      id,
    }),
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/question-response/resource/update/${id}`,
      requestOptions,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const viewQuestion = async ({ telekinesis, token, id }) => {
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
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/question-response/resource/get/${id}`,
      requestOptions,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteQuestion = async ({ telekinesis, token, id }) => {
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
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/question-response/resource/delete/${id}`,
      requestOptions,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const viewAllQuestion = async ({ telekinesis, token }) => {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      telekinesis,
      browser_token: token,
    }),
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/question-response/resource`,
      requestOptions,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};
