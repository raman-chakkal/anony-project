import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from '../services/authService';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile();
                setUser(profileData);
                setFormData({ name: profileData.name, email: profileData.email });
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateProfile(formData);
            setUser(updatedUser);
            setEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    const handleWriteArticle = () => {
        navigate('/write-article');
    };

    return (
        <div>
            <h1>Welcome to Your Dashboard</h1>
            {user && (
                <div>
                    <h2>User Profile</h2>
                    {!editing ? (
                        <div>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <button onClick={() => setEditing(true)}>Edit Profile</button>
                        </div>
                    ) : (
                        <form onSubmit={handleUpdate}>
                            <div>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit">Save Changes</button>
                            <button type="button" onClick={() => setEditing(false)}>
                                Cancel
                            </button>
                        </form>
                    )}
                </div>
            )}
            <button
                onClick={handleWriteArticle}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#333',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '4px',
                }}
            >
                Write an Article
            </button>
        </div>
    );
};

export default Dashboard;
