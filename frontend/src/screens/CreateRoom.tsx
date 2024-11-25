import SEO from "../components/layout/SEO";
import CreateRoomForm from "../components/Room/CreateRoomForm";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";

function CreateRoom() {
  return (
    <div className="min-h-screen bg-black">
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title="Create a room | DevUnity"
        twitterCard="summary"
        ogType="article"
        description="Create a new collaborative room on DevUnity to work with other developers."
        name="DevUnity"
      />
      <BackgroundGradientAnimation>
        <div className="pointer-events-none absolute inset-0 top-[43%] z-50 -translate-y-1/2 px-4 text-center text-2xl font-bold text-white md:text-3xl lg:text-5xl">
          <p className="bg-gradient-to-b from-white/80 to-white/20 bg-clip-text text-transparent drop-shadow-2xl">
            Kickstart your Collaborative Development
          </p>
        </div>
      </BackgroundGradientAnimation>
      <CreateRoomForm />
    </div>
  );
}
export default CreateRoom;
