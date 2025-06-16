import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="weather-container"> { }
      <h1>About</h1>
      <p>This is a modern and responsive weather application built with React. It allows users to search and view the current weather for different cities using real-time weather data from a third-party API. The application features a dynamic interface, smooth styling, and is designed with user-friendliness in mind.
      </p>
      <Link to="/">Go back to Weather</Link>
    </div>
  );
}

export default About;