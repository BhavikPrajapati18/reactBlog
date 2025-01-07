import React from 'react'
import appwriteService from '../../appwrite/config'
import {Link} from 'react-router-dom'

function PostCards({
  featuredImage,
  $id,
  title
}) {
  return (
    <Link to={`/post/${$id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
      <div className='w-full justify-center mb-4'>
        <img src={appwriteService.getFilePreview(featuredImage)} alt={title} />
      </div>    
      <div>
        <h1 className='text-xl font-bold'>{title}</h1>
      </div>
    </div>
    </Link>
  )
}


export default PostCards
