"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image'; 
import Link from 'next/link';

// Function to create a slug from a category name
const createSlug = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

function SearchBar() {
  const [categoryList, setCategoryList] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]); // For filtered results
  const [searchQuery, setSearchQuery] = useState(''); // For tracking search input

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    // Filter categories based on the search query
    if (searchQuery === '') {
      setFilteredCategories(categoryList); // If no search query, show all categories
    } else {
      const filtered = categoryList.filter(item =>
        item.attributes.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [searchQuery, categoryList]); // Run effect when searchQuery or categoryList changes

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      console.log(resp.data.data);
      setCategoryList(resp.data.data); 
      setFilteredCategories(resp.data.data); // Set initial filtered categories
    }).catch(err => {
      console.error('Error fetching categories:', err); 
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update searchQuery when user types
  };

  return (
    <div className='mt-10 px-5 mb-10 flex flex-col items-center gap-4'>
      <h2 className='font-bold text-4xl tracking-wide'>Search <span className='text-primary'>Tutor</span></h2>
      <h2 className='text-gray-400 text-xl'>Get personalized lessons from top tutors online.</h2>

      {/* Search bar */}
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="What do you want to learn today?"
          value={searchQuery} // Bind input to searchQuery state
          onChange={handleSearchChange} // Trigger filtering on change
        />
        <Button type="submit">
          <Search className='h-4 w-4 mr-2' /> Search
        </Button>
      </div>

      {/* Categories grid */}
      <div className='mt-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
        {filteredCategories.length > 0 ? filteredCategories.slice(0, 6).map((item, index) => (
          <Link href={'/Search/' + createSlug(item.attributes.name)} key={index}>
            <div className='flex flex-col text-center items-center p-5 m-2 rounded-lg gap-3 bg-slate-50 hover:scale-110 transition-all ease-in-out'>
              <Image
                src={item.attributes?.icon?.data?.attributes?.url || '/fallback-icon.png'}
                alt='icon'
                width={50}
                height={50}
              />
              <label className='text-primary-600 text-sm'>{item?.attributes?.name}</label>
            </div>
          </Link>
        )) : 
        [1, 2, 3, 4, 5, 6].map((_, index) => (
          <div key={index} className='w-[180px] h-[140px] bg-slate-200 animate-pulse rounded-lg m-2'></div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;





// "use client";

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Search } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import GlobalApi from '../_utils/GlobalApi';
// import Image from 'next/image';
// import Link from 'next/link';

// // Function to create a slug from a category name
// const createSlug = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

// function SearchBar() {
//   const [categoryList, setCategoryList] = useState([]);

//   useEffect(() => {
//     getCategoryList();
//   }, []);

//   const getCategoryList = () => {
//     GlobalApi.getCategory()
//       .then((resp) => {
//         console.log(resp.data.data);
//         setCategoryList(resp.data.data);
//       })
//       .catch((err) => {
//         console.error('Error fetching categories:', err);
//       });
//   };

//   return (
//     <div className='mt-10 px-5 mb-10 flex flex-col items-center gap-4'>
//       <h2 className='font-bold text-4xl tracking-wide'>
//         Search <span className='text-primary'>Tutor</span>
//       </h2>
//       <h2 className='text-gray-400 text-xl'>
//         Get personalized lessons from top tutors online.
//       </h2>

//       <div className='flex w-full max-w-sm items-center space-x-2'>
//         <Input type='text' placeholder='What do you want to learn today?' />
//         <Button type='submit'>
//           <Search className='h-4 w-4 mr-2' /> Search
//         </Button>
//       </div>

//       {/* Scrolling Categories Section */}
//       <div className='relative w-full overflow-hidden mt-10'>
//         <div
//           className='scrolling-categories flex items-center'
//           style={{ width: `${categoryList.length * 180}px` }}
//         >
//           {categoryList.length > 0 ? (
//             categoryList.map((item, index) => (
//               <Link href={'/Search/' + item.attributes.name} key={index}>
//                 <div
//                   className='category-card flex flex-col text-center items-center p-5 m-2 rounded-lg gap-3 bg-slate-50 hover:scale-110 transition-all ease-in-out'
//                   style={{ minWidth: '180px' }}
//                 >
//                   <Image
//                     src={item.attributes?.icon?.data?.attributes?.url || '/fallback-icon.png'}
//                     alt='icon'
//                     width={50}
//                     height={50}
//                   />
//                   <label className='text-primary-600 text-sm'>
//                     {item?.attributes?.name}
//                   </label>
//                 </div>
//               </Link>
//             ))
//           ) : (
//             [1, 2, 3, 4, 5, 6].map((_, index) => (
//               <div
//                 key={index}
//                 className='w-[180px] h-[140px] bg-slate-200 animate-pulse rounded-lg m-2'
//               ></div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SearchBar;


