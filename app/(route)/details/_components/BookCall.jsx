import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React, { useEffect, useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Clock } from "lucide-react"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from "sonner"

function BookCall({ tutor }) {
  const [date, setDate] = useState(new Date())
  const [timeslot, setTimeSlot] = useState([])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const { user } = useKindeBrowserClient();
  const [note, setNote] = useState("");

  useEffect(() => {
    getTime();
  }, [])

  // Function to save booking
  const saveBooking = async () => {
    if (!user?.given_name || !user?.family_name || !user?.email) {
      toast.error("User information is missing. Please login again.");
      return;
    }

    const data = {
      data: {
        username: `${user.given_name} ${user.family_name}`,
        email: user.email,
        time: selectedTimeSlot,
        date: date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
        tutor: tutor.id,
        note: note
      }
    };

    try {
      const resp = await GlobalApi.booking(data);
      if (resp) {
        toast.success("Confirmation Sent on Email");
        // Optionally reset state after successful booking
        setSelectedTimeSlot(null);
        setNote("");
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  }

  // Function to generate time slots
  const getTime = () => {
    const timelist = [];
    // Morning timeslots
    for (let i = 10; i <= 12; i++) {
      timelist.push({ time: `${i}:00 AM` });
      timelist.push({ time: `${i}:30 AM` });
    }
    // Afternoon and evening timeslots
    for (let i = 1; i <= 6; i++) {
      timelist.push({ time: `${i}:00 PM` });
      timelist.push({ time: `${i}:30 PM` });
    }
    setTimeSlot(timelist);
  }

  // Function to disable past dates
  const isPastDay = (day) => {
    return day < new Date();
  }

  if (!user) {
    return <div>Loading user information...</div>; // Optional loading state
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3 rounded-full">Connect With Me</Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-6 rounded-md shadow-md">
        <DialogHeader>
          <DialogTitle>Book a free call</DialogTitle>
          <DialogDescription>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-4">
              {/* Calendar */}
              <div className="flex items-baseline gap-3 flex-col">
                <h2 className="flex gap-2 items-center">
                  <CalendarDays className="text-customColor-400 h-5 w-5" />
                  Select date
                </h2>
                <Calendar
                  className="rounded-md border"
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={isPastDay}
                />
              </div>

              {/* Timeslot */}
              <div className="mt-3">
                <h2 className="flex gap-3">
                  <Clock className="text-customColor-400 h-5 w-5" />
                  Select time slot
                </h2>
                <div className="p-3 rounded-lg grid grid-cols-3 gap-3">
                  {timeslot.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTimeSlot(item.time)} // Set selected time slot
                      className={`rounded-full p-2 border text-center ${selectedTimeSlot === item.time ? 'bg-customColor-400 text-white' : 'hover:bg-customColor-400 hover:text-white'}`}
                    >
                      {item.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Note section */}
            <div className="mt-4">
              <h2>Add a note (optional)</h2>
              <textarea
                className="w-full border p-2 rounded-md"
                rows="4"
                placeholder="Add any notes here..."
                value={note} // Bind value to note state
                onChange={(e) => setNote(e.target.value)} // Update note state
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end gap-5">
          <DialogClose asChild>
            <Button type="button" className="text-red-500 border-red-500 mr-2" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={saveBooking}
            disabled={!(date && selectedTimeSlot && user)} // Disable until date, time, and user are selected
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookCall
