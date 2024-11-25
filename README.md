# bday-reminder

Project idea:\
Czy znarzyło Ci się zapomnieć o urodzinach Twojego najlepszego przyjaciela lub rodziny? Mi się zdarzyło, dlatego też postanowiłem napisać aplikację do zapisywania urodzin. Teraz wszystkie daty mam w jednym miejscu.

Project description:\
[in progress] A web application to store your birthday dates [React.js]

## Table of contents

- [Overview](#overview)
  - [How to start](#how-to-start)
  - [Database design](#database-design)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Useful resources](#useful-resources)

## Overview

[in progress]

### How to start

[in progress]

### Database schema

![](./readme/***)

### Screenshot

- Sign in / Sign up page

![](./readme/sign_in_sign_up.jpg)

- Frontend textfields validation

![](./readme/frontend_textfield_validation.jpg)

- Home page with greeting, date, time, todays namedays and information about todays birthdays

![](./readme/home_page.jpg)

- Profile page with birthday cards

![](./readme/dashboard_with_birthday_cards.jpg)

- Highlighted today's birthday

![](./readme/highlighted_todays_birthday.jpg)

- Collapsed add birthday form

![](./readme/add_birthday_form_collapsed.jpg)

- Expanded add birthday form

![](./readme/add_birthday_form_expanded.jpg)

- Birthday card actions

![](./readme/birthday_card_actions.jpg)

- Edit birthday data modal

![](./readme/edit_birthday_card_modal.jpg)

- Birthdays bar chart

![](./readme/birthdays_bar_chart.jpg)

- Mobile menu

![](./readme/mobile_menu.jpg)

- Mobile profile page

![](./readme/mobile_dashboard.jpg)

## My process

### Built with

Backend - API:

- Node.js project using Express.js,
- 'pg' package for working with localhost PostgreSQL database,
- 'express-validator' package to validate data send from the frontend through API calls,
- 'cors' package to get more control over which websites access your server's recources.
- Passport Strategy for authenticating with username and password,
- included appropriate response codes for the HTTP requests,

Frontend:

- JavaScript, React.js,
- Material UI,
- Vite.js,
- HTML, CSS,
- MUI X Components: bar chart,
- Custom components,
- React Hooks: useEffect, useState, custom hooks,
- Axios for making HTTP requests to the API and handle responses,
- Mobile First Approach,

### Useful resources

- [Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/?couponCode=KEEPLEARNING)
- [Express.js documentation](https://expressjs.com/)
- [Node.js documentation](https://nodejs.org/docs/latest/api/)
- [Axios documentation](https://axios-http.com/docs/intro)
- [Postgres documentation](https://www.postgresql.org/)
- [Założenia REST API](https://devszczepaniak.pl/wprowadzenie-do-rest-api/)
- [React.js documentation](https://legacy.reactjs.org/)
- [How to code in React.js](https://www.digitalocean.com/community/tutorial-series/how-to-code-in-react-js)
- [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [Single Page Application](https://kissdigital.com/pl/blog/single-page-application-jak-dziala-spa-i-czym-sie-rozni-od-mpa)
- [How to Configure Proxy in Vite?](https://www.geeksforgeeks.org/how-to-configure-proxy-in-vite/)
- [How to Configure CORS in Node.js With Express](https://dev.to/speaklouder/how-to-configure-cors-in-nodejs-with-express-11h)
- [Passport strategy for authenticating with a username and password.](https://www.passportjs.org/packages/passport-local/)
- [Name Day API.](https://nameday.abalin.net/docs/)
