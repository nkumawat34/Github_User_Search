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
      <div className="flex flex-col  w-[70vw] h-[90vh] mx-auto hover:shadow-lg  justify-center items-center mt-5  bg-white font-serif">
        {userdata?
      <div className="flex  flex-wrap lg:flex-nowrap rounded-lg border-black">
        <div className="m-4 mx-auto " drag
    dragConstraints={{
      top: -50,
      left: -50,
      right: 50,
      bottom: 50,
    }}><img src={userdata.avatar_url} className="rounded-full w-[150px] h-[100px] md:w-[150px] md:h[200px] lg:w-[300px] lg:h-[150px]"/></div>
        <div>{userdata.bio}</div>
        <div className="lg:mt-0 mt-4">Joined at <span className="font-bold">{(new Date(userdata.created_at)).toDateString()}</span></div>
        <br/>
   
      </div>
      
:""}{userdata?
     <div className="flex justify-center gap-4  flex-wrap" >
  <div className="flex flex-col bg-blue-200 "><h1 className="text-2xl font-bold">Repos</h1><h1 className="text-center">{userdata.public_repos}</h1></div>
  <div  className="flex flex-col bg-blue-200"><h1 className="text-2xl font-bold">Followers</h1><h1 className="text-center">{userdata.followers}</h1></div>
  <div  className="flex flex-col bg-blue-200"><h1 className="text-2xl font-bold">Following</h1><h1 className="text-center">{userdata.following}</h1></div>
</div>:""}
{userdata?
<div className="flex flex-col justify-center mt-5">
  
<div className="flex flex-row justify-center w-[25rem] ml-[20px] ">
  <div>
  <div><FaMapMarkerAlt size={30}/></div>
  <div>{userdata.location}</div>
  </div>
  <div className="ml-[150px]">
  <div><FaTwitter size={30}/></div>
  <div><Link href={`https://x.com/${userdata.twitter_username}`} >{userdata.twitter_username}</Link></div>
  </div>
</div>
<div className="flex flex-row justify-center items-center mt-4  w-[25rem] ml-[50px] ">
  <div className="ml-4">
  <div><FaLink size={30}/></div>
  <div><Link href={userdata.blog}>{userdata.blog}</Link></div>
  </div>
  <div className="truncate w-full ml-[20%]">
  <div><FaBuilding  size={30}/></div>
  <div>{userdata.company}</div>
  </div>

</div>

</div>:""}



      </div>
      
    </div>
  )
}
