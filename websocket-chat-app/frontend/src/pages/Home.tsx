import Beams from "../components/Beams";
import ShinyText from "../components/ShinyText";
import SplitText from "../components/SplitText";
import GlassSurface from "../components/GlassSurface";
import { Button } from "../components/ui/button";
import FadeContent from "../components/FadeContent";

const Home = () => {
  return (
    <div>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={3}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div>

      {/* Foreground */}
      <div className="w-full h-screen flex flex-col items-center">
        <FadeContent
          blur={true}
          duration={1000}
          easing="ease-out"
          initialOpacity={0}
        >
          <GlassSurface
            width={700}
            distortionScale={20}
            redOffset={5}
            greenOffset={10}
            brightness={60}
            opacity={0.5}
            mixBlendMode="screen"
            blur={60}
            className=" mt-6 flex bg-red-600"
          >
            <div className="flex justify-between w-[85%]">
              <h1 className="text-white text-2xl">Chatify</h1>

              <Button className="bg-white text-black hover:bg-black hover:text-white text-xl">
                Get Started
              </Button>
            </div>
          </GlassSurface>
        </FadeContent>

        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full text-white mb-20">
          {/* Example text or component */}
          <SplitText
            text="CHATIFY"
            className="text-7xl"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />

          <FadeContent
          blur={true}
          initialOpacity={0}
          duration={500}
          >
            <ShinyText
              className="font-[Neue-Montreal-Medium] mt-2 text-xl"
              text="A Real-Time Private Chat App with Private Rooms"
              disabled={false}
              speed={1}
            />
          </FadeContent>
        </div>
      </div>
    </div>
  );
};

export default Home;
