"use client"

import TutorList from '@/app/_components/TutorList';
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';

function Search({ params }) {

  const [tutorList, setTutorList] = useState([]);

  useEffect(() => {
    if (params.cname) {
      getTutors();
    }
  }, [params.cname]); // Add params.cname to the dependency array

  const getTutors = () => {
    GlobalApi.getTutorByCategory(params.cname).then(resp => {
      setTutorList(resp.data.data);
    }).catch(err => {
      console.error('Error fetching tutors:', err);
    });
  };

  const decodedCategoryName = decodeURIComponent(params.cname);

  return (
    <div className='mt-5'>
      <TutorList 
         heading={decodedCategoryName}
        tutorList={tutorList}
      />
    </div>
  );
}

export default Search;
