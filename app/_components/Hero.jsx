import React from 'react';
import Image from "next/image";
import { Button } from '@/components/ui/button';


const Hero = () => {
  return (
    <div>
     <section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
        <Image

          alt=""
          src="/student.jpg"
          width={800}
          height={800}
          className="absolute inset-0 h-full rounded-3xl w-full object-cover "
        />
      </div>

      <div className="lg:py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">
            Find Your Perfect <span className='text-primary '>Tutor</span> & <span className='text-primary '>Learn</span> From The Best 
        </h2>

        <p className="mt-4 text-gray-600">
        "Find your perfect tutor and unlock personalized online learning experiences tailored to your needs. 
        Connect with top tutors and excel in your academic journey. Start learning with the best today!"
        </p>

         <Button className="mt-10">Explore Now</Button>

      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Hero;
