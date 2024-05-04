import React, { useEffect, useContext } from 'react'

//icon

import { BsPlusCircle } from "react-icons/bs";
import { BsFillPlusCircleFill } from "react-icons/bs";

import { RiGroup2Line } from "react-icons/ri";
import { RiGroup2Fill } from "react-icons/ri";
import { RiTableLine } from "react-icons/ri";
import { RiTableFill } from "react-icons/ri";

const navLinks = [
  {
    role: "penguji",
    links: [
      { to: "/", label: "senam", icon: <RiTableLine />, icon2: <RiTableFill /> },
      { to: "/tambah", label: "jurus", icon: <BsPlusCircle />, icon2: <BsFillPlusCircleFill /> },
      { to: "/karyawan", label: "fisik", icon: <RiGroup2Line />, icon2: <RiGroup2Fill /> },
    ]
  }
];

function MainNavigation(active) {
  console.log('active')
  console.log(active)
  const role = 'penguji'

  return (
    <header className="sticky z-10  w-full bg-white  h-16 justify-center flex mx-auto items-center shadow-md">
      {navLinks.map((navItem) => {
        return (
          <nav>
            <ul className="flex gap-6">
              {navItem.links.map((link, index) => (
                <li key={link.to}>
                  <div className='flex-col px-1 pt-4 py-2 w-24 items-center justify-center'>
                    <div className={active.props === link.label ? 'flex rounded-full bg-gray items-center justify-center transition-all duration-200 ease-linear' :
                      'flex rounded-full items-center justify-center transition-all duration-200 ease-linear'}>
                      <div className='p-2'>
                        <div
                          key={index}
                          className={active.props === link.label ? 'text-black text-lg rounded-full' : 'text-gray text-lg rounded-full'}>
                          {active.props === link.label ? link.icon2 : link.icon}
                        </div>
                      </div>
                    </div>
                    <div className={active === link.label ? 'text-md text-center text-black' : 'text-md text-center text-gray'}>
                      {link.label}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        );
      })}
    </header>
  );
}

export default MainNavigation;