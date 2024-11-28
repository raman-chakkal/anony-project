import React, { useState } from 'react';

const Settings = ({ deleteAccount }) => {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = () => {
        if (confirmDelete) {
            deleteAccount();  // Call the delete account function
        } else {
            alert('Please confirm before deleting your account.');
        }
    };

    return (
        <div>
            <h2>Settings</h2>
            <div>
                <button onClick={() => setConfirmDelete(!confirmDelete)}>
                    {confirmDelete ? 'Cancel' : 'Delete Account'}
                </button>
                {confirmDelete && (
                    <button onClick={handleDelete}>Confirm Deletion</button>
                )}
            </div>
        </div>
    );
};

export default Settings;
