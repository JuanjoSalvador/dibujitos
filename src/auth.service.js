import md5 from 'md5';

// key for storing the token in the browser localStorage
export const JWT_KEY = "__palomitas_jwt";

// checks if token is valid
// a token is valid when is not expired and not missing
export function tokenIsValid(tokenData) {
  if(!tokenData.exp) {
    return false;
  }
  const tokenTimestamp = tokenData.exp * 1000;
  return new Date(tokenTimestamp) > new Date();
}

// extracts json data encoded in the token
export function getTokenData(jwt) {
  if(!jwt) {
    return null
  }

  // 1. get second token section delimited by .
  // 2. transform from baes64 string to json string
  // 3. transform from json string to json object
  const sections = jwt.split('.')
  const decoded = atob(sections[1])
  const data = JSON.parse(decoded)
  data.email = data.sub;
  delete data.sub;
  data.mailhash = md5(data.email);
  data.token = jwt;
  
  return data;
}