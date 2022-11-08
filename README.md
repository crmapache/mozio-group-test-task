# The Task
Imagine you've been hired to write an app that will allow people to perform searches to know the distance of a route that may consist of 2 or more cities, to allow them to plan their travel.

Imagine that the backend API can NOT return you the full list of cities, and you’ll need to search the cities with a keyword.

The app should consist of two pages: the search form (home page) and the search results.

On the home page there should be a search form. The form should consist of the following fields:
City of origin. Required to fill. A searchable dropdown (combobox) with a list of cities. The list of cities should be requested and searched asynchronously with the loading indication.
Intermediate cities. Same as City of origin. There should be a way to add/remove multiple intermediate cities. No intermediate cities should be shown when the page is first loaded. If an intermediate city is added it has to be filled.
City of destination. Required to fill. Same as City of origin.
Date of the trip. Required to fill. Should be a date in the future.
Number of passengers. Required to fill. Should be a number greater than 0.

The form should be validated. If some field has an invalid value the error should be shown around the problematic field and the submit button should be disabled. The submit button when clicked should navigate to the search results page.

The home page should allow deep-linking: form data should store in the URL, so when a user copy and share the link, the form can be pre-filled with the data from the URL parameters.

On the search results page all the fields filled on the home page should be displayed. The distance of the route (in kilometers) should be calculated and displayed: between subsequent cities of the route and the total distance. The distance calculation should be performed asynchronously with loading indication and error handling.

The search results page should take all parameters from the URL, meaning that the link to a particular search result can be shared with others.
Technical Requirements
The application should be implemented as a SPA (single page application) using React. Usage of libraries to speed up the development and app quality is very welcome, as well as usage of a design system of your choice to provide the best user experience possible in the shortest time frame. Usage of a typing system (TypeScript, Flow Types) is a big plus.

To implement a cities database hardcode the list of cities and simulate the delay of requesting the cities. You can find an example list of cities in the Appendix A. The fake backend should have two endpoints (functions). The first endpoint receives a keyword and returns a list of cities that match the keyword. The second endpoint receives a list of cities and calculates the distances.

When a user attempts to find cities using the phrase “fail” (case-insensitive) the mocked API should fail to return results to demonstrate the error handling abilities of the UI.

To implement the distance calculation use Haversine distance formula and simulate the delay of the calculation. When “Dijon” city is involved the distance calculation should fail to demonstrate the error handling abilities of the UI.

Deploy your app to the place of your choice, share a link that we can open to play with the app. Publish your source code to GitHub/GitLab/Bitbucket and share the publicly accessible link to the repository so we can analyze the code.

You will have bonus points if you will demonstrate how the app can be tested using unit tests and e2e tests, no full coverage required.

We hope you will enjoy working on the project.

Good luck!
Appendix A
Cities of France. Name, Latitude, Longitude.
```
[
    ['Paris', 48.856614, 2.352222],
    ['Marseille', 43.296482, 5.369780],
    ['Lyon', 45.764043, 4.835659],
    ['Toulouse', 43.604652, 1.444209],
    ['Nice', 43.710173, 7.261953],
    ['Nantes', 47.218371, -1.553621],
    ['Strasbourg', 48.573405, 7.752111],
    ['Montpellier', 43.610769, 3.876716],
    ['Bordeaux', 44.837789, -0.579180],
    ['Lille', 50.629250, 3.057256],
    ['Rennes', 48.117266, -1.677793],
    ['Reims', 49.258329, 4.031696],
    ['Le Havre', 49.494370, 0.107929],
    ['Saint-Étienne', 45.439695, 4.387178],
    ['Toulon', 43.124228, 5.928000],
    ['Angers', 47.478419, -0.563166],
    ['Grenoble', 45.188529, 5.724524],
    ['Dijon', 47.322047, 5.041480],
    ['Nîmes', 43.836699, 4.360054],
    ['Aix-en-Provence', 43.529742, 5.447427],
]
```
