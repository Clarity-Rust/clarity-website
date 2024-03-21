import Link from "next/link";
import Image from "next/image";
import ContactButton from "./coming-soon/ContactButton";

const Navbar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-[8%] bg-black flex justify-between items-center px-4 z-50">
      <div className="text-white font-bold">
        <Link href="https://clarityrust.gg/" className="flex gap-1">
          <Image
            src="/clarity-logo.svg"
            height={50}
            width={50}
            alt="clarity logo"
          />
          <Image
            src="/clarity-text.svg"
            alt="clarity logo text"
            width={100}
            height={50}
          />
        </Link>
      </div>
      <nav className="text-white">
        <ul className="flex space-x-4">
          <li>
            <ContactButton variant="discord"/>
          </li>
          <li>
            <ContactButton variant="steam" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
