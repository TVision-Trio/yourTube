# yourTube
TV Calendar for Code Fellows 301 Project

## Project Pitch
There are so many TV shows on the air right now, how can one person possibly find what to watch?

Enter YourTube: your very own TV scheduler!

With our product, a user will select parameters that they want in a show and tell us their schedule. Then they will be presented with a schedule view for that week with each show that matches their parameters as well as the time. They will be free to select which ones they would like to watch.

The schedule is mobile, customizable, and designed with usability in mind.

## Collaborators
Alana Franklin has a Bachelor of Music in Vocal Performance. Over the five years as she worked administrative jobs for local tech companies including Headsprout, SpaceCurve, and Amazon. She is currently going through apprentice training with the Apprenti program for software development. Outside of work, Alana enjoys traveling, Crossfit, and watching an impressive amount of tv.

John Gaines is starting a career in tech after a 25 year career at sea. He is a part of the software development apprentice training program at Apprenti. He enjoys working on various technological projects and playing the guitar.

Aeone Singson has an Associate of Science Degree in computer science and is currently working on the Apprenti program software development apprentice training track. Her hobbies include reading, thinking about robots, and drawing. Her passions include spreading technology access and education and volunteering in the community.

## Technical

YourTube utilizes jQuery and Handlebars (HTML templating) to create a single-page application on the client side, along with a mobile-first, responsive UI. A Node.js server interacts with the TVMaze API to retrieve television schedule data. The server also interacts with a PostgreSQL database, where we hold data about our users and their preferences, in order to populate our page when the user selects their name. The site is deployed on Heroku, and was planned using Agile methodologies during a weeklong sprint.
