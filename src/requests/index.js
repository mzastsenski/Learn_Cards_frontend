import { setData, setCards, setCollection, logout } from "../redux/data";

export const getData = (user, collection, dispatch) => {
  return fetch(`api/cards/${user}`)
    .then((res) => res.json())
    .then((data) => {
      if (data && data !== 401) {
        dispatch(setData(data));
        const cards = data.filter((e) => e.collection === collection);
        if (cards[0]) dispatch(setCards(cards));
        else {
          const arr = [];
          data.forEach((e) => {
            if (!arr.includes(e.collection)) arr.push(e.collection);
          });
          if (arr[0]) {
            const newCollecton = arr[0];
            dispatch(setCollection(newCollecton));
            const cards = data.filter((e) => e.collection === newCollecton);
            dispatch(setCards(cards));
          }
        }
      } else dispatch(logout());
    });
};

export const postCard = async (data) => {
  return await fetch(`api/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
};

export const postData = async (data) => {
  return await fetch(`api/${data.met}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      // console.log(res);
      return res;
    })
    .catch((err) => console.log(err));
};

export const deleteOneCard = async (data) => {
  return await fetch(`api/deleteCard`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
};

export const deleteCollection = async (data) => {
  return await fetch(`api/deleteCollection`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
};

export const postLogout = async () =>
  await fetch(`api/logout`, { method: "POST" });
