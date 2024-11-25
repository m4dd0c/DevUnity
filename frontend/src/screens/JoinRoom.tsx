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
        twitterCard="summary"
      />
      <BackgroundGradientAnimation>
        <div className="pointer-events-none absolute inset-0 top-[45%] z-50 -translate-y-1/2 px-4 text-center text-2xl font-bold text-white md:text-3xl lg:text-5xl">
          <p className="bg-gradient-to-b from-white/80 to-white/20 bg-clip-text text-transparent drop-shadow-2xl">
            Start Collaboration with DevUnity
          </p>
        </div>
      </BackgroundGradientAnimation>
      <JoinRoomForm user={user} />
    </div>
  );
}
export default JoinRoom;
