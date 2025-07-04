"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import RecordingPanel from "@/components/RecordingPanel";
import DreamArchive from "@/components/DreamArchive";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import SettingsProfile from "@/components/SettingsProfile";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { 
  PlusIcon, 
  PersonIcon, 
  GridIcon,
  GearIcon,
  MagnifyingGlassIcon,
  FileTextIcon,
  HeartIcon,
  HomeIcon,
  CounterClockwiseClockIcon,
  MoonIcon,
  MagicWandIcon,
  CrumpledPaperIcon
} from "@radix-ui/react-icons"

interface DashboardProps {
  appLogo?: string
  userName?: string
}

const HOME_PHRASES = [
  "Turn your dreams to reality, {name}",
  "Dream big, {name}",
  "Nice to see you, night owl"
];

type Step = "home" | "recording" | "archive" | "settings";

export default function Dashboard({ appLogo = "✦", userName = "Christine" }: DashboardProps) {
  const [sidebarFocused, setSidebarFocused] = useState(false)
  const [currentStep, setCurrentStep] = useState<Step>("home");
  const [headerPhrase, setHeaderPhrase] = useState("");
  
  const sidebarItems = [
    { icon: HomeIcon, label: "Home", action: () => setCurrentStep("home") },
    { icon: PlusIcon, label: "Add", action: () => setCurrentStep("recording") },
    { icon: CounterClockwiseClockIcon, label: "Archive", action: () => setCurrentStep("archive") },
    { icon: MagicWandIcon, label: "Personalization", action: () => setCurrentStep("settings") },
  ]
  const [backgroundImage, setBackgroundImage] = useState("/dreambackground1.png");

  const backgrounds = [
    "/dreambackground1.png",
    "/dreambackground2.png",
    "/dreambackground3.png",
    "/dreambackground4.png",
  ];

  // Pick a random one on first render
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setBackgroundImage(backgrounds[randomIndex]);
  }, []);

  // Update header phrase when currentStep changes
  useEffect(() => {
    if (currentStep === "home") {
      const phrase = HOME_PHRASES[Math.floor(Math.random() * HOME_PHRASES.length)].replace("{name}", userName);
      setHeaderPhrase(phrase);
    } else if (currentStep === "recording") {
      setHeaderPhrase("Turning into reality");
    } else if (currentStep === "archive") {
      setHeaderPhrase("Archive");
    } else if (currentStep === "settings") {
      setHeaderPhrase("Settings");
    }
  }, [currentStep, userName]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex">
      {/* Background layers for entire screen */}
      <div className="absolute inset-0">
        {/* Dot pattern background layer */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Dream background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        />
      </div>

      {/* Left Sidebar */}
      <aside
        className={`relative z-10 w-16 md:w-20 flex flex-col items-center py-4 border-r border-white/10 transition-all duration-300 bg-white/10 ${
          sidebarFocused ? "opacity-100" : "opacity-60 hover:opacity-100"
        }`}
        onMouseEnter={() => setSidebarFocused(true)}
        onMouseLeave={() => setSidebarFocused(false)}
        onFocus={() => setSidebarFocused(true)}
        onBlur={() => setSidebarFocused(false)}
      >
        {/* Favicon at the top of the sidebar, monochrome */}
        <div className="mb-4">
          <img
            src="/favicon.ico"
            alt="App Logo"
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
            draggable="false"
          />
        </div>
        <div className="flex flex-col items-center justify-center flex-1 gap-4 md:gap-5">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`p-1.5 md:p-2 rounded-full transition-all duration-200 hover:bg-gray-700/50 focus:bg-gray-700/50 focus:outline-none ${
                index === 0 ? "bg-gray-700/30" : ""
              }`}
              title={item.label}
              onClick={item.action}
            >
              <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-300" />
            </button>
          ))}
        </div>
        {/* GitHub icon at the bottom of the sidebar */}
        <div className="mt-auto mb-2 flex justify-center w-full">
          <a
            href="https://github.com/chrstnlai/aihack"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-xs flex items-center transition-colors hover:bg-black/20"
            title="GitHub Repository"
            style={{ lineHeight: 0 }}
          >
            <GitHubLogoIcon className="w-4 h-4 text-white opacity-60 hover:opacity-100" />
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <header className="relative z-10 flex items-center justify-between p-3 md:p-4 min-h-[56px]">
          <div className="flex items-center gap-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-xl font-bold flex items-center justify-center min-w-[1.5em] min-h-[1.5em]"
              >
                {currentStep === "settings" ? (
                  <MagicWandIcon className="w-4 h-4 text-white" />
                ) : currentStep === "recording" ? (
                  <MoonIcon className="w-4 h-4 text-white" />
                ) : currentStep === "archive" ? (
                  <CounterClockwiseClockIcon className="w-4 h-4 text-white" />
                ) : (
                  <span>{appLogo}</span>
                )}
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.h1
                key={headerPhrase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-base md:text-lg font-light"
              >
                {headerPhrase}
              </motion.h1>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-base md:text-lg font-light opacity-60 hover:opacity-80 cursor-copy transition-opacity select-none"
              title="Copy share link"
              onClick={() => navigator.clipboard.writeText(process.env.NEXT_PUBLIC_URL || window.location.origin)}
            >
              Share&nbsp;↗
            </span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="relative z-10 flex-1 flex items-center justify-center px-3 md:px-6">
  <div className="w-full max-w-xl">
    {currentStep === "archive" ? (
      <DreamArchive onBack={() => setCurrentStep("home")} />
    ) : currentStep === "settings" ? (
      <SettingsProfile />
    ) : currentStep === "recording" ? (
      <RecordingPanel onBack={() => setCurrentStep("home")} />
    ) : (
      // Dreamscape Intro
      <div className="flex flex-col items-center justify-center h-full">
        <div
          className="bg-white/20 backdrop-blur-md border border-white/20 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 aspect-[9/11] w-full max-w-xs  md:max-w-sm px-8"
        >
          <img
            src="/favicon.ico"
            alt="Dreamscape Logo"
            className="mb-6 w-16 h-16 md:w-20 md:h-20 object-contain"
          />
          <h1 className="text-lg font-semibold">Dreamscape</h1>
          <p className="text-center text-base md:text-lg font-light text-white py-1">
            Your subconscious comes to life. Record your dreams with just your voice, and
            watch as your words transform into vivid, surreal visualizations, turning your
            dreams into something you can see, feel, and explore.
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-base font-medium shadow-sm hover:bg-white/20 transition-all backdrop-blur-md"
            onClick={() => setCurrentStep("recording")}
          >
            <MoonIcon className="w-5 h-5" />
            Re-enact your dream
          </button>

          <button
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-base font-medium shadow-sm hover:bg-white/20 transition-all backdrop-blur-md"
            onClick={() => setCurrentStep("archive")}
          >
            <CrumpledPaperIcon className="w-5 h-5" />
            See previous dreams
          </button>
        </div>
      </div>
    )}
  </div>
</main>

      </div>
    </div>
  )
} 