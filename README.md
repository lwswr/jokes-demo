# Demo

- https://lwswr.github.io/jokes-demo/

# Functioning Features

- Axios get request to the JokesAPI and returns 10 jokes which are displayed in a list.
- The jokes are displayed in two ways depending on their type, whether it's single or a two part joke.
- Updating the category in the serach form makes another call to the api returning only jokes of the chosen category.
- Keywords search impemented calling to api on every change to the input field.
- Form to allow user to submit there own joke to the API which also allows for both single and two part joke types. The post request also returns and displays the message of the response to the user.
- I have also added a couple of basic test cases to ensure correct rendering of the App and returning 10 jokes.

# Performance

- Added debounce to the joke submission form preventing spamming of submissions.
- Added throttle to the keyword search form stopping excessive api calls. Even thought the API seems to be stable without.

# Possible Additional Features

- Page navigation interface.
- User input on how many jokes are displayed on the page.
