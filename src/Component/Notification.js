import React from 'react'
import { useSelector } from 'react-redux'
const Notification = () => {
    const item=useSelector(store=>store.notification.text)
    console.log(item,"iteeeming");

  return (
   <div className='w-80 h-auto flex flex-col font-serif  rounded-lg bg-gradient-to-r from-gray-300 to-stone-700 text-(bg-gradient-to-r from-sky-200 to-pink-200)'>
 {
    item.map((i)=>{
        return <div className='w-full p-2 text-xl' >
            <div className=''>{i}</div>
            <hr className='border-white'/>
        </div>
    })
 }

   </div>
  )
}

export default Notification