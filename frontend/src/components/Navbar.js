import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Import AuthContext

const Navbar = () => {
    const { isAuthenticated, user, logout } = useContext(AuthContext); // Consume context
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login after logout
    };

    const handleNavigateToDashboard = () => {
        if (isAuthenticated) {
            navigate('/dashboard'); // Explicitly navigate to the dashboard
        } else {
            alert('You need to be logged in to access the dashboard.');
        }
    };

    return (
        <nav style={styles.navbar}>
            <h1 style={styles.logo}>Medium Clone</h1>
            <ul style={styles.navLinks}>
                <li>
                    <Link to="/" style={styles.link}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/articles" style={styles.link}>
                        Articles
                    </Link>
                </li>
                <li>
                    <Link to="/about" style={styles.link}>
                        About
                    </Link>
                </li>
                {isAuthenticated ? (
                    <>
                        <li style={styles.user}>
                            <span
                                onClick={handleNavigateToDashboard}
                                style={{ cursor: 'pointer' }}
                            >
                                {user?.name || 'User'}
                            </span>
                        </li>
                        <li>
                            <button onClick={handleLogout} style={styles.logoutButton}>
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" style={styles.link}>
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" style={styles.link}>
                                Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

const styles = {
    navbar: {
        backgroundColor: '#333',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    navLinks: {
        listStyle: 'none',
        display: 'flex',
        gap: '1.5rem',
        padding: 0,
        margin: 0,
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1rem',
    },
    user: {
        fontSize: '1rem',
        color: 'white',
        cursor: 'pointer',
    },
    logoutButton: {
        padding: '5px 10px',
        backgroundColor: '#444',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '4px',
    },
};
