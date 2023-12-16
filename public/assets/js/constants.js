/* Constants */
// Endpoints
const FAKE_PROPERTIES_ENDPOINT = './assets/mocks/properties.json';
const FAKE_USERS_ENDPOINT = './assets/mocks/users.json';
const FAKE_EMAIL_ENDPOINT = './assets/mocks/email-success.json';

// Cookies
const COOKIE_PREFIX = 'turingam-app';
const LOGIN_STORAGE_KEY = `${COOKIE_PREFIX}-logged`;
const LOGIN_STORAGE_USER_KEY = `${COOKIE_PREFIX}-user`;
const BOOKMARKS_USER_KEY = `${COOKIE_PREFIX}-bookmarks`;

// Elements
const HEADER_LOGIN_CLASS = 'header__login-list';

// HTML Elements
const LOGIN_MENU = `
  <ul class="header__login-list">
    <li><a href="./login.html">Login</a></li>
    <li><a href="./sign-up.html">Sign in</a></li>
  </ul>
`;
const LOGGED_MENU = `
  <ul class="header__login-list">
    <li><a href="./my-profile.html">My profile</a></li>
    <li><a id="logout" href="./index.html">Logout</a></li>
  </ul>
`;

// Messages
const REQUIRED_FIELD_MESSAGE = 'This field is required.';
const INVALID_EMAIL_MESSAGE = 'Invalid email address.';

// Default Values
PROPERTIES_SELECT_DEFAULT = 'All';
SUCCESS_CODE = 'success';
