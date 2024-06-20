"use client";
import { useRouter } from "next/navigation";
import Homecard from "./Homecard";
import { useState } from "react";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";

export default function MeetingTypeList() {
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({ title: "Please, select a date and time" });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();

      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({ title: "Meeting Created" });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create a meeting",
      });
    }
  };
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      <Homecard
        image="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start a new meeting"
        className="bg-orange-1"
        handleClick={() => setMeetingState("isInstantMeeting")}
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
        title="Schedule a Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <Homecard
        image="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting recordings"
        className="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start a meeting"
        handleClick={createMeeting}
      />
    </section>
  );
}
