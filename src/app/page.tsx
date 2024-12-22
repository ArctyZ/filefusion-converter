import DropzoneBox from "@/components/Dropzone";
import Hero from "@/components/Hero";

export default function Home() {

  return <div className="w-[80vw] m-auto flex flex-col items-center justify-center">
    <Hero/>
    <DropzoneBox/>
  </div>
}
