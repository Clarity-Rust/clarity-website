import Link from "next/link";
import Image from "next/image";
import ContactButton from "./coming-soon/ContactButton";

const Navbar: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-[8%] w-full items-center justify-between bg-neutral-800 px-4">
      <div className="font-bold text-white">
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
        <ul className="hidden md:flex space-x-4">
          <li>
            <ContactButton variant="discord" />
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
