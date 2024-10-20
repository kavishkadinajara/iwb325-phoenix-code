import { FaLocationArrow } from "react-icons/fa";
import MagicButton from "./MagicButton";

const BottomCTA = () => {
  return (
    <div className="w-full pt-20 pb-10 z-20">
      <div className="flex flex-col items-center relative">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your event</span> to the
          next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Register now and experience the future of event management.
        </p>
        <a href="/login" className="relative z-50">
          <MagicButton
            title="Register Now"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
    </div>
  );
};

export default BottomCTA;
