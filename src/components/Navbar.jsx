import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../Config/firebase/FirebaseMethod';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const Navbar = ({ fullName }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set true if user is logged in
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <section className='bg-blue-500'>
      <nav className='p-4 text-white mx-auto container w-[80%] flex justify-between'>
        <div>
          <Typography variant='h6'>
            Personal Blogging App
          </Typography>
        </div>
        <div>
          <ul className='flex gap-2'>
            {/* <li><Link to='./'>{fullName ? `Welcome, ${fullName}` : 'Home'}</Link></li>   */}
            <li>
              {isLoggedIn 
                ? <button onClick={handleLogout} className="text-white">Logout</button> 
                : <Link to='/login' className="text-white">Login</Link>
              }
            </li>
            {/* <li><Link to='/register' className="text-white">Register</Link></li> */}
          </ul>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
