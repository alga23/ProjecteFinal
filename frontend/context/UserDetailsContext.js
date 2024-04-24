import React, { createContext, useContext, useState } from 'react';

export const UserDetailsContext = createContext()

export const UserDetailsProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null)

    const updateUserDetails = (newDetails) => {
        setUserDetails(newDetails);
    };

    return (
        <UserDetailsContext.Provider value={{ userDetails, updateUserDetails }}>
            {children}
        </UserDetailsContext.Provider>
    )
}
