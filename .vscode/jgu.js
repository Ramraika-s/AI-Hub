// src/components/Dashboard/Dashboard.js
import React from 'react';
import { auth } from '../../firebase/firebase';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const history = useHistory();

    const handleLogout = async () => {
        await auth.signOut();
        history.push('/login');
    };

    return (
        <div className="dashboard-container">
            <h2>Welcome to your Dashboard!</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;