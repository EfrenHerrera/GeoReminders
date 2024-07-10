# My React Native Project

Welcome to My React Native Project! This application is built using React Native and Expo CLI. Follow the instructions below to set up, compile, run, and test the application in a development environment.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Building the Application](#building-the-application)
- [Testing the Application](#testing-the-application)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v18 or later): [Download Node.js](https://nodejs.org/)
- Expo CLI: Install globally using `npm install -g expo-cli`
- Git: [Download Git](https://git-scm.com/)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/EfrenHerrera/Test-Desarrollador-Mobile-Senior-EDT.git
    ```

2. Navigate to directory
    ```sh 
    cd Test-Desarrollador-Mobile-Senior-EDT
    ```

3. Install dependencies:

    ```sh
    npm install
    ```

## Running the Application

1. Start the Expo development server:

    ```sh
    npx expo start
    ```

2. Choose your preferred method to run the application:

    - Scan the QR code with the Expo Go app on your Android/iOS device.
    - Press `a` to run on an Android emulator.
    - Press `i` to run on an iOS simulator (macOS only).

   Note: to run the application on iOS, run the following command and select the desired device in your terminal. Remember that you must have your phone connected to the computer.
    ```sh
    npx expo run:ios --device
    ```

## Building the Application

To create a production-ready build of your application, follow these steps:

1. Ensure you are logged into Expo:

    ```sh
    npx expo login
    ```

2. Create a build for Android:

    ```sh
    npx expo build:android
    ```

3. Create a build for iOS:

    ```sh
    npx expo build:ios
    ```

After the build completes, you will receive a URL to download the APK (Android) or IPA (iOS) file.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
