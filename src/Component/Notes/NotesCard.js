import React,{useEffect, useRef, useState} from 'react'
import {useSelector,useDispatch} from "react-redux"
import { deleteNotes,updateNotes } from '../../Utils/noteSlice'
import { useSearchParams } from 'react-router-dom'

const NotesCard = () => {
  const notesArray=useSelector(store=>store.notes.data)
  const dispatch=useDispatch()
  const cardRef=useRef([])
  const titleRef=useRef()
  const [param]=useSearchParams()
const NoteRef=useRef()
  const [isEdit,SetisEdit]=useState(false)
  const [id,Setid]=useState("")
  useEffect(()=>{

  },[notesArray])

 
  console.log(notesArray,"notesArray");

  const handleDelete=(i)=>{
    console.log(i,"ig");
    
    
  dispatch(deleteNotes({
    id:i._id,
    userId:JSON.parse(localStorage.getItem("id"))._id,
    videoId:param.get("v"),

  }))
  }
  const handleSave=(i)=>{
    SetisEdit(false)
  dispatch(updateNotes({
    userId:JSON.parse(localStorage.getItem("id"))._id,
    id:i._id,
    title:titleRef.current.value,
    note:NoteRef.current.value,
    videoId:param.get("v"),

  }))
  }

 
  const handleEdit=(i)=>{
    if(titleRef.current) titleRef.current.value=i.title
    if(NoteRef.current)  NoteRef.current.value=i.note
    SetisEdit(true)
    Setid(i._id)
    console.log(i.title,i.note,titleRef.current,NoteRef.current,"ujgug");
 
  
    
  }

  const handleDiscard=()=>{
    SetisEdit(false)
  }

  useEffect(()=>{
console.log("l");
  },[titleRef,NoteRef])
 
console.log(titleRef,NoteRef,"ljkjkn");
  

  return (
    <>
    <div className='flex flex-col z-0'>
      {
        notesArray?.map((i,j)=>{
          return <div className='bg-red-100 w-full h-auto m-1 p-1' ref={(i)=>cardRef[j]=i} key={i._id}>
        {
          isEdit&&i._id==id?<div className='flex flex-col'>
     <p className='font-bold'>Note</p>
     <input type='text' ref={titleRef}  value={titleRef?.current?.value}  className=' p-1 m-1 sm:w-56 w-32 rounded-3xl h-8 ml-1 text-sm font-medium text-gray-900 dark:text-white focus:outline-none'/>
     <textarea type="text" ref={NoteRef} value={NoteRef?.current?.value} className=' p-2 m-1 sm:w-56 w-32 rounded-3xl h-8 ml-1 text-sm font-medium text-gray-900 dark:text-white focus:outline-none'/>
<div className='flex justify-between'>
<button className='m-2 w-16 h-8 bg-black text-white rounded-md' type='submit' onClick={()=>handleSave(i)}>Update</button>
     <button className='m-2 w-16 h-8 bg-slate-400 text-black rounded-md' type='submit' onClick={handleDiscard}>Discard</button>
</div>



          </div>: <div>
            <div className='p-1 font-semibold'>{i.time}{i.title?.toUpperCase()} </div>
          <div className='p-1 font-mono'>{i.note} </div>
          <div className='flex justify-between'>
           
           <div className='w-14 p-1 h-8 bg-black text-white rounded-md shadow-md cursor-pointer' onClick={()=>handleDelete(i)}>Delete</div>
           <div  className='w-14 p-1 h-8 bg-slate-400 text-black rounded-md shadow-md cursor-pointer' onClick={()=>handleEdit(i)}>Edit</div>
           </div>
          </div>
        }
           
          </div>
        })
      }
    </div>
    </>
   
  )
}

export default NotesCard