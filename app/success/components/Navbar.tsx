import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Container */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              {/* <div className="w-20 h-20"> */}
                <Image
                  src="/weekwise_logo.png"
                  height={100}
                  width={100}
                  alt="weekwise logo"
                />
              {/* </div> */}
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className="bg-[#6998d1ff] text-white hover:bg-[#33b067ff] px-4 py-2 rounded-md text-sm font-medium"
            >
              <HomeIcon />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
