import React,{useEffect,useState,useRef} from 'react'
import { createNotes } from '../../Utils/noteSlice'
import {useDispatch,useSelector} from "react-redux"
import NotesCard from './NotesCard'
import { useSearchParams } from 'react-router-dom'
const Notes = () => {
const titleRef=useRef()
const NoteRef=useRef()
const dispatch=useDispatch()
const notetime= useSelector(store=>store.notes.time)

const [param]=useSearchParams()
const handleSave=()=>{
 dispatch(createNotes({
  title:titleRef.current.value,
  notes:NoteRef.current.value,
  userId:JSON.parse(localStorage.getItem("id")),
  videoId:param.get("v"),
  time:notetime
 }))
 titleRef.current.value=null
 NoteRef.current.value=null

}
  return (
   <div className='flex flex-col z-0 bg-red-300 rounded-md shadow-lg p-2 overflow-y-scroll '>
    <p className='font-bold'>Note</p>
    <label>
        <input ref={titleRef} placeholder='Enter title' className=' p-1 m-1 sm:w-56 w-32 rounded-3xl h-8 ml-1 text-sm font-medium text-gray-900 dark:text-white focus:outline-none'/>
    </label>
   
    <textarea ref={NoteRef} placeholder='Description' className=' p-2 m-1 sm:w-56 w-32 rounded-3xl h-8 ml-1 text-sm font-medium text-gray-900 dark:text-white focus:outline-none'/>
   <div>
   <button className='m-2 w-12 h-8 bg-black text-white rounded-md' type='submit' onClick={handleSave}>Save</button>
   </div>
   
   <NotesCard/>
   </div>
  )
}

export default Notes