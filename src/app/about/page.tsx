import { FaCheckCircle } from "react-icons/fa";

export default function About() {
  return (
    <div className="w-[80vw] m-auto text-lg mt-10">
      <div>
        <h1 className="font-bold text-xl">Welcome to FileFusion, the ultimate hub for fast, reliable, and secure file conversion!</h1>
        <p className="font-semibold">We undertsand how challenging it can be to manage media files in today&apos;s dynamic digital world. That&apos;s why we&apos;ve created FileFusion—a free and user-friendly platform designed to make file conversion effortless.</p>
        <h2 className="font-bold my-3">Why FileFusion?</h2>
        <ul className="gap-3 flex flex-col">
          <li>
            <h3 className="font-bold flex gap-2 items-center"><FaCheckCircle/><div>Multi-Format Support</div></h3>
            <p className="font-semibold">FileFusion supports a wide range of file formats across images, videos, and audio. Whether you need to convert PNG to JPG, MP4 to MP3, or WAV to AAC, we’ve got you covered.</p>
          </li>
          <li>
            <h3 className="font-bold flex gap-2 items-center"><FaCheckCircle/>Batch Conversion</h3>
            <p className="font-semibold">Save time by converting multiple files simultaneously. Our batch conversion feature is perfect for users who handle large volumes of media files.</p>
          </li>
          <li>
            <h3 className="font-bold flex gap-2 items-center"><FaCheckCircle/>100% Online, No Installation Needed</h3>
            <p className="font-semibold">No need to download software or plugins—FileFusion runs entirely in your web browser. All you need is an internet connection to start converting.</p>
          </li>
          <li>
            <h3 className="font-bold flex gap-2 items-center"><FaCheckCircle/>Secure and Private</h3>
            <p className="font-semibold">Rest easy knowing that your multimedia files are treated with the outmost care. We prioritize your privacy and data security, ensuring that your files remain yours alone.</p>
          </li>
          <li>
            <h3 className="font-bold flex gap-2 items-center"><FaCheckCircle/>Completly Free to Use</h3>
            <p className="font-semibold">There are no hidden fees, no subscriptions, and no premium tiers. FileFusion is free for everyone, everywhere.</p>
          </li>
          <li>
            <h3 className="font-bold flex gap-2 items-center"><FaCheckCircle/>Device and Platform Compatibility</h3>
            <p className="font-semibold">Access FileFusion on any device—desktop, laptop, tablet, or smartphone. Our responsive design ensures a smooth experience across all platforms.</p>
          </li>
        </ul>
        <h2 className="font-bold my-3">Join Us!</h2>
        <p className="font-semibold">We&apos;re thrilled to have you on board. If you have any questions or feedback, please don&apos;t hesitate to reach out. Let&apos;s make your file conversions a breeze with FileFusion!</p>
      </div>
    </div>
  )
}
