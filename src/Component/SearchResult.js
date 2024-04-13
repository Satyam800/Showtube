import React from 'react'
import { useSelector } from 'react-redux'
import VideoCard from './VideoCard'
import { useParams,Link } from 'react-router-dom'
import Header from './Header'
const SearchResult = () => {
const SearchKey = useSelector((state) => state.search. Searched)
const videoItem=JSON.parse(localStorage.getItem("videos"))
const param=useParams()
console.log(param,"prar");
const fetchResult=videoItem.filter((i)=>{
  if(i.snippet.channelTitle==SearchKey) return i
})
  return (
    <>
    <div>
    <Header/>
     <div className='sm:w-[17%] sm:h-[8%] w-[72%] h-[45%] absolute top-[20%]'>
{
  fetchResult.map((i)=>{
    {console.log(i,"klkl")}
    return      <Link to={"/watch?v=" + i.id}>
    <div className="sm:h-50 sm:w-30 w-[97%] h-[69%] p-2 shadow-lg rounded-md left-5 cursor-pointer">
    <img className="rounded-md" src={i?.snippet.thumbnails?.medium.url} />
    <div className="w-30 ">
   <div className="flex m-2">
   <img className="w-8 h-8 rounded-full" alt="dp"  src={i?.snippet?.thumbnails?.default?.url} />
    <div className="  w-30 h-10 ml-2 font-serif ">{i.snippet?.channelTitle}
     </div>
   </div>
    <div className="font-light">{i.statistics?.viewCount}<span className="w-12 ml-3 p-1 h-8 font-semibold rounded-2xl bg-pink-100">views</span> </div>
    </div>
  </div>
    </Link>
  })
}
  </div>
    </div>
    </>
 
  )
}

export default SearchResult
