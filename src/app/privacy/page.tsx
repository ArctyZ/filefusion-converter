import { FaCheckCircle } from "react-icons/fa";
import Link from 'next/link';
export default function Privacy() {
  return (
    <div className="w-[80vw] m-auto text-lg mt-10">
          <div>
            <h2>Effective Date: Desember 20, 2024</h2>
            <p className="font-semibold my-3">At FileFusion, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you use our free image, video, and audio converter services. By accessing or using FileFusion, you agree to the terms outlined below.</p>
            <ul className="gap-3 flex flex-col">
              <li>
                <h3 className="font-bold flex gap-2 items-center"><FaCheckCircle/><div>Information We Collect</div></h3>
                <p className="font-semibold">We collect and use limited information to improve the user experience. The only data we collect is through Google Analytics, which includes: Usage Information: We may collect information about your interaction with our website, such as the pages you visit, your IP address, browser type, device type, and referral URLs. This information helps us understand how users interact with our website to enhance its functionality and content.</p>
              </li>
              <li>
                <h3 className="font-bold flex gap-2 items-center"><FaCheckCircle/>How We User Your Information</h3>
                <p className="font-semibold">We use the collected information to enhance the user experience and improving our website&apos;s performance</p>
              </li>
              <li>
                <h3 className="font-bold flex gap-2 items-center"><FaCheckCircle/>Third-Party Services</h3>
                <p className="font-semibold">FileFusion may include links to third-party websites or use third-party services for analytics or advertisements. We are not responsible for the privacy practices of these third-party providers.</p>
              </li>
              <li>
                <h3 className="font-bold flex gap-2 items-center"><FaCheckCircle/>Changes to This Privacy Policy</h3>
                <p className="font-semibold">We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we protect your privacy.</p>
              </li>
              <li>
                <h3 className="font-bold flex gap-2 items-center"><FaCheckCircle/>Contact Us</h3>
                <p className="font-semibold">If you have any questions, concerns, or suggestions regarding this Privacy Policy, please contact us: <Link href="mailto:harisbaraja99@gmail.com" className="underline">Email</Link></p>
              </li>
            </ul>
            <p className="font-semibold my-3">Thank you for trusting FileFusion with your file conversion needs.</p>
          </div>
        </div>
  )
}
