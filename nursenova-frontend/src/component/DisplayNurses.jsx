import React, { useEffect, useState } from 'react'
import NurseCard from './NurseCard'
import { useParams } from 'react-router-dom'
import { fetchNursesByAvailableLocationsAndService } from '../api/user';

const DisplayNurses = () => {
    const [nurses,setNurses]=useState();
    const{location,serviceId}=useParams();

    useEffect(()=>{
      const  fetchData =async(location,serviceId)=>{
         try {
            const response =await fetchNursesByAvailableLocationsAndService(location,serviceId);
            console.log(response.data);
            setNurses(response.data);
            
         } catch (error) {
            
         }
      }
      fetchData(location,serviceId);
    },[location,serviceId]);


  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
        { nurses? nurses.map(nurse => (
          <NurseCard key={nurse.id} nurse={nurse} />
        )):""}
      </div>
    </div>
  )
}

export default DisplayNurses
