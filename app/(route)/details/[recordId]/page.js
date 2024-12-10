"use client"

import React, { useEffect, useState } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import TutorDetails from '../_components/TutorDetails';
import TutorSuggestion from '../_components/TutorSuggestion';

function Details({ params }) {

    const [tutor, setTutor] = useState();
    const [suggestedTutors, setSuggestedTutors] = useState([]);

    useEffect(() => {
        getTutorById();
        getSuggestedTutors();
    }, [])

    const getTutorById = () => {
        GlobalApi.getTutorById(params.recordId).then(resp => {
            console.log(resp);
            setTutor(resp.data.data);
        })
    }

    const getSuggestedTutors = () => {
        GlobalApi.getSuggestedTutors().then(resp => {
            console.log(resp);
            setSuggestedTutors(resp.data.data);
        })
    }

    return (
        <div className='p-5 md:px-20'>
            <h2 className='font-bold text-[22px]'>Details</h2>

            <div className='grid grid-cols-1 lg:grid-cols-4'>
                {/* Details */}
                <div className='col-span-3'>
                    {tutor && <TutorDetails tutor={tutor} />}
                </div>

                {/* Suggested Tutors */}
                <div className='col-span-1'>
                    <TutorSuggestion tutorList={suggestedTutors} />
                </div>
            </div>
        </div>
    )
}

export default Details;
