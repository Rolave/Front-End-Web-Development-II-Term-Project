// Header feature
const headerLogin = document.getElementById('header-login');
const updateUserMenu = function (menu) {
  headerLogin.innerHTML = '';
  const menuHTML = convertStringToHTML(menu);
  headerLogin.appendChild(menuHTML);
};
if (headerLogin) {
  const isUserLogged = !!getSessionStorageKey(LOGIN_STORAGE_KEY);

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
        <div class="alert alert-success mt-4" role="alert">
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

// Properties feature
const propertiesFilterForm = document.getElementById('properties-filter-form');
const propertiesContainer = document.getElementById('properties-container');
if (propertiesFilterForm) {
  const locationSelect = propertiesFilterForm.querySelector('#location');
  const typeSelect = propertiesFilterForm.querySelector('#type');

  propertiesFilterForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const locationSelectValue = locationSelect.value;
    const typeSelectValue = typeSelect.value;
    const properties = await fakeApiCall(FAKE_PROPERTIES_ENDPOINT);
    const createPropertyItem = function (property) {
      return `
        <div class="col-lg-4 mb-4">
          <div class="properties__item">
            <div class="properties__item-image">
              <span class="properties__item-category">${
                property.category
              }</span>
              <button class="properties__item-bookmark" type="button" data-id="${
                property.id
              }">
                <i class="fa-solid fa-bookmark"></i>
              </button>
              <img src="${
                property.images.main || './assets/img/house-default.jpg'
              }" class="card-img-top" alt="${property.address}" />
              <h6 class="properties__item-price">$${property.price}</h6>
            </div>
            <div class="card-body">
              <h5 class="card-title">
                <span class="card-title__address">
                  <i class="fa-solid fa-location-dot"></i>
                  ${property.address}
                </span>
                <span class="card-title__address-info">
                  ${property.city} ${property.province}, ${property.postalCode}
                </span>
              </h5>
              <ul class="card-list">
                <li>
                  <i class="fa-solid fa-bed"></i><span>${
                    property.bedrooms
                  } Rooms</span>
                </li>
                <li>
                  <i class="fa-solid fa-shower"></i><span>${
                    property.bathrooms
                  } Baths</span>
                </li>
                <li>
                  <i class="fa-solid fa-car"></i><span>${
                    property.garage
                  } Garage</span>
                </li>
              </ul>
              <p class="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Illo soluta eos.
              </p>
              <a href="./property.html" class="card-button">View more</a>
            </div>
          </div>
        </div>
      `;
    };
    propertiesContainer.innerHTML = '';
    const getFilteredProperties = function (propertiesList, location, type) {
      return propertiesList.filter(function (property) {
        return (
          (location == PROPERTIES_SELECT_DEFAULT ||
            property.city == location) &&
          (type == PROPERTIES_SELECT_DEFAULT || property.category == type)
        );
      });
    };
    const filteredProperties = getFilteredProperties(
      properties,
      locationSelectValue,
      typeSelectValue
    );
    if (filteredProperties.length > 0) {
      filteredProperties.forEach(function (property) {
        const propertyItem = createPropertyItem(property);
        propertiesContainer.insertAdjacentHTML('afterbegin', propertyItem);
      });
    }
  });

  propertiesContainer.addEventListener('click', function (e) {
    e.preventDefault();
    const viewMoreButton = e.target.closest('.card-button');
    if (e.target == viewMoreButton) {
      parent.location = viewMoreButton.href;
      return;
    }
    const bookmark = e.target.closest('.properties__item-bookmark');
    const bookmarkId = bookmark.dataset.id;
    const isBookmarked = bookmark.classList.contains(
      'properties__item-bookmark--selected'
    );
    const bookmarkedItems =
      JSON.parse(getSessionStorageKey(BOOKMARKS_USER_KEY)) || [];
    if (isBookmarked) {
      const filteredBookmarks = bookmarkedItems.filter(function (bookmark) {
        return bookmark.id != bookmarkId;
      });
      bookmark.classList.remove('properties__item-bookmark--selected');
      bookmark.blur();
      setSessionStorageKey(
        BOOKMARKS_USER_KEY,
        JSON.stringify([...filteredBookmarks])
      );
    } else {
      bookmark.classList.add('properties__item-bookmark--selected');
      bookmark.blur();
      setSessionStorageKey(
        BOOKMARKS_USER_KEY,
        JSON.stringify([...bookmarkedItems, { id: bookmarkId }])
      );
    }
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
  const submitMessageButton = contactForm.querySelector('button');
  const requiredInputs = Array.from([
    nameInput,
    lastnameInput,
    emailInput,
    phoneInput,
    messageInput,
  ]);

  contactForm.addEventListener('submit', async function (e) {
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

    const { code, message } = await fakeApiCall(FAKE_EMAIL_ENDPOINT);
    if (code == SUCCESS_CODE) {
      const successSendedMessageAlert = `
        <div class="alert alert-success mt-4" role="alert">
          ${message} <a href="./index.html" class="alert-link">Go back to our main page.</a>
        </div>`;
      addFormAlertMessage(submitMessageButton, successSendedMessageAlert);
    }
  });

  requiredInputs.forEach(function (element) {
    element.addEventListener('change', function () {
      removeErrorMessage(element);
    });
  });
}
