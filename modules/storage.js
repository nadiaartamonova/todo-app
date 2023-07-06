
export const getStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const setStorage = (key, value) => {
  let storageData = getStorage(key);
  if (storageData === null) {
    storageData = [value];
  } else {
    storageData.push(value);
  }
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const removeStorage = (userName, id) => {
  let data = getStorage(userName);
  data = data.filter(task => task.id !== id);
  localStorage.setItem(userName, JSON.stringify(data));
};
