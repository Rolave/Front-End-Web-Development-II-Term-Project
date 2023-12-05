/* Constants */
const LOGIN_STORAGE_KEY = "turingam-logged";
const HEADER_LOGIN_CLASS = "header__login-list";
const LOGIN_MENU = `
  <ul class="header__login-list">
    <li><a id="login" href="#">Login</a></li>
    <li><a href="#">Sign in</a></li>
  </ul>
`;
const LOGGED_MENU = `
  <ul class="header__login-list">
    <li><a href="#">My profile</a></li>
    <li><a id="logout" href="#">Logout</a></li>
  </ul>
`;

const headerLogin = document.getElementById("header-login");

const setSessionStorageKey = function (key, value) {
  sessionStorage.setItem(key, value);
};

/**
 * @param {string} key 
 * @returns {string}
 */
const getSessionStorageKey = (key) => {
  return sessionStorage.getItem(key);
};

/**
 * @param {string} key 
 */
const removeSessionStorageKey = function (key) {
  sessionStorage.removeItem(key);
}

/**
 * @param {string} htmlString 
 * @returns {HTMLElement}
 */
const convertStringToHTML = function (htmlString) {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, 'text/html');
  return html.body;
}

if (headerLogin) {
  const login = headerLogin.querySelector("#login");
  const isUserLogged = !!getSessionStorageKey(LOGIN_STORAGE_KEY);

  /**
   * @param {HTMLElement} menu 
   */
  const updateUserMenu = function (menu) {
    headerLogin.innerHTML = "";
    const menuHTML = convertStringToHTML(menu);
    headerLogin.appendChild(menuHTML);
  }

  if (login) {
    login.addEventListener("click", function (e) {
      e.preventDefault();
      const logged = prompt("Please enter your password", "Harry Potter");
      setSessionStorageKey(LOGIN_STORAGE_KEY, logged);
      updateUserMenu(LOGGED_MENU);
    });
  }

  if (isUserLogged) {
    updateUserMenu(LOGGED_MENU);
    headerLogin.addEventListener("click", function (e) {
      e.preventDefault();
      const target = e.target;
      const logout = headerLogin.querySelector("#logout");
      if (target == logout) {
        removeSessionStorageKey(LOGIN_STORAGE_KEY);
        updateUserMenu(LOGIN_MENU);
      }
    });
  }
}
