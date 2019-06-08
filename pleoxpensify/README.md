# Pleoxpensify

This app fetches all expenses from the provided API. Allows the user to add notes and upload receipt pictures to each expense.

Technologies and Tools

- Javascript
- React & Redux
- SCSS + CSS variables
- React-bootstrap, React-dropzone
- Eslint, Prettier, Airbnb style guide,
- Enzyme, redux-mock-store

### Folder Structure

```
├── src
│   ├── App.jsx
│   ├── App.scss
│   ├── App.test.js
│   ├── components
│   │   ├── expense-comment
│   │   │   ├── index.jsx
│   │   │   ├── style.scss
│   │   │   └── test
│   │   ├── expense-detail
│   │   │   ├── index.jsx
│   │   │   ├── style.scss
│   │   │   └── test
│   │   ├── expense-list
│   │   │   ├── index.jsx
│   │   │   ├── style.scss
│   │   │   └── test
│   │   │       ├── __snapshots__
│   │   │       │   └── expense-list.test.js.snap
│   │   │       └── expense-list.test.js
│   │   ├── expense-list-filters
│   │   │   ├── index.jsx
│   │   │   ├── style.scss
│   │   │   └── test
│   │   ├── expense-list-item
│   │   │   ├── index.jsx
│   │   │   ├── style.scss
│   │   │   └── test
│   │   │       ├── __snapshots__
│   │   │       │   └── expense-list-item.test.js.snap
│   │   │       └── expense-list-item.test.js
│   │   ├── expense-receipts
│   │   │   ├── index.jsx
│   │   │   ├── receipts-dropzone
│   │   │   │   ├── index.jsx
│   │   │   │   └── style.scss
│   │   │   ├── style.scss
│   │   │   └── test
│   │   ├── header
│   │   │   ├── index.jsx
│   │   │   └── style.scss
│   │   ├── home
│   │   │   ├── index.jsx
│   │   │   └── style.scss
│   │   ├── loader
│   │   │   ├── index.jsx
│   │   │   └── style.scss
│   │   ├── notfound
│   │   │   ├── index.jsx
│   │   │   └── style.scss
│   │   └── pagination
│   │       ├── index.jsx
│   │       └── style.scss
│   ├── index.js
│   ├── index.scss
│   ├── routers.jsx
│   ├── selectors
│   │   ├── index.js
│   │   └── test
│   │       └── selectors.test.js
│   ├── serviceWorker.js
│   ├── setupTests.js
│   ├── state
│   │   ├── action-types
│   │   │   └── index.js
│   │   ├── expenses
│   │   │   ├── actions.js
│   │   │   ├── reducers.js
│   │   │   └── test
│   │   │       ├── actions
│   │   │       │   ├── comments.test.js
│   │   │       │   ├── helpers.js
│   │   │       │   ├── list.test.js
│   │   │       │   └── receipts.test.js
│   │   │       └── reducers.test.js
│   │   ├── filters
│   │   │   ├── actions.js
│   │   │   ├── reducers.js
│   │   │   └── test
│   │   │       ├── actions.test.js
│   │   │       └── reducers.test.js
│   │   ├── initial-state.js
│   │   ├── root-reducer
│   │   │   └── index.js
│   │   └── store
│   │       └── index.js
│   └── utils
│       ├── constants.js
│       ├── fixtures
│       │   └── index.js
│       └── functions.js
```

### Testing

A robust test suite is a vital constituent of quality software. With a good test suite, one can more confidently refactor or add features to an application.
I focused exclusively on `unit test`ing this React application.

For the `Components` I made 3 kinds of assertions:

- Given a set of inputs( state & props ), assert what the component should render.
- Given a user action, assert how the component behaves. The component might make a state update(`mapStateTopProps or setState`) or call a prop-function(`dispatch`) passed to it by a parent.
- Only the rendering of the components without a Redux store are tested, hence, I `export`ed the undecorated named components

For the `Redux` parts;

- `Action Creators:` test whether the correct action creator was called and also whether the correct action creator was returned
- `Async Action Creators:` I used `redux-mock-store` to mock the Redux store completely for tests
- `Reducers:` test whether they return the new state after applying the action to the previous state

### Proposed improvements

- Responsive design
- Improve UI/UX design
- Use Reselect library to implement memoized, composable selector functions for efficient computation of derived data from the Redux store.
- Test React components with data from Redux store
- Write more test cases, including integration test. Full test coverage
- Use `absolute imports` to import internal dependencies

# Other Project Details

- It took me approxiamtely ~ 40 hours (spread over 2weeks ) to design, implement and write unit tests for the project
- Nothing really difficult. Just that it's hard to know when to stop, since there's only one chance of impressing the extremely talented software engineers at Pleo
- I am proud of using Redux for state management and my architecture skills
