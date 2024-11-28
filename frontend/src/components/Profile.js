import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ user, updateUser }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track error state

    // Fetch user profile data on component mount
    useEffect(() => {
        // Fetch profile data from the backend when the component mounts
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Send the token from localStorage
                    },
                });
                // Update the profile data from the response
                setFormData({
                    name: response.data.name,
                    email: response.data.email
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to load profile. Please try again later.');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update profile on the backend (optional)
            await axios.put(
                'http://localhost:5000/api/profile', 
                formData, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            updateUser(formData); // Update user data in the parent component
            setIsEditing(false);
        } catch (err) {
            setError('Failed to update profile.');
        }
    };

    if (loading) {
        return <p>Loading profile...</p>;
    }

    return (
        <div>
            <h2>Profile</h2>
            {error && <p className="error">{error}</p>}
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Save Changes</button>
                </form>
            ) : (
                <div>
                    <p>Name: {formData.name}</p>
                    <p>Email: {formData.email}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
