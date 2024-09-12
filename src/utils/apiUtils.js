import axios from 'axios';

const BASE_URL = 'http://192.168.0.105:8000/api';


const errorResponse = (error) => {
  if ('response' in error) {
    if ('data' in error.response) {
      return error.response.data;
    }
    return error.response;
  }
  return error;
};

export const getRequest = ({ url, token = null, abortToken = null }) => {
  return new Promise((resolve, reject) => {
    const headers = {
      headers: {
        Accept: 'application/json',
      },
    };

    if (token) {
      headers.headers.Authorization = `Bearer ${token}`;
    }

    if (abortToken) {
      headers.signal = abortToken.signal;
    }

    axios
      .get(url, headers)
      .then((response) => {
        return resolve(response.data);
      })
      .catch((error) => {
        reject(errorResponse(error));
      });
  });
};

export const postRequest = ({ url, data, token = null }) => {
  return new Promise((resolve, reject) => {
    const headers = {
      headers: {
        Accept: 'application/json',
      },
    };

    if (token) {
      headers.headers.Authorization = `Bearer ${token}`;
    }
    console.log(url, data);
    axios
      .post(url, data, headers)
      .then((response) => {
        return resolve(response.data);
      })
      .catch((error) => {
        reject(errorResponse(error));
      });
  });
};

export const patchRequest = ({ url, data, token = null }) => {
  return new Promise((resolve, reject) => {
    const headers = {
      headers: {
        Accept: 'application/json',
      },
    };

    if (token) {
      headers.headers.Authorization = `Bearer ${token}`;
    }

    axios
      .patch(url, data, headers)
      .then((response) => {
        return resolve(response.data);
      })
      .catch((error) => {
        reject(errorResponse(error));
      });
  });
};

export const putRequest = ({ url, data, token = null }) => {
  return new Promise((resolve, reject) => {
    const headers = {
      headers: {
        Accept: 'application/json',
      },
    };

    if (token) {
      headers.headers.Authorization = `Bearer ${token}`;
    }

    axios
      .put(url, data, headers)
      .then((response) => {
        return resolve(response.data);
      })
      .catch((error) => {
        reject(errorResponse(error));
      });
  });
};

export const deleteRequest = ({ url, token = null }) => {
  return new Promise((resolve, reject) => {
    const headers = {
      headers: {
        Accept: 'application/json',
      },
    };

    if (token) {
      headers.headers.Authorization = `Bearer ${token}`;
    }

    axios
      .delete(url, headers)
      .then((response) => {
        return resolve(response.data);
      })
      .catch((error) => {
        reject(errorResponse(error));
      });
  });
};

export const login = (email, password) => {
  const url = `${BASE_URL}/login`;
  const data = {
    email,
    password,
  };

  return postRequest({ url, data, token: null });
};

export const register = (name, email, password, phone_no) => {
  const url = `${BASE_URL}/register`;
  const data = { name, email, password,c_password: password, phone_no };
  return postRequest({ url, data, token: null });
};

export const getProperties = (token, abortToken = null) => {
  const url = `${BASE_URL}/properties`;

  return getRequest({ url, token, abortToken });
};
export const getPropertiesById = (id, token, abortToken = null) => {
  const url = `${BASE_URL}/properties/${id}`;

  return getRequest({ url, token, abortToken });
};

export const createProperties = (data, token) => {
  const url = `${BASE_URL}/properties`;

  return postRequest({ url, token, data });
};

export const updateCategory = (id, data, token) => {
  const url = `${BASE_URL}/properties/${id}`;
  return patchRequest({ url, token, data });
};

export const deleteCategory = async (id, token) => {
  const url = `${BASE_URL}/properties/${id}`;  // Ensure this URL is correct

  try {
    const response = await deleteRequest({ url, token });
    return response;
  } catch (error) {
    console.log("Delete Error:", error);  // Log the error to see what's wrong
    throw error;
  }
};
