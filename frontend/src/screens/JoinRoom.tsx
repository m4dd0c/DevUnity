import SEO from "../components/layout/SEO";
import JoinRoomForm from "../components/Room/JoinRoomForm";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";

function JoinRoom({ user }: { user: IUser | null }) {
  return (
    <div>
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title="Join a room | DevUnity"
        description="Join an existing room on DevUnity to collaborate with peers."
        name="DevUnity"
        ogType="website"
        twitterCard="summery"
      />
      <BackgroundGradientAnimation>
        <div className="absolute z-50 top-[45%] -translate-y-1/2 inset-0 text-white font-bold px-4 pointer-events-none text-2xl text-center md:text-3xl lg:text-5xl">
          <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            Start Collaboration with DevUnity
          </p>
        </div>
      </BackgroundGradientAnimation>
      <JoinRoomForm user={user} />
    </div>
  );
}
export default JoinRoom;
