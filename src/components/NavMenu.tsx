import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";

export default function NavMenu() {
  const currentPath = usePathname();
  return (
    <div className="md:hidden">
        <Sheet>
      <SheetTrigger>
        <IoIosMenu size={30} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-5 font-semibold">
                <Link
                  href="/"
                  className={
                    currentPath === "/" ? "currentUnderline" : "underlineHover"
                  }
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={
                    currentPath === "/about"
                      ? "currentUnderline"
                      : "underlineHover"
                  }
                >
                  About
                </Link>
                <Link
                  href="/privacy"
                  className={
                    currentPath === "/privacy"
                      ? "currentUnderline"
                      : "underlineHover"
                  }
                >
                  Privacy Policy
                </Link>
              </div>
              <div>
              <Link href="https://github.com/ArctyZ/filefusion-converter" className=""><Button variant={"outline"} className="bg-[#F3FBFC]">Github <FaGithub/></Button></Link>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
    </div>
    
  );
}
