'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa";
import NavMenu from "@/components/NavMenu";
// import ThemeButton from "@/components/ThemeButton"

export default function Navbar() {
    const currentPath = usePathname()

  return (
    <div className="flex items-center w-full justify-between p-5 fixed top-0 z-50 backdrop-blur-md bg-background bg-opacity-30">
      {/* Logo */}
      <div className="">
        <Link href="/"><h1 className="font-bold tracking-wide text-xl">FileFusion</h1></Link>
      </div>
      {/* Nav Items */}
      <div className="md:flex hidden justify-center items-center font-semibold gap-5 text-lg">
        <Link href="/" className={currentPath === "/" ? "currentUnderline" : "underlineHover"}>Home</Link>
        <Link href="/about" className={currentPath === "/about" ? "currentUnderline" : "underlineHover"}>About</Link>
        <Link href="/privacy" className={currentPath === "/privacy" ? "currentUnderline" : "underlineHover"}>Privacy Policy</Link>
      </div>
      {/* Github & theme button */}
        <div className="flex gap-2">
        {/* <ThemeButton/> */}
        <Link href="https://github.com/ArctyZ/filefusion-converter" className="hidden md:block" target="_blank"><Button variant={"outline"} className="bg-[#F3FBFC]">Github <FaGithub/></Button></Link>
        </div>
      {/* Navmobile */}
        <NavMenu/>

    </div>
  );
}
