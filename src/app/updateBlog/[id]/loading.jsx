import React from 'react'
import { BounceLoader } from "react-spinners";
export default function Spinner() {
  return (
    <div className='h-screen flex justify-center items-center'>
    <BounceLoader color="#318892" />
    </div>
  )
}
