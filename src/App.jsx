import { useState, useEffect, lazy } from "react";

import Hero from "./components/Hero.jsx";
import AIAssistant from "./components/AIAssistant.jsx";
import BackgroundSwitcher from "./components/backgrounds/BackgroundSwitcher.jsx";
import ThemeControls from "./components/theme/ThemeControls";
import LoadingScreen from "./components/animations/LoadingScreen";
import CursorFollower from "./components/animations/CursorFollower";
import LazySection from "./components/common/LazySection";
import OfflineBanner from "./components/common/OfflineBanner";
import UpdatePrompt from "./components/common/UpdatePrompt";
import Navbar from "./components/layout/Navbar";

// NEW BACKGROUND
import AuroraBackground from "./components/background/AuroraBackground";

// NEW IMPORT
import PremiumExtras from "./components/extras/PremiumExtras.jsx";

// Accessibility
import SkipLink from "./components/accessibility/SkipLink";
import AccessibilityMenu from "./components/accessibility/AccessibilityMenu";

// SEO
import SEO from "./components/seo/SEO";

// Hooks
import { useSessionTracker } from "./hooks/useSessionTracker";
import { useClickTracker } from "./hooks/useClickTracker";
import { recordVisit } from "./hooks/useVisitorLog";

// Admin
import AdminDashboard from "./components/admin/AdminDashboard";

// Lazy Loaded Sections
const AboutSection = lazy(() =>
  import("./components/about/AboutSection.jsx")
);

const TimelineSection = lazy(() =>
  import("./components/timeline/TimelineSection.jsx")
);

const SkillsSection = lazy(() =>
  import("./components/skills/SkillsSection")
);

const ProjectsSection = lazy(() =>
  import("./components/projects/ProjectsSection")
);

const GitHubSection = lazy(() =>
  import("./components/github/GitHubSection")
);

const CodingProfilesSection = lazy(() =>
  import("./components/coding/CodingProfilesSection")
);

const ExperienceSection = lazy(() =>
  import("./components/experience/ExperienceSection")
);

const CertificatesSection = lazy(() =>
  import("./components/certificates/CertificatesSection")
);

const TechStackSection = lazy(() =>
  import("./components/techstack/TechStackSection.jsx")
);

const StatsSection = lazy(() =>
  import("./components/stats/StatsSection")
);

const TestimonialsSection = lazy(() =>
  import("./components/testimonials/TestimonialsSection")
);

const ResumeSection = lazy(() =>
  import("./components/resume/ResumeSection")
);

const ContactSection = lazy(() =>
  import("./components/contact/ContactSection")
);

const BlogSection = lazy(() =>
  import("./components/blog/BlogSection")
);

const ResumeReviewSection = lazy(() =>
  import("./components/resume-review/ResumeReviewSection")
);

const ProjectExplainerSection = lazy(() =>
  import("./components/project-explainer/ProjectExplainerSection")
);

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Admin Page (No Aurora Background)
  if (route === "/admin") {
    return (
      <>
        <CursorFollower />
        <AdminDashboard />
      </>
    );
  }

  // Portfolio Hooks
  useSessionTracker();
  useClickTracker();

  useEffect(() => {
    recordVisit();
  }, []);

  return (
    <>
      {/* Aurora Background */}
      <AuroraBackground />

      <SEO />

      {/* Accessibility */}
      <SkipLink />

      <LoadingScreen onFinish={() => setLoaded(true)} />

      <CursorFollower />
      <OfflineBanner />
      <UpdatePrompt />

      {/* Navigation */}
      <Navbar />

      <div style={{ visibility: loaded ? "visible" : "hidden" }}>
        <main
          id="main-content"
          className="bg-blueprint-bg text-blueprint-text font-body"
        >
          <Hero />

          <LazySection>
            <AboutSection />
          </LazySection>

          <LazySection>
            <TimelineSection />
          </LazySection>

          <LazySection>
            <SkillsSection />
          </LazySection>

          <LazySection>
            <ProjectsSection />
          </LazySection>

          <LazySection>
            <GitHubSection />
          </LazySection>

          <LazySection>
            <CodingProfilesSection />
          </LazySection>

          <LazySection>
            <ExperienceSection />
          </LazySection>

          <LazySection>
            <CertificatesSection />
          </LazySection>

          <LazySection>
            <TechStackSection />
          </LazySection>

          <LazySection>
            <StatsSection />
          </LazySection>

          <LazySection>
            <TestimonialsSection />
          </LazySection>

          <LazySection>
            <ResumeSection />
          </LazySection>

          <LazySection>
            <ContactSection />
          </LazySection>

          {/* Theme + Accessibility Controls */}
          <ThemeControls />
          <AccessibilityMenu />

          <LazySection>
            <BlogSection />
          </LazySection>

          <LazySection>
            <ResumeReviewSection />
          </LazySection>

          <LazySection>
            <ProjectExplainerSection />
          </LazySection>

          <BackgroundSwitcher />

          <AIAssistant />

          {/* Premium Extras */}
          <PremiumExtras />

          <section
            id="projects"
            className="min-h-screen flex items-center justify-center border-t border-blueprint-line"
          >
            <p className="font-mono text-blueprint-muted">
              Projects section — coming next
            </p>
          </section>

          <section
            id="contact"
            className="min-h-screen flex items-center justify-center border-t border-blueprint-line"
          >
            <p className="font-mono text-blueprint-muted">
              Contact section — coming next
            </p>
          </section>
        </main>
      </div>
    </>
  );
}