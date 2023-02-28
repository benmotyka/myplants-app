<a name="readme-top"></a>

<br />
<div align="center">
  <a href="https://github.com/benmotyka/my-plants_app">
    <img src="readme/banner.png" alt="Banner">
  </a>
  <h1 align="center">My Plants</h1>
  <h5 align="center">Mobile App</h5>
  <p align="center">
    <a href="https://github.com/benmotyka/my-plants_app/issues">Report Bug</a>
    ·
    <a href="https://github.com/benmotyka/my-plants_app/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#deployment">Deployment</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

My Plants is a free and open source mobile app that helps to manage watering of plants. App users can add plants to their collection and manage them, and then mark them as watered upon every watering. Users can import plants of other users, in order to water them together, view history of watering for their plants, add images to their plants or set reminders so they get push notification when the plant should be watered. 

<br />

<p align="center">
  <!-- <a href="https://apps.apple.com">
    <img alt="app-store" src="readme/app-store.png" />
  </a> -->
  <a href="https://play.google.com/store/apps/details?id=com.benmotyka.myplants">
    <img alt="google-play" src="readme/google-play.png" />
  </a>
</p>

### Built With

* [Expo](https://expo.dev/)
* [React Native](https://reactnative.dev/)
* [styled-components](https://styled-components.com/)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [My Plants Server](https://github.com/benmotyka/my-plants_api)
- [Sentry](https://sentry.io/)

### Installation

1. Clone this repo and enter project
   ```sh
   git clone https://github.com/benmotyka/my-plants_app.git
   cd my-plants_app/
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run server (please refer to [https://github.com/benmotyka/my-plants_api](https://github.com/benmotyka/my-plants_api)) for more details
4. Create `.env` file and enter:
   ```
   API_URL=<my-plants_server_url> // eg: http://localhost:3000

   SENTRY_DSN=<sentry_dsn>
   SENTRY_ORGANIZATION=<sentry_organization>
   SENTRY_PROJECT=<sentry_project_name>
   SENTRY_AUTHTOKEN=<sentry_authorization_token>
   BASIC_AUTH_USERNAME=<basicauth_username>
   BASIC_AUTH_USERNAME=<basicauth_password>
   ```
5. Run app
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Deployment

1. Add `google-services.json` file to `keys/`
2. Convert key to base64-encoded string: 
   ```sh
   base64 keys/google-services.json
   ```
3. Create eas secret:
   ```sh
   eas secret:create
   
   key=GOOGLE_SERVICES_BASE64
   value=<base64_encoded_string>
   ```
4. Increase versionCode in `app.config.js`
5. Build project
   ```sh
   npm run deploy:build
   ```
6. Pubish project
   ```sh
   npm run deploy:publish  
   ```
7. Create new release on `https://play.google.com/console`

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Ben Motyka - [LinkedIn](https://www.linkedin.com/in/ben-motyka-97a729240/) - benmotykax@gmail.com

Project Link: [https://github.com/benmotyka/my-plants_app](https://github.com/benmotyka/my-plants_app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [My Plants Website](https://github.com/benmotyka/my-plants_front)
* [My Plants Server App](https://github.com/benmotyka/my-plants_api)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
