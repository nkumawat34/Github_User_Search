'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import Link from "next/link";
import { FaBuilding } from "react-icons/fa";
export default function Homepage() {

  const [userdata,setUserData]=useState()
  const [userhandle,setUserhandle]=useState('nkumawat34')
  useEffect(()=>{
    axios.get(`https://api.github.com/users/${userhandle}`)
    .then((response) => {
      // Handle the response data here
      setUserData(response.data)
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
  
  },[])

  const handlechange=(e)=>{

    setUserhandle(e.target.value)
  }

  const search=()=>{

    axios.get(`https://api.github.com/users/${userhandle}`)
    .then((response) => {
      // Handle the response data here
      setUserData(response.data)
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
    
  }
  return (
    <div className="bg-blue-100 h-screen-height  font-sans">
      <div className="flex justify-center text-4xl pt-[5%]">Dev finder</div>

      <div className="flex justify-center mt-5">
        <div>
        <CiSearch color="black" size={40}/>
        </div>
        <div>
        <input className="border-5 h-[5vh] mt-1 w-[30vw]" placeholder="Search github username ....." onChange={handlechange}/>
      </div>
      <div className="mx-3">
        <button type="button" className="px-8 py-2 bg-blue-500 rounded-xl" onClick={search}>Search</button>
      </div>
      </div>
      <div className="flex flex-col  w-[full] md:w-[70vw] h-screen-height mx-auto hover:shadow-lg   mt-5  bg-white font-serif">
        {userdata?
      <div className="flex  flex-wrap lg:flex-nowrap rounded-lg border-black justify-between">
        <div className="m-4 mt-5 basis-2/4"><img src={userdata.avatar_url} className="rounded-full w-[150px] h-[100px] md:w-[150px] md:h[200px] "/></div>
        {userdata.bio?<div className="mt-5 basis-1/4 lg:mr-[20%]">{userdata.bio}</div>:<div className="mt-5">Profile bio is not there</div>}
        <div className="lg:mt-4 mt-4 mx-4 basis-1/4">Joined at <span className="font-bold">{(new Date(userdata.created_at)).toDateString()}</span></div>
        <br/>
   
      </div>
      
:""}{userdata?
     <div className="flex justify-center gap-4  mt-5 flex-wrap" >
  <div className="flex flex-col bg-blue-200 "><h1 className="text-2xl font-bold">Repos</h1><h1 className="text-center">{userdata.public_repos}</h1></div>
  <div  className="flex flex-col bg-blue-200"><h1 className="text-2xl font-bold">Followers</h1><h1 className="text-center">{userdata.followers}</h1></div>
  <div  className="flex flex-col bg-blue-200"><h1 className="text-2xl font-bold">Following</h1><h1 className="text-center">{userdata.following}</h1></div>
</div>:""}
{userdata?
<div className="flex flex-col justify-center items-center mt-5 md:ml-0 ml-[100px]">
  
<div className="flex flex-col md:flex-row flex-wrap justify-center w-[25rem] ">
  <div className="mt-3 md:mt-0">
  <div><FaMapMarkerAlt size={30}/></div>
  {userdata.location?<div>{userdata.location}</div>:"Location unavailable"}
  </div>
  <div className="ml-0 md:ml-[150px] mt-3 md:mt-0">
  <div><FaTwitter size={30}/></div>
  {userdata.twitter_username?<div><Link href={`https://x.com/${userdata.twitter_username}`} >{userdata.twitter_username}</Link></div>:"not available"}
  </div>
</div>
<div className="flex flex-col md:flex-row flex-wrap  md:flex-nowrap justify-center mt-4  w-[25rem] ">
  <div className=" mt-3 md:mt-0">
  <div><FaLink size={30}/></div>
  {userdata.blog?<div><Link href={userdata.blog}>{userdata.blog}</Link></div>:"not available"}
  </div>
  <div className=" ml-0 md:ml-[150px] mt-3 md:mt-0">
  <div><FaBuilding  size={30}/></div>
  {userdata.company?<div>{userdata.company}</div>:"not available"}
  </div>

</div>

</div>:""}



      </div>
      
    </div>
  )
}
