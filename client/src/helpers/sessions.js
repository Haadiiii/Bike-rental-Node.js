function sessionStorage(type, data = {}, token = null) {
  if (type === 'set') {
    window.sessionStorage.setItem('user', JSON.stringify(data, token));
  } else if (type === 'get') {
    return JSON.parse(window.sessionStorage.getItem('user'));
  } else if (type === 'remove') {
    window.sessionStorage.removeItem('user');
  }

  return 'user dosent exist';
}

export default sessionStorage;
