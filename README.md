# Area of Interest (AOI) Tile Viewer

## Problem Statement

You have been tasked with creating a user-friendly dashboard that allows users to draw an Area of Interest (AOI) on a map and view the intersecting tiles based on the intersection of the AOI. The primary goal is to provide an intuitive interface for users to select an area and visualize the corresponding tiles.

## Solution Overview

This codebase provides a solution to the above problem using React and Leaflet, a popular JavaScript library for interactive maps. The user interface allows users to draw a custom AOI on the map, and the system will display the tiles that intersect with the drawn AOI.

## Codebase Structure

- `Maps.module.css`: Styling for the components.
- `Maps.js`: The main React component that implements the map and interaction logic.

## Implementation Details

- The codebase utilizes Leaflet and React to create an interactive map.
- Users can draw an AOI on the map using the provided drawing tools.
- The drawn AOI is converted to a polygon and used to determine intersecting tiles.
- The tile data is provided in the `geoData.json` file.
- Intersecting tiles are displayed on the map in red color.
- The map center is set to the latitude and longitude provided.
- The codebase uses `turf.js` for geometric calculations.

## Usage

1. Clone this repository to your local machine.
2. Open a terminal and navigate to the project directory.
3. Install the required dependencies using `npm install`.
4. Replace the `latitude` and `longitude` variables with your desired map center coordinates in `Maps.js`.
5. Start the development server using `npm start`.
6. Open your web browser and go to `http://localhost:3000` to see the AOI Tile Viewer in action.

## Dependencies

- React
- react-leaflet
- leaflet
- leaflet-draw
- @turf/turf

## Notes

- Ensure you have Node.js and npm installed on your system.
- The codebase uses Leaflet and other libraries, so make sure to familiarize yourself with their documentation if needed.
- The solution is focused on the frontend implementation; the backend integration and deployment are not covered in this codebase.

Feel free to explore and modify the codebase to suit your needs. Happy coding!
