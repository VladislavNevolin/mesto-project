const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
    headers: {
      authorization: '07334549-14cd-4eab-a623-6223aa527f74',
      'Content-Type': 'application/json'
    }
}

export function getProfileInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => checkResult(res));
}

export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => checkResult(res))
}

export function deleteCard (cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

export function setLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
}

export function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export function changeProfile(name,about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
}

export function postCard (name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  }).then((res) => checkResult(res));
}

export function changeAvatar (link){
  return fetch(`${config.baseUrl}/users/me/avatar`,{
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  }).then((res) => checkResult(res));
}

export function checkResult(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
}
