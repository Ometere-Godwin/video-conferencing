"use client";
import { useRouter } from "next/navigation";
import Homecard from "./Homecard";
import { useState } from "react";

export default function MeetingTypeList() {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      <Homecard
        image="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start a new meeting"
        className="bg-orange-1"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <Homecard
        image="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation"
        className="bg-blue-1"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <Homecard
        image="/icons/schedule.svg"
        title="New Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <Homecard
        image="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting recordings"
        className="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />
    </section>
  );
}
