import Image from 'next/image';
import LoginForm from './components/Login/LoginForm';

export default function SignUp() {
  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <Image src="/images/signupImage.png" alt="signupImage" width={948} height={1000} className="h-full w-full object-cover" priority/>
      </div>
      <div className="flex-1 flex justify-center items-center flex-col gap-10">
        <h1 className='font-semibold text-[42px]'>
          Log In
        </h1>
        <div className=''>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
