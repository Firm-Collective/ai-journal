<div align="center">
    <img src="/assets/OneVoiceLogo.png" width="20%" height="20%" alt="OneVoiceEcho-logo">
    <h1>One Voice Echo</h1>
    <h3 align="center">A mobile application to record journal entries for Christians to reflect on their prayers and Bible readings while connecting with others around the world.</h3>
</div>

## Table of Contents
1. [Introduction](#introduction)
2. [Versions and Deployments](#versions-and-deployments)
3. [How to Set Up the Project](#how-to-set-up-the-project)
4. [Style Guide](#style-guide)
5. [Extra Resources](#extra-resources)

## Introduction
### Project Goals:
1. Allow users to authenticate and signup/login to their account
2. Allow users to input and save a text message into the app which is then saved and stored within our database
3. Allow users to record and upload voice memos into the app.

### Target user:
Christians or non-christian users with faith.

### Tools:
- **Expo:** This will be used to build and deploy our project easily. 
- **React Native:** Is the framework we will use to create the project.

## Versions and Deployments
- **Expo:** `~51.0.14`
- **React Native:** `0.74.2`
- **React:** `18.2.0`
- **Node.js:** `20.9.0`
- **NPM:** `6.14.15`
- **TypeScript:** `~5.3.3`

### Deployment Environments
- **Development:** Local environment for development and testing
- **Staging:** Pre-production environment for final testing
- **Production:** Live environment for end-users

## How to Set Up the Project

### Prerequisites
Ensure you have the following installed on your machine:
- Node.js
- npm
- Expo CLI
- For iOS you need to install xcode
- For Android you need to install the Android SDK

### Installation
1. **Clone the repository:**
    ```sh
    git clone https://github.com/Firm-Collective/ai-journal.git
    cd ai-journal
    ```
2. **Install dependencies:**
    ```sh
    npm install
    ```
3. **Set up environment variables:**
   Create a `.env` file in the root of the project and add the necessary environment variables as outlined in the `.env.example` file.

### Creating a Branch 
Before making any changes, create a new branch: 
1. **Create a new branch:** 
    ```sh 
    git checkout -b your-branch-name 
    ``` 
2. **Push the branch to the remote repository:** 
    ```sh 
    git push -u origin your-branch-name 
    ```
## Creating a Pull Request Once you've made your changes and committed them to your branch

### Running the Project
1. **Start the Expo server:**
    ```sh
    npm start
    ```

2. **Run on iOS:**
    ```sh
    npm run ios
    ```

3. **Run on Android:**
    ```sh
    npm run android
    ```

4. **Run on Web:**
    ```sh
    npm run web
    ```

### Additional Commands
- **Running Tests:**
    ```sh
    npm test
    ```

## Style Guide

### Code Formatting
- Use Prettier for code formatting.
- Install the Prettier extension in your code editor.
- Ensure the code is formatted by running:
    ```sh
    npm run format
    ```

### Code Linting
- Use ESLint for linting.
- Follow the Airbnb JavaScript style guide.
- Run linting with:
    ```sh
    npm run lint
    ```

### Naming Conventions
- **Files and Folders:** Use camelCase for filenames and PascalCase for React components.
- **Variables and Functions:** Use camelCase for variables and functions.
- **Constants:** Use UPPER_SNAKE_CASE for constants.

### Commits
- Follow the Conventional Commits specification.
- Example commit message: `feat: add new feature` or `fix: correct a bug`.

## Extra Resources
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [NPM Documentation](https://docs.npmjs.com/)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Prettier Documentation](https://prettier.io/docs/en/index.html)
- [ESLint Documentation](https://eslint.org/docs/user-guide/getting-started)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)


