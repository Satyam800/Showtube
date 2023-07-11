import React from 'react'

const Reply=()=>{
    return (
      <>
      <div className='flex space-x-2 ml-4 py-2'>
        <span className='h-8 w-8 rounded-2xl bg-slate-500'></span>
        <div>
          <input 
          placeholder='Reply to comment '
          className='focus:outline-none border-b-2 w-[90%]'
          />
        </div>
      </div>
      
      </>
    )
  }

export default Reply