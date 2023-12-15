// Header feature
const headerLogin = document.getElementById('header-login');
if (headerLogin) {
  const isUserLogged = !!getSessionStorageKey(LOGIN_STORAGE_KEY);
  const updateUserMenu = function (menu) {
    headerLogin.innerHTML = '';
    const menuHTML = convertStringToHTML(menu);
    headerLogin.appendChild(menuHTML);
  };

  if (isUserLogged) {
    updateUserMenu(LOGGED_MENU);
    headerLogin.addEventListener('click', function (e) {
      e.preventDefault();
      const target = e.target;
      const logout = headerLogin.querySelector('#logout');
      if (target == logout) {
        removeSessionStorageKey(LOGIN_STORAGE_KEY);
        updateUserMenu(LOGIN_MENU);
        parent.location = logout.href;
      }
    });
  }
}

// Login feature
const loginForm = document.getElementById('login-form');
if (loginForm) {
  const username = loginForm.querySelector('#username');
  const password = loginForm.querySelector('#password');
  const remember = loginForm.querySelector('#remember-me');
  const loginFormButton = loginForm.querySelector('button');
  const requiredLoginInputs = [username, password];

  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    const rememberValue = remember.checked;
    const requiredLoginInputsValues = [usernameValue, passwordValue];

    requiredLoginInputs.forEach(function (element) {
      removeErrorMessage(element);
    });

    removeFormAlertMessage(loginFormButton);

    if (requiredLoginInputsValues.some(isNullOrEmptyString)) {
      requiredLoginInputs.forEach(function (element) {
        addErrorMessage(element, REQUIRED_FIELD_MESSAGE);
      });
      return;
    }

    const users = await fakeApiCall(FAKE_USERS_ENDPOINT);

    const user = users.find(function (user) {
      return user.username == usernameValue && user.password == passwordValue;
    });

    const userExists = !!user;

    if (userExists) {
      setSessionStorageKey(LOGIN_STORAGE_KEY, userExists);
      setSessionStorageKey(
        LOGIN_STORAGE_USER_KEY,
        JSON.stringify({ user: user.id, remember: rememberValue })
      );
      updateUserMenu(LOGGED_MENU);
      resetInputsValues(requiredLoginInputs);
      const successLoginAlert = `
        <div class="alert alert-success mt-4" role="alert">
          Login successful! Welcome back to Turingam Real Estate. <a href="./index.html" class="alert-link">Go back to our main page.</a>
        </div>
      `;
      addFormAlertMessage(loginFormButton, successLoginAlert);
    } else {
      resetInputsValues(requiredLoginInputs);
      const successLoginAlert = `
        <div class="alert alert-danger mt-4" role="alert">
          Login unsuccessful. <a href="./login.html" class="alert-link">Go back to login page.</a>
        </div>
      `;
      addFormAlertMessage(loginFormButton, successLoginAlert);
    }
  });

  requiredLoginInputs.forEach(function (element) {
    element.addEventListener('change', function () {
      removeErrorMessage(element);
    });
  });
}

// Sign up feature
const signUpForm = document.getElementById('sign-up-form');
if (signUpForm) {
  const usernameInput = signUpForm.querySelector('#username');
  const nameInput = signUpForm.querySelector('#name');
  const lastnameInput = signUpForm.querySelector('#lastname');
  const emailInput = signUpForm.querySelector('#email');
  const passwordInput = signUpForm.querySelector('#password');
  const sendFormButton = signUpForm.querySelector('button');
  const requiredSignUpInputs = [
    usernameInput,
    nameInput,
    lastnameInput,
    emailInput,
    passwordInput,
  ];

  signUpForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const usernameValue = usernameInput.value.trim();
    const nameValue = nameInput.value.trim();
    const lastNameValue = lastnameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const requiredSignUpInputsValues = [
      usernameValue,
      nameValue,
      lastNameValue,
      emailValue,
      passwordValue,
    ];

    requiredSignUpInputs.forEach(function (element) {
      removeErrorMessage(element);
    });

    removeFormAlertMessage(sendFormButton);

    if (requiredSignUpInputsValues.some(isNullOrEmptyString)) {
      requiredSignUpInputs.forEach(function (element) {
        addErrorMessage(element, REQUIRED_FIELD_MESSAGE);
      });
      return;
    }

    if (!isValidEmail(emailValue)) {
      addErrorMessage(emailInput, INVALID_EMAIL_MESSAGE);
      return;
    }

    const users = await fakeApiCall(FAKE_USERS_ENDPOINT);

    const user = users.find(function (user) {
      return user.username == usernameValue || user.email == emailValue;
    });

    const userExists = !!user;

    if (userExists) {
      resetInputsValues(requiredSignUpInputs);
      const userCreateErrorAlert = `
        <div class="alert alert-danger mt-4" role="alert">
          Sign in unsuccessful. Username or email already exists. Try again.</a>
        </div>
      `;
      addFormAlertMessage(sendFormButton, userCreateErrorAlert);
    } else {
      resetInputsValues(requiredSignUpInputs);
      const successUserCreateAlert = `
        <div class="alert alert-danger mt-4" role="alert">
          User ${usernameValue} successfuly created. Please check your username and password. <a href="./index.html" class="alert-link">Go back to our main page.</a>
        </div>
      `;
      addFormAlertMessage(sendFormButton, successUserCreateAlert);
    }
  });

  requiredSignUpInputs.forEach(function (element) {
    element.addEventListener('change', function () {
      removeErrorMessage(element);
    });
  });
}

// Contact feature
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const nameInput = contactForm.querySelector('#name');
  const lastnameInput = contactForm.querySelector('#lastname');
  const emailInput = contactForm.querySelector('#email');
  const phoneInput = contactForm.querySelector('#phone');
  const messageInput = contactForm.querySelector('#message');
  const requiredInputs = Array.from([
    nameInput,
    lastnameInput,
    emailInput,
    phoneInput,
    messageInput,
  ]);

  contactForm.addEventListener('submit', function (e) {
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
}
