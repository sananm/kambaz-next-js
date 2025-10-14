"use client"
import { useParams } from "next/navigation";
export default function AddPathParameters() {
  const { a, b } = useParams();
  return (
    <div id="wd-add"> <h3>Add Path Parameters</h3>
      {a} + {b} = {parseInt(a as string) + parseInt(b as string)}
    </div>
  );
}
