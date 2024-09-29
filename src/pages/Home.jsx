import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getAllData, getData } from '../Config/firebase/FirebaseMethod'; // Ensure getData is imported
import { Typography } from '@mui/material';
import BlogsPost from '../components/BlogsPost';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState('');

  useEffect(() => {
    // Fetch all blogs regardless of user authentication
    const fetchBlogs = async () => {
      try {
        const blogsData = await getAllData("blogs");
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const userData = await getAllData("users");

        // console.log(userData)

        setUsers(userData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };



    fetchBlogs(); 

    

    return () => fetchUsers();
  }, []);

  return (
    <div>
      <Navbar  />
      <div className='bg-[#fff]'>
        <h1 className='ml-[160px] p-3 text-lg font-bold'>Good Morning Readers!</h1>
      </div>
      <div className='p-3 container mx-auto w-[80%]'>
        <div className='mt-4'>
          <Typography variant='h4' className='mt-4 font-bold'>
            All Blogs
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
};

export default Home;
