"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function CategoryList() {
    const [categoryList, setCategoryList] = useState([]);
    const params = usePathname();
    const category = decodeURIComponent(params.split('/')[2]); // Decode the URL component

    useEffect(() => {
      getCategoryList();
    }, []);
  
    const getCategoryList = () => {
      GlobalApi.getCategory().then(resp => {
        console.log(resp.data.data);
        setCategoryList(resp.data.data); 
      }).catch(err => {
        console.error('Error fetching categories:', err); 
      });
    };

    return (
        <div className='h-screen mt-5 flex flex-col mr-10'>
            <Command>
                <CommandInput placeholder="What you want to learn..." />
                <CommandList className='overflow-visible '>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {categoryList && categoryList.map((item, index) => (
                            <CommandItem key={index}>
                                <Link 
                                    href={`/Search/${encodeURIComponent(item.attributes?.name)}`} 
                                    className={`p-2 flex gap-2 rounded-md text-[13px] text-customColor-400 cursor-pointer w-full ${category === item.attributes?.name ? 'bg-customColor-100' : ''}`}
                                >
                                    <Image
                                        src={item.attributes?.icon?.data?.attributes?.url || '/fallback-icon.png'}
                                        alt='icon'
                                        width={25}
                                        height={25}
                                    />
                                    <label className='cursor-pointer'>{item.attributes?.name}</label>
                                </Link>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    )
}

export default CategoryList;
