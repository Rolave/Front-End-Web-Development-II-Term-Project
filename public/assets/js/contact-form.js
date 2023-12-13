const REQUIRED_FIELD_MESSAGE = 'This field is required.';
const INVALID_EMAIL_MESSAGE = 'Invalid email address.';
const form = document.getElementById('contact-form');
const nameInput = form.querySelector('#name');
const lastnameInput = form.querySelector('#lastname');
const emailInput = form.querySelector('#email');
const phoneInput = form.querySelector('#phone');
const messageInput = form.querySelector('#message');
const requiredInputs = Array.from([
  nameInput,
  lastnameInput,
  emailInput,
  phoneInput,
  messageInput,
]);
const isNullOrEmptyString = function (value) {
  return value === null || value === '';
};
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

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nameInputValue = nameInput.value;
  const lastnameInputValue = lastnameInput.value;
  const emailInputValue = emailInput.value;
  const messageInputValue = messageInput.value;
  const requiredInputsValues = Array.from([
    nameInputValue,
    lastnameInputValue,
    emailInputValue,
    messageInputValue,
  ]);

  requiredInputs.forEach(function (element) {
    removeErrorMessage(element);
  });

  document.querySelectorAll('.msg-response').forEach(function (element) {
    element.style.display = 'none';
  });

  if (requiredInputsValues.every(isNullOrEmptyString)) {
    requiredInputs.forEach(function (element) {
      addErrorMessage(element, REQUIRED_FIELD_MESSAGE);
    });
    return;
  }

  if (requiredInputsValues.some(isNullOrEmptyString)) {
    requiredInputs.forEach(function (element) {
      addErrorMessage(element, REQUIRED_FIELD_MESSAGE);
    });
  }

  if (!isValidEmail(emailInputValue)) {
    addErrorMessage(emailInput, INVALID_EMAIL_MESSAGE);
    return;
  }

  const sendEmail = function () {
    const body = {
      name: nameInputValue,
      lastname: lastnameInputValue,
      email: emailInputValue,
      message: messageInputValue,
    };
    fakeApiCall(FAKE_EMAIL_ENDPOINT, DEFAULT_HEADERS, body);
  };

  sendEmail();
});

requiredInputs.forEach(function (element) {
  element.addEventListener('change', function () {
    removeErrorMessage(element);
  });
});
