import CreateRoomForm from "../components/Room/CreateRoomForm";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";

function CreateRoom() {
  return (
    <div>
      <BackgroundGradientAnimation>
        <div className="absolute z-50 top-[45%] -translate-y-1/2 inset-0 text-white font-bold px-4 pointer-events-none text-2xl text-center md:text-3xl lg:text-5xl">
          <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            Kickstart your Collaborative Development
          </p>
        </div>
      </BackgroundGradientAnimation>
      <CreateRoomForm />
    </div>
  );
}
export default CreateRoom;
