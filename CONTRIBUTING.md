# 😒 Installing

You need to install the following things:

- [Git](https://git-scm.com)
- [NodeJS V14+](https://nodejs.org)
- Yarn (type npm i -g yarn)

# ⚡ Setup

In order to contribute you need to fork the repo.

Once you've forked it, clone the repo on your machine (or an online code editor like gitpod).

No need to install dependencies, we use Yarn [Berry](https://github.com/yarnpkg/berry) - a glorified name for Yarn 2. We use the PnP (PlugNPlay) feature on Yarn to allow for 0 installs. (all though, to be sure, run `yarn`)

Some things to keep in mind:

- We use [husky](https://github.com/typicode/husky) - if it doesn't work, try running `yarn add husky`, if it still doesn't, don't worry, simply run the following commands:
  `yarn doctor`, `yarn analyze`, `git add .`, `lint-staged` - if possible try and get husky working, as we use commitlint to make sure commit messages follow a strict standard.
- We use [prettier](https://prettier.io) as a linter.

# 🤯 Writing the code

Just fork the project and make a pull request on github. We will review it and then accept or decline it according to the code itself.

# 👍 PR standards

We expect PRs to follow a few guidelines, for example:

- If you add an info command and a fun command in one PR it'll most likely be denied, because 1 PR = 1 thing

- If you add 2 fun commands that are similar, they'll most likely be merged.

This is an example, but it should shine some light on how we accept PRs.

We also expect you to be active in the PRs, if we add a review, or request changes, we expect you to be able to get it done.

# 👏 Recommendations

- [Visual Studio Code](https://code.visualstudio.com) - Code editing redefined.

# 🚀 Want to change something?

Please make a PR to change anything! Spelling mistakes, code flaws, performance issues, as long as it's valid, follows our guidelines, you'll most likely be accepted. Happy hacking! 😉

