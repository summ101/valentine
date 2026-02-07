import { useState } from "react";
import HeartShower from "@/components/HeartShower";
import SparkleHeartCursor from "@/components/SparkleHeartCursor";
import EnvelopeLogin from "@/components/EnvelopeLogin";
import LandingSection from "@/components/LandingSection";
import RevealSection from "@/components/RevealSection";
import StoryTimeline from "@/components/StoryTimeline";
import LetterReveal from "@/components/LetterReveal";
import PhotoGallery from "@/components/PhotoGallery";
import HappyValentines from "@/components/HappyValentines";

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [saidYes, setSaidYes] = useState(false);

  return (
    <div className="relative" style={{ cursor: "none" }}>
      <SparkleHeartCursor />
      <HeartShower />

      {/* Envelope login gate */}
      {!isUnlocked && (
        <EnvelopeLogin onUnlock={() => setIsUnlocked(true)} />
      )}

      {/* Main content after unlock */}
      {isUnlocked && (
        <div className={saidYes ? "snap-container" : ""}>
          {!saidYes && (
            <LandingSection onYes={() => setSaidYes(true)} />
          )}

          {saidYes && (
            <>
              <RevealSection />
              <StoryTimeline />
              <LetterReveal />
              <PhotoGallery />
              <HappyValentines />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
