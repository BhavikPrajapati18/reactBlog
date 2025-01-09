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
    <div className='w-full bg-[#002D3D] rounded-md p-4 my-4'>
      <div className='w-full justify-center mb-4'>
        <img src={appwriteService.getFilePreview(featuredImage)} alt={title} />
      </div>    
      <div>
        <h1 className='text-xl font-bold text-[#F7F3F3]'>{title}</h1>
      </div>
    </div>
    </Link>
  )
}


export default PostCards
