"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Hero from "./_components/Hero";
import SearchBar from "./_components/SearchBar";
import TutorList from "./_components/TutorList";
import GlobalApi from "./_utils/GlobalApi";
import { useState, useEffect } from 'react';

export default function Home() {
  const [tutorList, setTutorList] = useState([]);

  useEffect(() => {
    getTutorList();
  }, []);

  const getTutorList = () => {
    GlobalApi.getTutorList().then(resp => {
      console.log(resp.data.data);
      setTutorList(resp.data.data);
    }).catch(error => {
      console.error('Error fetching tutor list:', error);
    });
  };

  return (
    <div>
      <Hero />
      <SearchBar />
      <TutorList tutorList={tutorList} />
    </div>
  );
}
