import React from "react";

export default function Meeting({ params }: { params: { id: string } }) {
  return <div>Meeting room: {params.id}</div>;
}