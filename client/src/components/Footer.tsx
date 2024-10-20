import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/Logo-horizontal.svg";

const Footer = () => {
  return (
    <footer className="footer w-full">
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 -z-30"
        />
      </div>
      <div className="container relative py-12 z-50 flex flex-col gap-3 md:gap-0 md:flex-row justify-between my-auto mx-auto">
        <Image
          src={Logo}
          alt="Supun Sathsara Logo"
          width={100}
          quality={100}
          className="my-auto mx-auto md:mx-0 w-1/2 sm:w-[200px]"
        />
        <div className="my-auto mx-auto md:mx-0">
          <p className="text-slate-400">All rights reserved &copy; 2024</p>
        </div>
        <div className="my-auto">
          {/**Legal */}
          <ul className="flex flex-col space-y-1 md:space-y-2">
            <li>
              <Link href="/support" className="text-slate-400 hover:text-white">
                Support
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="text-slate-400 hover:text-white"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-slate-400 hover:text-white">
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;