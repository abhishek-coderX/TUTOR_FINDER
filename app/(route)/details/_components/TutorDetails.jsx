import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import BookCall from './BookCall';

function TutorDetails({ tutor }) {
  const socialMedia = [
    {
      id: 1,
      platform: 'Facebook',
      icon: '/facebook.png',
      url: 'https://facebook.com/yourprofile',
    },
    {
      id: 2,
      platform: 'Instagram',
      icon: '/instagram.png',
      url: 'https://instagram.com/yourprofile',
    },
    {
      id: 3,
      platform: 'Twitter',
      icon: '/twitter.png',
      url: 'https://twitter.com/yourprofile',
    },
    {
      id: 4,
      platform: 'LinkedIn',
      icon: '/linkedin.png',
      url: 'https://linkedin.com/in/yourprofile',
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 border-[1px] mt-5 p-5 rounded-lg">
        {/* Tutor image */}
        <div>
          <Image
            src={tutor?.attributes?.image?.data?.attributes?.url || '/default-image.jpg'}
            alt={tutor?.attributes?.name || 'Tutor'}
            width={200}
            height={270}
            className="h-[300px] w-full object-cover object-top rounded-lg"
          />
        </div>

        {/* Tutor info */}
        <div className="col-span-2 mt-5 md:px-8 flex flex-col gap-3 items-baseline">
          <h2 className="font-bold text-2xl">{tutor?.attributes?.name}</h2>
          <h2 className="flex gap-2 text-gray-500 text-md">
            <GraduationCap />
            <span>{tutor?.attributes?.years_of_experience} of experience</span>
          </h2>
          <h2 className="text-sm w-60 text-gray-400">{tutor?.attributes?.metadata}</h2>

          <h2 className="text-[10px] p-1 rounded-full bg-customColor-100 text-primary">
            {tutor?.attributes?.categories?.data?.[0]?.attributes?.name}
          </h2>

          <div className="flex gap-3">
            {socialMedia.map((item) => (
              <Image
                src={item.icon}
                key={item.id}
                width={30}
                height={30}
                alt={item.platform}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <BookCall tutor={tutor} />
            {/* <Button className='mt-3 rounded-full bg-customColor-500 '>Chat</Button> */}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="p-3 mt-5 border-[1px] rounded-lg">
        <h2 className="font-bold text-[20px]">About Me</h2>
        <p className="text-gray-500 tracking-wider">{tutor?.attributes?.about}</p>
      </div>
    </div>
  );
}

export default TutorDetails;
