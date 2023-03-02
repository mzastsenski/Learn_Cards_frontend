

export const getData = (user) =>
  fetch(`api/cards/${user}`).then((res) => res.json());

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

export const checkUser = async () =>
  await fetch(`api/checkUser`, { method: "POST" });

export const postLogout = async () =>
  await fetch(`api/logout`, { method: "POST" }).then((res) => res.json());
