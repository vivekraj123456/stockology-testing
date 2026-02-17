"use client";

import React from 'react'
import { FloatingDock } from '@/components/ui/floating-dock'
import { PiggyBank, Shield, LineChart, GraduationCap, Scale, Smartphone } from "lucide-react";

const links = [
  {
    title: "IPO Investments",
    icon: (
      <LineChart className="h-full w-full text-green-500 hover:text-green-600 dark:text-neutral-300" />
    ),
    href: "#",
  },

  {
    title: "Mobile & Online Trading Platform",
    icon: (
      <Smartphone className="h-full w-full text-green-500 hover:text-green-600 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "Equity Broking",
    icon: (
      <Scale className="h-full w-full text-green-500 hover:text-green-600 dark:text-neutral-300" />
    ),
    href: "#",
  },

  // {
  //   title: "Mutual Funds",
  //   icon: (
  //     <PiggyBank className="h-full w-full text-green-500 hover:text-green-600 dark:text-neutral-300" />
  //   ),
  //   href: "#",
  // },
  {
    title: "Financial Education",
    icon: (
      <GraduationCap className="h-full w-full text-green-500 hover:text-green-600 dark:text-neutral-300" />
    ),
    href: "#",
  },
  // {
  //   title: "Insurance",
  //   icon: (
  //     <Shield className="h-full w-full hover:text-green-700 text-green-500 dark:text-neutral-300" />
  //   ),
  //   href: "#",
  // },
]


const Service1 = () => {
  return (
    <div className="container mx-auto flex justify-center py-8">
      <FloatingDock items={links} />
    </div>
  )
}

export default Service1
