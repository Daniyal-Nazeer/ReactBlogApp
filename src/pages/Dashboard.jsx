import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { auth, getData, sendData, signOutUser } from '../Config/firebase/FirebaseMethod';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button, Typography } from '@mui/material';
import BlogsPost from '../components/BlogsPost';

const Dashboard = () => {
  const navigate = useNavigate();
  const titleRef = useRef();
  const articleRef = useRef();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user.uid);
        const blogsData = await getData("blogs", user.uid);
        // console.log(blogsData);
        setBlogs([...blogsData]);
      } else {
        // Redirect to Home if the user is logged out
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const sendDataFromFireStore = async (event) => {
    event.preventDefault();
    if (titleRef.current.value === '' || articleRef.current.value === '') {
      alert('Please check it!');
    } else {
      const newBlog = {
        title: titleRef.current.value.toUpperCase(),
        article: articleRef.current.value.toUpperCase(),
        uid: auth.currentUser.uid,
        date: new Date().toISOString(), // Add the current date
      };
      setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
  
      await sendData(newBlog, "blogs");
      titleRef.current.value = '';
      articleRef.current.value = '';
    }
  };

  const handleLogout = async () => {
    await signOutUser(); 
    navigate('/'); 
  };


  const getUserProfile = async (userId) => {
    const userDoc = doc(db, "users", userId);
    const userSnapshot = await getDoc(userDoc);
  
    // console.log(userSnapshot);

    if (userSnapshot.exists()) {
      return userSnapshot.data(); // This will return the user's data, including profileUrl
    } else {
      console.error("No such user!");
      return null;
    }
  };

  return (
    <div>
      <Navbar dashbord="Dashboard" />
    
      <div className='bg-[#fff]'>
        <h1 className='ml-[160px] p-3 text-lg font-bold'>Dashboard</h1>
      </div>
      
      <div className='p-3 container mx-auto w-[80%]'>
        <div className='mt-10 p-11 bg-[#fff] mt-9 rounded-lg'>
          <form className='flex flex-col gap-2' onSubmit={sendDataFromFireStore}>
            <input 
              ref={titleRef} 
              className='border rounded pl-2 outline-none border-gray-200 w-[100%] h-[46px]' 
              type="text" 
              placeholder='Title' 
              required 
            />
            <textarea 
              ref={articleRef} 
              className='p-2 w-[100%] rounded border-gray-200 border outline-none' 
              cols='165' 
              rows='6' 
              placeholder='What is in Your Mind' 
              required
            />
            <Button className='w-[20%]' type="submit" variant='contained'>Publish blog</Button>
          </form>
        </div>
        <div className='mt-4'>
          <Typography variant='h4' className='mt-4 font-bold'>
            My Blogs
          </Typography>
          <div className='mt-4 flex flex-col gap-3 rounded-lg'>
            
            {blogs.length > 0 ? blogs.map((item, index) => (
              <BlogsPost key={index} blogs={item} />
            )) : <h1>No Blogs Found...</h1>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
