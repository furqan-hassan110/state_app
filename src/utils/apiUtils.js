import axios from 'axios';
export const DOMAIN = 'http://192.168.2.179:8000';
export const BASE_URL = 'http://192.168.2.179:8000/api';

const errorResponse = error => {
  if ('response' in error) {
    if ('data' in error.response) {
      return error.response.data;
    }
    return error.response;
  }
  return error;
};

export const getRequest = ({url, token = null, abortToken = null}) => {
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
      .then(response => {
        return resolve(response.data);
      })
      .catch(error => {
        reject(errorResponse(error));
      });
  });
};

export const postRequest = ({url, data, token = null, type = ''}) => {
  return new Promise((resolve, reject) => {
    const headers = {
      headers: {
        Accept: 'application/json',
      },
    };

    if (token) {
      headers.headers.Authorization = `Bearer ${token}`;
    }
    if (type === 'formdata') {
      headers.headers['Content-Type'] = 'multipart/form-data';
    }

    console.log(url, data);
    axios
      .post(url, data, headers)
      .then(response => {
        return resolve(response.data);
      })
      .catch(error => {
        reject(errorResponse(error));
      });
  });
};

export const patchRequest = ({url, data, token = null}) => {
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
      .then(response => {
        return resolve(response.data);
      })
      .catch(error => {
        reject(errorResponse(error));
      });
  });
};

export const putRequest = ({url, data, token = null}) => {
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
      .then(response => {
        return resolve(response.data);
      })
      .catch(error => {
        reject(errorResponse(error));
      });
  });
};

export const deleteRequest = ({url, token = null}) => {
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
      .then(response => {
        return resolve(response.data);
      })
      .catch(error => {
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

  return postRequest({url, data, token: null});
};

export const register = (name, email, password, phone_no) => {
  const url = `${BASE_URL}/register`;
  const data = {name, email, password, c_password: password, phone_no};
  return postRequest({url, data, token: null});
};

export const logout = token => {
  const url = `${BASE_URL}/logout`;
  return postRequest({url, token});
};

export const getProperties = (token, abortToken = null) => {
  const url = `${BASE_URL}/properties`;

  return getRequest({url, token, abortToken});
};
export const getPropertiesById = (id, token, abortToken = null) => {
  const url = `${BASE_URL}/properties/${id}`;

  return getRequest({url, token, abortToken});
};

export const createProperties = (data, token) => {
  const url = `${BASE_URL}/properties`;
  const type = 'formdata';

  return postRequest({url, token, data, type});
};

export const updateCategory = (id, data, token) => {
  const url = `${BASE_URL}/properties/${id}`;
  return patchRequest({url, token, data});
};

export const deleteCategory = async (id, token) => {
  const url = `${BASE_URL}/properties/${id}`; // Ensure this URL is correct

  try {
    const response = await deleteRequest({url, token});
    return response;
  } catch (error) {
    console.log('Delete Error:', error); // Log the error to see what's wrong
    throw error;
  }
};
export const addLovedProperty = (propertyId, token) => {
  const url = `${BASE_URL}/add-loved-property`;
  const data = {property_id: propertyId};

  return postRequest({url, data, token});
};
export const getLovedProperties = token => {
  const url = `${BASE_URL}/user-loved-property`; // Replace with your actual API endpoint

  return getRequest({url, token});
};
export const removeLovedProperties = (propertyId, token) => {
  const url = `${BASE_URL}/remove-loved-property`; // Replace with your actual API endpoint
  const data = {property_id: propertyId};
  return postRequest({url, data, token});
};
export const subscribeUser = (userId, token) => {
  const url = `${BASE_URL}/user-subscription`;
  const data = {user_id: userId};
  return postRequest({url, data, token});
};
export const requestSubscribtion = token => {
  const url = `${BASE_URL}/request-subscription`;
  return postRequest({url, token});
};
export const fetchAllUser = token => {
  const url = `${BASE_URL}/users`;

  return getRequest({url, token});
};
export const updateProfile = (token, {name, email, phone_no}) => {
  const data = {name, email, phone_no};
  const url = `${BASE_URL}/update-profile`;
  return postRequest({url, token, data});
};
