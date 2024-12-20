import { FaCheckCircle } from "react-icons/fa";
export default function Hero() {
  return (
    <div className="flex flex-col gap-5 items-center tracking-wide mt-10">
        <div className="font-bold text-3xl">
            Convert Your Files Effortlessly
        </div>
        <div className="font-semibold text-lg">
            <p>Transform your images, videos and audio files into the formats you need—fast, free, and online. </p>
            <ul>
                <li className="flex flex-row items-center gap-2"><FaCheckCircle/><div>Free Forever</div></li>
                <li className="flex flex-row items-center gap-2"><FaCheckCircle/><div>High-Quality Conversions</div></li>
                <li className="flex flex-row items-center gap-2"><FaCheckCircle/><div>Secure & Private</div></li>
            </ul>
            <p>Drag and drop your files or click below to start converting in seconds!</p>
        </div>
    </div>
  )
}
