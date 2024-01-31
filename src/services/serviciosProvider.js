const headers = new Headers({
    Authorization: `Bearer ${process.env.REACT_APP_HEADER_TOKEN}`,
    'Content-Type': 'application/json',
  });
  
  export const postServicies = async ({ token, telekinesis, enterprise_id }) => {
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
        `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/file/services`,
        requestOptions,
      ).then((response) => response.json());
  
      return response;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  export const getServicies = async ({ token, telekinesis, enterprise_id }) => {
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
        `${process.env.REACT_APP_URL_API}/api/crmunsam/auth/file/services`,
        requestOptions,
      ).then((response) => response.json());
  
      return response;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  