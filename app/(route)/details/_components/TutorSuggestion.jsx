import Image from 'next/image';
import Link from 'next/link';

function TutorSuggestion({ tutorList }) {
  return (
    <div className='mt-5 text-center items-center  border-[1px] rounded-lg md:ml-5 px-3'>
      <h2 className='font-bold mt-2 text-xl'>Suggested Tutors</h2>
      <div className='flex mt-3 flex-col gap-4 overflow-y-auto' 
       style={{ maxHeight: '600px',overflowX:'hidden', scrollbarWidth:'none'}}   >
        {tutorList && tutorList.length > 0 ? (
          tutorList.map((item, index) => (
            <div
              key={index}
              className='flex items-center w-[250px]  p-4 cursor-pointer hover:border-primary hover:shadow-sm transition-all ease-in-out'
            >
              <div className='relative w-20 h-20 flex-shrink-0'>
                <Image
                  src={item.attributes?.image?.data?.attributes?.url || '/default-image.jpg'}
                  alt='Tutor'
                  layout='fill'
                  objectFit='cover'
                  objectPosition='top'
                  className='rounded-full'
                />
              </div>
              <div className='ml-4'>
                <h3 className='text-lg font-semibold'>{item.attributes?.name || 'Unknown Tutor'}</h3>
                {/* <p className='text-sm text-gray-600'>{item.attributes?.bio || 'No bio available'}</p> */}
                
                <Link href={'/details/' + item?.id} className='w-full'>
                  <h2 className='p-2 px-3 border-[1px] border-primary  text-primary hover:bg-primary hover:text-white rounded-full text-center w-full mt-2 cursor-pointer transition-all ease-in-out'>
                    View Profile
                  </h2>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No tutors available</p>
        )}
      </div>
    </div>
  );
}

export default TutorSuggestion;



// <div className='md:px-10 w-100 mb-10 '>
// <h2 className='font-bold text-xl mb-4'>Suggested Tutors</h2>
// {/* Container for vertical scrolling */}
// <div className='overflow-y-auto h-[calc(100vh-200px)]'> {/* Adjust height as needed */}
//   <div className='flex flex-col gap-4'>
//     {tutorList && tutorList.length > 0 ? (
//       tutorList.map((item, index) => (
//         <div
//           key={index}
//           className='flex items-center w-[300px] border-[1px] rounded-lg p-4 cursor-pointer hover:border-primary hover:shadow-sm transition-all ease-in-out' /* Increased width */
//         >
//           <div className='relative w-20 h-20 flex-shrink-0'>
//             <Image
//               src={item.attributes?.image?.data?.attributes?.url || '/default-image.jpg'}
//               alt='Tutor'
//               layout='fill'
//               objectFit='cover'
//               className='rounded-full'
//             />
//           </div>
//           <div className='ml-4 flex flex-col justify-center w-full'>
//             <div className='flex flex-col items-center'>
//               {/* <h2 className='text-[10px] p-1 rounded-full bg-customColor-100 text-primary mb-2'>
//                 {item.attributes?.categories?.data?.[0]?.attributes?.name}
//               </h2> */}
//               <h2 className='font-bold text-lg mb-2'>
//                 {item.attributes?.name}
//               </h2>
//               <Link href={'/details/' + item?.id} passHref>
//                 <div className=' px-3 border-[1px] border-primary bg-customColor-100 text-primary hover:bg-primary hover:text-white rounded-full text-center transition-all ease-in-out'>
//                   Connect Now
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))
//     ) : (
//       [1, 2, 3, 4, 5, 6].map((item, index) => (
//         <div
//           key={index}
//           className='w-[400px] h-[120px] bg-slate-200 animate-pulse rounded-lg' /* Increased width */
//         ></div>
//       ))
//     )}
//   </div>
// </div>
// </div>