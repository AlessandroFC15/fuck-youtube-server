# Fuck Youtube Server

[![CircleCI](https://circleci.com/gh/AlessandroFC15/fuck-youtube-server.svg?style=svg)](https://circleci.com/gh/AlessandroFC15/fuck-youtube-server) ![Heroku](https://heroku-badge.herokuapp.com/?app=fuck-youtube-server) [![codecov](https://codecov.io/gh/AlessandroFC15/fuck-youtube-server/branch/master/graph/badge.svg)](https://codecov.io/gh/AlessandroFC15/fuck-youtube-server)

- This project offers an API that is used by the browser extension called [Fuck Youtube](https://github.com/AlessandroFC15/Fuck-Youtube). The main goal of this project is to provide an alternative video source for YouTube videos that might be blocked on the user's country.

<p align="center">
  <img width="600" src="https://addons.cdn.mozilla.net/user-media/previews/full/193/193308.png">
</p>

**How to run the project locally**
---
To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/AlessandroFC15/fuck-youtube-server

# Go into the repository
$ cd fuck-youtube-server

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

**How to Contribute**
---

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Clone repo and create a new branch: 
```bash
git checkout https://github.com/AlessandroFC15/fuck-youtube-server -b name_for_new_branch
```
2. Make the necessary changes and test
3. Submit a Pull Request with a comprehensive description of changes

**Running the tests**
---
`npm run test`

- Code style used is [StandardJS](https://standardjs.com/) - JavaScript style guide, linter, and formatter

`npm run lint`

**Deployment**
---
* `master` -> automatically deploys to [Heroku](https://fuck-youtube-server.herokuapp.com)

Any other branch is only built for CI.

**License**
---
Distributed under the MIT License. See `LICENSE` for more information.
