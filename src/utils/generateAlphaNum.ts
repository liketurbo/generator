const generateAlphaNum = (length = 15) => {
  const charSet =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomPosition = Math.floor(Math.random() * charSet.length);
    randomString += charSet[randomPosition];
  }

  return randomString;
};

export default generateAlphaNum;
