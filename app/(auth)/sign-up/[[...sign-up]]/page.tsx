import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function SignUpPage() {
  return (
    <main className="flex justify-center items-center w-full h-screen">
      <SignUp />
    </main>
  );
}
