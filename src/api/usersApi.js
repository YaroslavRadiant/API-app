const options = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer 8a5fd3368f733a529defbd7afc13137bf3a3050b99ac6ab9f141f1bbbf032f50",
  },
};

export function getUsersData(page) {
  return fetch(`https://gorest.co.in/public/v1/users?page=${page}`, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export function getGenderedUsersData(gender, page) {
  return fetch(
    `https://gorest.co.in/public/v1/users?gender=${gender}&page=${page}`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export function getUserData(id) {
  return fetch(`https://gorest.co.in/public/v1/users/${id}`, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export function putUserData(id, formData) {
  return fetch(`https://gorest.co.in/public/v1/users/${id}`, {
    method: "PUT",
    headers: {
      Authorization:
        "Bearer 8a5fd3368f733a529defbd7afc13137bf3a3050b99ac6ab9f141f1bbbf032f50",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));
}
