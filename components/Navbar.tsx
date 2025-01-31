'use server'
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';
import { NAV_LINKS, NAV_LINKS_EN, NAV_BUTTONS, NAV_BUTTONS_EN, NAV_BUTTONS_SIGNIN, NAV_BUTTONS_EN_SIGNIN } from '@/constants/index';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const buttons = session ? NAV_BUTTONS_SIGNIN : NAV_BUTTONS;
  const links = NAV_LINKS;

  return (
    <nav className="bg-white bg-opacity-60 px-6 py-2 mt-5 fixed top-0 left-0 right-0 z-50 border-[1px] border-[#e5e7eb] mx-auto w-[95%] rounded-2xl backdrop-blur-[5px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/logo2.png" alt="Pleep Logo" width={30} height={30} />
          <Link href="/" className='link_main font-semibold text-xl ml-2'>Orken</Link>
        </div>
        <div className="flex space-x-6 text-lg items-center">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="relative group hover:text-primary-main transition duration-300"
          >
            {link.label}
          </Link>
        ))}
      </div>
        <div className="flex items-center">
        {buttons.map((button) => (
          <Button 
            key={button.href}
            title={button.label}
            variant={button.style}
            action={button.href}
          />
        ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
