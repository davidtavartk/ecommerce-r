import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="h-[80px]">
      <div className="mx-auto flex h-full items-center justify-between px-[100px]">
        <div className="flex items-center gap-1">
          <Image src="/images/logo.png" alt="Logo" width={24} height={24} />
          <span className="font-semibold">RedSeam Clothing</span>
        </div>
        {/* <div className="flex items-center gap-5">
          <Image src="/svgs/cartIcon.svg" alt="cartIcon" width={24} height={24} />
          <div className="h-8 w-8 rounded-full bg-gray-300"></div>
        </div> */}
        <button className="flex items-center gap-2 cursor-pointer">
          <Image src="/svgs/loginIcon.svg" alt="loginIcon" width={20} height={20} />
          <span className="font-medium text-xs">Log In</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
