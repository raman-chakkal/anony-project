import React from 'react';
import '../styles/About.css';  // If you have custom styles for the About page

const About = () => {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>Welcome to Anony, your platform to explore and share articles.</p>
            <p>
                Anony is dedicated to providing a platform where users can write and read articles on various topics.
                Our goal is to foster a community of writers and readers who value free expression and creativity.
            </p>
            <h2>Features</h2>
            <ul>
                <li>Write and publish your articles.</li>
                <li>Explore a variety of topics and articles written by other users.</li>
                <li>Interact with the community by commenting on articles.</li>
                <li>Manage your account, settings, and profile with ease.</li>
            </ul>
            <h2>Contact Us</h2>
            <p>If you have any questions, feel free to contact us at <strong>support@anony.com</strong>.</p>
        </div>
    );
};

export default About;
