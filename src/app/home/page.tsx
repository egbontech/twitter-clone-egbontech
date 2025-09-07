import CreatePost from '@/components/CreatePost'
import Posts from '@/components/Posts'
import React from 'react'

export default function Page() {
  return (
    <div>
        <div className='border border-border h-14 grid grid-cols-2 text-white'>
            <button className='cursor-pointer font-semibold hover:bg-hover'>
                For You
            </button>
            <button className='cursor-pointer font-semibold hover:bg-hover'>
                Following
            </button>
        </div>
        <CreatePost/>
        <Posts/>
    </div>
  )
}
