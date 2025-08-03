import { useState } from 'react';

import { UserContext } from './UserContext.jsx';

export const UserProvider = ({ children }) => {
  const [lunchbox, setLunchbox] = useState({});
  const [name, setName] = useState("");

  return (
    <UserContext.Provider value={{ lunchbox, setLunchbox, name, setName }}>
      {children}
    </UserContext.Provider>
  );
};