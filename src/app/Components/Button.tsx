import React from 'react'
import Link from 'next/link'
import Image from "next/image"

interface ButtonProps {
  name: string;
  image: string;
  href: string;
}
const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button className='border p-3 rounded-lg bg-black inline-flex items-center text-white font-semibold w-auto'>
      <Image src={props.image} alt="" width={24} height={24} className='pr-2 object-contain' />
      <h1 className='md:text-lg text-sm'>
        <Link href={props.href}>{props.name}</Link>
      </h1>
    </button>
  )

}

export default Button