Multi Route Distance Mapping Tool

                                                  
Table of contents

1.	Introduction
2.	Project objective
3.	Development Environment
4.	Libraries Used
5.	Features and  Functionalities
6.	Challenges Encountered
7.	Technological Stack
8.	Testing
9.	Budget
10.	Conclusion
11.	Future Enhancement


Introduction:
The Multi-Route Distance Mapping Tool is a web-based application designed to calculate and display distances between multiple locations on an interactive map. This tool leverages the Mapbox API to provide geolocation services and routing data and is developed using HTML, CSS, JavaScript, and various libraries such as Mapbox GL JS and XLSX.js. The application allows users to manually enter routes or upload files (CSV, JSON, XLSX) containing multiple origin-destination pairs to calculate driving distances.


Project Objective :
The primary objective of this project is to develop an efficient, interactive, and user-friendly multi-route distance calculator without incurring any costs. The application is designed to:
•	Allow users to input multiple locations and visualize routes between them on a map.
•	Calculate the driving distance between specified start and end points.
•	Provide an option to upload CSV, JSON, or Excel files containing route data.
•	Enable the user to download the results as an Excel file.
•	Offer a clean, intuitive UI for interaction with geolocation data.

Development Environment :
The project was developed in the following environment:
•	IDE: Visual Studio Code (VS Code)
•	Version Control: Git for tracking changes
•	Platform: Browser-based application
•	API: Mapbox Directions API for route calculations
•	Libraries Used:
o	Mapbox GL JS: Used for map rendering and interaction.
o	XLSX.js: Used for handling Excel file uploads and downloads.
o	Font Awesome: Icons for enhancing UI interaction.


Features and Functionalities :
Input Options:
•	Users can manually input "From" and "To" locations.
•	An option to add multiple routes using the "Add More Locations" button.
•	File upload capability for CSV, JSON, and Excel files containing multiple route pairs.


Map Integration:
•	The application displays an interactive map using the Mapbox API.
•	When a route is calculated, it draws a line on the map representing the path between two points.
Distance Calculation:
•	Upon entering valid locations, the app calculates the driving distance using the Mapbox Directions API.
•	Distance results are displayed on the webpage, indicating the travel distance in kilometers.
File Upload & Parsing:
•	Supports uploading CSV, JSON, or Excel files.
•	Parses and reads the file data to extract locations and calculate distances.
Results Display & Download:
•	The calculated results (start and end locations, and distances) are displayed dynamically on the page.
•	Users can download the results in an Excel format for further use or analysis.
Clear Functionality:
•	A "Clear" button to reset the map and input fields, removing all markers, routes, and results from the map.

Download Template:
•	A template Excel file can be downloaded for users to easily structure their input data.

Challenges Encountered :
•	Geocoding for locations: Some locations require address-to-coordinate conversion via the Mapbox API, adding complexity in handling inaccurate or ambiguous addresses.
•	File Parsing: Handling different file formats (CSV, JSON, XLSX) and integrating them into a single workflow was a challenge that was tackled using XLSX.js and custom JavaScript parsing logic.
•	Interactive Map: Ensuring smooth interaction between the map and the dynamically updated routes while allowing for multiple routes and markers on the map at the same time was achieved by managing route layers and markers efficiently.

Technological Stack
•	HTML & CSS: For structuring and styling the user interface.
•	JavaScript: For logic implementation, interacting with the Mapbox API, handling file uploads, and manipulating DOM elements.
•	Mapbox API: For rendering the map and calculating the driving routes and distances between locations.
•	XLSX.js: To read Excel files and allow downloading route data in Excel format.
Testing :
Testing was performed across different browsers (Chrome, Firefox, Edge) to ensure cross-browser compatibility. Functionality tests included:
•	Manual input of locations.
•	Uploading and parsing of CSV, JSON, and Excel files.
•	Map rendering and zoom control.
•	Accurate distance calculation between given routes.
•	Clearing map data and resetting inputs.
•	Downloading results in Excel format.

Budget :
The project was developed with a budget of zero. The use of free tools and APIs made this project cost-effective:
•	VS Code: A free code editor was used for development.
•	Mapbox API: The free tier of Mapbox was used, allowing for limited API requests per month without incurring costs.
•	XLSX.js: An open-source JavaScript library for Excel file handling.
•	Font Awesome: Free icons were used to enhance the user interface.



Conclusion :
This project successfully delivers a functional, zero-budget multi-route distance calculator that meets all set objectives. The tool's use of Mapbox API for dynamic route visualization and distance calculation combined with file upload and download functionality provides a robust solution for users needing multi-route distance estimation.
The application is efficient, scalable, and could be expanded further with additional features, such as supporting more advanced routing options (e.g., walking or biking) or integrating user authentication for personalized usage.

Future Enhancements :
•	Optimize the number of API calls: Further development could focus on minimizing the number of API calls when dealing with large datasets.
•	Additional Transportation Modes: Add support for other transportation modes like walking etc., which are available through the Mapbox API.
•	User Authentication: Integrate user authentication and allow users to save routes for future reference.
•	Mobile Optimization: Further enhance the design for mobile responsiveness to improve user experience on smaller devices.
