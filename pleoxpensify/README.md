# Pleoxpensify

This app fetches all expenses from the provided API. Allows the user to add notes and upload receipt pictures to each expense.

Technologies and Tools

- Javascript
- React & Redux
- SCSS
- React-bootstrap, React-dropzone
- Eslint, Prettier, Airbnb style guide

### Folder Structure

├── App.js
├── App.scss
├── App.test.js
├── components
│   ├── expense-comment
│   │   ├── index.jsx
│   │   ├── style.scss
│   │   └── test
│   ├── expense-detail
│   │   ├── index.jsx
│   │   ├── style.scss
│   │   └── test
│   ├── expense-list
│   │   ├── index.jsx
│   │   ├── style.scss
│   │   └── test
│   ├── expense-list-filters
│   │   ├── index.jsx
│   │   ├── style.scss
│   │   └── test
│   ├── expense-list-item
│   │   ├── index.jsx
│   │   ├── style.scss
│   │   └── test
│   ├── expense-receipts
│   │   ├── index.jsx
│   │   ├── style.scss
│   │   └── test
│   ├── header
│   │   ├── index.jsx
│   │   └── style.scss
│   ├── home
│   │   ├── index.jsx
│   │   └── style.scss
│   ├── loader
│   │   ├── index.jsx
│   │   └── style.scss
│   ├── notfound
│   │   ├── index.jsx
│   │   └── style.scss
│   └── pagination
│   ├── index.jsx
│   └── style.scss
├── index.css
├── index.js
├── routers.jsx
├── serviceWorker.js
├── state
│   ├── action-types
│   │   └── index.js
│   ├── expenses
│   │   ├── actions.js
│   │   ├── reducers.js
│   │   └── test
│   │   ├── actions.test.js
│   │   └── reducers.test.js
│   ├── filters
│   │   ├── actions.js
│   │   ├── reducers.js
│   │   └── test
│   │   ├── actions.test.js
│   │   └── reducers.test.js
│   ├── root-reducer
│   │   └── index.js
│   └── store
│   └── index.js
└── utils
├── constants.js
└── functions.js
