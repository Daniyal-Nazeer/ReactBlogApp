import { Typography } from '@mui/material'
import React from 'react'

const BlogsPost = ({blogs}) => {
    const { title, article} = blogs

    return (
        <>
            <div className='bg-white p-5 border border-gray-300 '>
                <img />
                <Typography variant='h4' className=''>{title}</Typography>
                
                <p className='mt-3'>{article}</p>
            </div>
        </>
    )
}

export default BlogsPost