import Image from 'next/image';
// import LoginForm from './components/Login/LoginForm';
import RegistrationForm from './components/Registration/RegistrationForm';

export default function SignUp() {
  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <Image
          src="/images/signupImage.png"
          alt="signupImage"
          width={948}
          height={1000}
          className="h-full w-full object-cover"
          priority
        />
      </div>
      <div className="mx-auto flex items-center flex-1 flex-col justify-center">
        <div className="mx-auto w-[554px] flex flex-col gap-10">
          <h1 className="text-[42px] font-semibold">Log In</h1>
          <div className="flex flex-col gap-6">
            {/* <LoginForm /> */}
            <RegistrationForm />
            <div className="flex justify-center gap-2">
              <span className="text-l-blue text-sm">Not a member?</span>
              <button className="text-c-orange cursor-pointer font-medium text-sm hover:underline">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
