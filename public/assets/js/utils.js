// String utils
const isNullOrEmptyString = function (value) {
  return value === null || value === '';
};

// Storage utils
const setSessionStorageKey = function (key, value) {
  sessionStorage.setItem(key, value);
};
const getSessionStorageKey = key => {
  return sessionStorage.getItem(key);
};
const removeSessionStorageKey = function (key) {
  sessionStorage.removeItem(key);
};

// HTML utils
const convertStringToHTML = function (htmlString) {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, 'text/html');
  return html.body;
};

// Validation utils
const isValidEmail = function (email) {
  const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
  return regex.test(email);
};
const addErrorMessage = function (element, message) {
  if (element.value === '') {
    element.classList.add('has-error');
    element.insertAdjacentHTML('afterend', `<span>${message}</span>`);
  }
};
const removeErrorMessage = function (element) {
  const inputErrorMessage = element.nextSibling;
  if (inputErrorMessage) {
    element.classList.remove('has-error');
    inputErrorMessage.remove();
  }
};
const addFormAlertMessage = function (element, alertMessageElement) {
  element.insertAdjacentHTML('afterend', alertMessageElement);
};
const removeFormAlertMessage = function (element) {
  const formAlertMessage = element.nextElementSibling;
  if (formAlertMessage) {
    formAlertMessage.remove();
  }
};
const resetInputsValues = function (inputs) {
  inputs.forEach(function (element) {
    element.value = '';
  });
};
