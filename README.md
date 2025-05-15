<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/zjpiazza/skyterm">
    <img src="assets/logo.png" alt="Logo">
  </a>

<h3 align="center">Skyterm</h3>

  <p align="center">
    ADS-B Flight tracker using FlightAware
    <br />
    <a href="https://github.com/zjpiazza/skyterm"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://skyterm.dev">View Demo</a>
    &middot;
    <a href="https://github.com/zjpiazza/skyterm/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/zjpiazza/skyterm/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
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
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Screen Shot][product-screenshot]](./assets/skyterm-screenshot.png)

SkyTerm is a React-based web application designed for real-time flight tracking using ADS-B (Automatic Dependent Surveillance-Broadcast) data. It leverages Supabase Realtime to stream live updates directly from an ADS-B device connected to a Raspberry Pi. I actually got the hardware for tracking flights several years ago, but didn't particularly like the provided map interface, so I made my own!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Supabase][Supabase.com]][Supabase-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

In order to get live data into the dashboard, you will need to configure the Skyterm Agent. See the project page for more information about required hardware and setup.

### Prerequisites

- Supabase Instance
  - *If you plan on deploying to production, will need to create a paid account. If you just want to run locally, you can use the CLI to start a local stack: [Local Dev](https://supabase.com/docs/guides/local-development)*
- [Skyterm Agent](https://github.com/zjpiazza/skyterm-agent)
  
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/zjpiazza/skyterm.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter the Supabase environment variables
   ```sh
   VITE_SUPABASE_URL = ""
   VITE_SUPABASE_ANON_KEY = ""
   ```
4. Run the project
   ```sh
   npm dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [ ] **Collect and Analyze Analytics of Flights Over Time**
    - Implement data logging for flight paths, altitudes, speeds, and timestamps.
    - Develop a basic dashboard to visualize trends (e.g., busiest times, common routes).
    - Enable export of analytics data as CSV for user analysis.
- [ ] **Real-Time Alerts and Notifications**
    - Add custom alerts for specific flights or airports (e.g., delays, takeoffs).
    - Implement emergency squawk code detection (7500, 7600, 7700) with push notifications.
- [ ] **Enhanced Filtering Options**
    - Allow users to filter flights by altitude, speed, aircraft type, or airline.
    - Add a search feature for squawk codes to quickly identify specific aircraft.

See the [open issues](https://github.com/zjpiazza/skyterm/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the project_license.

See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/zjpiazza/skyterm.svg?style=for-the-badge
[contributors-url]: https://github.com/zjpiazza/skyterm/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/zjpiazza/skyterm.svg?style=for-the-badge
[forks-url]: https://github.com/zjpiazza/skyterm/network/members
[stars-shield]: https://img.shields.io/github/stars/zjpiazza/skyterm.svg?style=for-the-badge
[stars-url]: https://github.com/zjpiazza/skyterm/stargazers
[issues-shield]: https://img.shields.io/github/issues/zjpiazza/skyterm.svg?style=for-the-badge
[issues-url]: https://github.com/zjpiazza/skyterm/issues
[license-shield]: https://img.shields.io/github/license/zjpiazza/skyterm.svg?style=for-the-badge
[license-url]: https://github.com/zjpiazza/skyterm/blob/master/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username

[product-screenshot]: assets/skyterm-screenshot.png


[React.js]: https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB
[React-url]: https://reactjs.org/
[Supabase.com]: https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff
[Supabase-url]: https://supabase.com