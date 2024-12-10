import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function TutorList({ tutorList, heading = 'Popular Tutors' }) {
  const decodedHeading = decodeURIComponent(heading);

  return (
    <div className='mb-10'>
      <h2 className='font-bold text-xl mb-4'>{heading}</h2>

      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-7 lg:grid-cols-4'>
        {tutorList && tutorList.length > 0 ? (
          // Slice the array to show only the first 8 tutors
          tutorList.slice(0, 8).map((item, index) => (
            <div
              key={index}
              className='border-[1px] rounded-lg p-4 cursor-pointer hover:border-primary hover:shadow-sm transition-all ease-in-out'
            >
              <Image
                src={item.attributes?.image?.data?.attributes?.url || '/default-image.jpg'}
                alt='Tutor'
                width={500}
                height={200}
                className='h-[200px] w-full object-cover object-top rounded-md'
              />
              <div className='mt-3 flex flex-col items-baseline gap-2'>
                <h2 className='text-[10px] p-1 rounded-full bg-customColor-100 text-primary'>
                  {item.attributes?.categories?.data?.[0]?.attributes?.name}
                </h2>
                <h2 className='font-bold text-lg mt-1'>{item.attributes?.name}</h2>
                <h2 className='text-sm text-gray-400'>{item.attributes?.metadata}</h2>
                <h2 className='text-primary text-sm'>{item.attributes?.years_of_experience}</h2>

                <Link href={'/details/' + item?.id} className='w-full'>
                  <h2 className='p-2 px-3 border-[1px] border-primary bg-customColor-100 text-primary hover:bg-primary hover:text-white rounded-full text-center w-full mt-2 cursor-pointer transition-all ease-in-out'>
                    Connect Now
                  </h2>
                </Link>
              </div>
            </div>
          ))
        ) : (
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className='w-full h-[420px] bg-slate-200 animate-pulse rounded-lg'
            ></div>
          ))
        )}
      </div>
    </div>
  );
}

export default TutorList;
