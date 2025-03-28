// write the page one of the mainPage component
// this includes asking for the first name and last name of the user
// and checkboxes to verify if they are in engsci and in second year

import React, { useState } from 'react';

const MainPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isEngSci, setIsEngSci] = useState(false);
    const [isSecondYear, setIsSecondYear] = useState(false);
    
    return (
        <div>
        <h1>Welcome to the Main Page</h1>
        <label>
            First Name:
            <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            />
        </label>
        <label>
            Last Name:
            <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            />
        </label>
        <label>
            <input
            type="checkbox"
            checked={isEngSci}
            onChange={(e) => setIsEngSci(e.target.checked)}
            />
            I am in EngSci
        </label>
        <label>
            <input
            type="checkbox"
            checked={isSecondYear}
            onChange={(e) => setIsSecondYear(e.target.checked)}
            />
            I am in second year
        </label>
        </div>
    );
    };

export default MainPage;