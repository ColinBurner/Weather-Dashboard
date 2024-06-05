# Weather-Dashboard
This is a repository for a dynamic weather dashboard.

## What I did to accomplish goals in this project
I used the OpenWeather API to dynamically update the HTML with realtime weather information based on city input in the search form. Using lat and lon in geodata, the function specifically finds the city that was searched. I used openweather image sources to include icons that represent the weather forecast for that day. I used the slice method to make sure the five day forecast starts at the next day instead of the "today" that is already displaying in the today section. Made sure to change the default "metric" system to "imperial" within the API parameters so that the temperature shows as F instead of C. I used localstorage to store data from past city searches and display a functional button that will bring that city's weather data back up upon click. I used CSS styling to polish the UI and make it a bit more pleasing to look at during use. 

## Visuals
![Landing page before search](https://github.com/ColinBurner/Weather-Dashboard/assets/85810714/abe6abb6-d9c2-4b9a-9ca3-29a18bf8e89d)

In this first screenshot you see the initial landing page with the search form for finding weather for a specific city.

![Landing page after search](https://github.com/ColinBurner/Weather-Dashboard/assets/85810714/2ea6d98d-61a2-4cea-a8aa-433144a72bf4)

In this screenshot you see the landing page after a city name is put in the form, the city is saved below the search bar in the "search history" section. The weather data for that city is displayed in the sections for "today's weather" and "5-day forecast."

![Search history list including hover example](https://github.com/ColinBurner/Weather-Dashboard/assets/85810714/9d881754-a5cd-4d97-bd4a-9c2376670610)

In this screenshot you can see the list of cities that have been searched taken from local storage, including the hover styling that changes the button color based on hover.

![5 day forecast](https://github.com/ColinBurner/Weather-Dashboard/assets/85810714/4330935d-5041-4f22-954f-df3dbb6cc90e)

This screenshot demonstrates the 5-day forecast section of the results portion of the webpage.

![function that fetches weather by the city using api key](https://github.com/ColinBurner/Weather-Dashboard/assets/85810714/158fa9fc-6dab-4987-bb89-c64317b3511b)

This screenshot displays the fetchWeather function code in JavaScript using geoData with lon and lat to pull the city's location for specific weather data.

![localstorage](https://github.com/ColinBurner/Weather-Dashboard/assets/85810714/d3a2c498-650f-43e3-b21c-9c5896d21c9d)

This screenshot shows the array of cities searched as they appear in local storage.

## Usage
This web page is designed to help travelers see the weather outlook for multiple cities so that they can plan their trips accordingly. Upon arriving on the landing page you are met with a search bar that asks for a city to be input. When you input a city, the weather forecast for the current day and the next five days are displayed in the results section including temperature, humidity, wind speed and an icon that represents the type of weather expected for each day. Upon each search, the search history section under the search bar is dynamically updated with each previously searched city. Those cities appear as buttons that when clicked, the results page shows their weather forecasts again.

## Here is a link to the deployed webpage:

https://colinburner.github.io/Weather-Dashboard/

## For support issues, contact me at the email below

<a href="mailto: b2rn3r@yahoo.com">b2rn3r@yahoo.com</a>

## Roadmap
This weather dashboard is finished.

## License
MIT
