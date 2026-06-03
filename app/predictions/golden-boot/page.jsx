"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PredictionLayout from "@/components/layout/PredictionLayout";
import HeroSection from "@/components/predictor/HeroSection";
import BigWinnerCard from "@/components/predictor/BigWinnerCard";
import PredictionTable from "@/components/predictor/PredictionTable";
import BonusPredictions from "@/components/predictor/BonusPredictions";
import PredictionReadyCard from "@/components/predictor/PredictionReadyCard";
import BottomActionBar from "@/components/predictor/BottomActionBar";
import MatchSchedule from "@/components/predictor/MatchSchedule";
import RelatedTools from "@/components/predictor/RelatedTools";
import FloatingShareButton from "@/components/predictor/FloatingShareButton";
import OnboardingHint from "@/components/predictor/OnboardingHint";
import ShareableCard from "@/components/predictor/ShareableCard";
import SeoContent from "@/components/seo/SeoContent";
import FaqAccordion from "@/components/seo/FaqAccordion";
import Toast from "@/components/ui/Toast";
import Modal from "@/components/ui/Modal";

import playersData from "@/data/players.json";
import teamsData from "@/data/teams.json";
import youngPlayersData from "@/data/youngPlayers.json";
import matchupsData from "@/data/matchups.json";
import matchesData from "@/data/matches.json";
import toolsData from "@/data/tools.json";

import { loadPredictions, savePredictions } from "@/lib/storage";
import { sharePrediction, downloadAsPNG } from "@/lib/share";
import { fireConfetti } from "@/lib/confetti";

const DEFAULT_BONUS = {
  worldCupWinner: teamsData.find((t) => t.id === "brazil"),
  darkHorse: teamsData.find((t) => t.id === "morocco"),
  biggestUpset: matchupsData.find((m) => m.id === "ger-esp"),
  bestYoungPlayer: youngPlayersData.find((p) => p.id === "musiala"),
};

const toolMeta = toolsData.find((t) => t.id === "golden-boot");

function getInitialPlayers() {
  return playersData.map((p) => ({
    ...p,
    predictedGoals: p.defaultPredictedGoals,
  }));
}

export default function GoldenBootPage() {
  const [players, setPlayers] = useState(getInitialPlayers);
  const [bonus, setBonus] = useState(DEFAULT_BONUS);
  const [toast, setToast] = useState(null);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const previousWinnerIdRef = useRef(null);
  const previousRanksRef = useRef({});
  const winnerCardRef = useRef(null);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const saved = loadPredictions();
    if (saved) {
      if (saved.players) {
        const restored = playersData.map((p) => {
          const savedPlayer = saved.players.find((sp) => sp.id === p.id);
          return {
            ...p,
            predictedGoals:
              savedPlayer?.predictedGoals ?? p.defaultPredictedGoals,
          };
        });
        setPlayers(restored);
      }
      if (saved.bonus) {
        setBonus({
          worldCupWinner:
            teamsData.find((t) => t.id === saved.bonus.worldCupWinner?.id) ||
            DEFAULT_BONUS.worldCupWinner,
          darkHorse:
            teamsData.find((t) => t.id === saved.bonus.darkHorse?.id) ||
            DEFAULT_BONUS.darkHorse,
          biggestUpset:
            matchupsData.find((m) => m.id === saved.bonus.biggestUpset?.id) ||
            DEFAULT_BONUS.biggestUpset,
          bestYoungPlayer:
            youngPlayersData.find(
              (p) => p.id === saved.bonus.bestYoungPlayer?.id
            ) || DEFAULT_BONUS.bestYoungPlayer,
        });
      }
    }
  }, []);

  // Persist on change
  useEffect(() => {
    if (!mounted) return;
    savePredictions({
      players: players.map((p) => ({ id: p.id, predictedGoals: p.predictedGoals })),
      bonus,
    });
  }, [players, bonus, mounted]);

  // Sorted players with rank tracking
  const sortedPlayers = useMemo(() => {
    const ranked = [...players].sort((a, b) => {
      if (b.predictedGoals !== a.predictedGoals)
        return b.predictedGoals - a.predictedGoals;
      return a.name.localeCompare(b.name);
    });
    return ranked.map((p, idx) => ({
      ...p,
      currentRank: idx + 1,
      previousRank: previousRanksRef.current[p.id] || idx + 1,
    }));
  }, [players]);

  // Update previous-ranks reference AFTER render
  useEffect(() => {
    const newRanks = {};
    sortedPlayers.forEach((p) => {
      newRanks[p.id] = p.currentRank;
    });
    previousRanksRef.current = newRanks;
  }, [sortedPlayers]);

  const winner = sortedPlayers[0];

  // Fire confetti when #1 changes
  useEffect(() => {
    if (!mounted || !winner) return;
    if (previousWinnerIdRef.current && previousWinnerIdRef.current !== winner.id) {
      fireConfetti(winnerCardRef.current);
      setToast({ message: `🎉 New leader: ${winner.name}!`, type: "success" });
    }
    previousWinnerIdRef.current = winner.id;
  }, [winner?.id, mounted]);

  // Handlers
  const handleIncrement = (id) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === id && p.predictedGoals < 20
          ? { ...p, predictedGoals: p.predictedGoals + 1 }
          : p
      )
    );
  };

  const handleDecrement = (id) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === id && p.predictedGoals > 0
          ? { ...p, predictedGoals: p.predictedGoals - 1 }
          : p
      )
    );
  };

  const handleResetConfirm = () => {
    setPlayers(getInitialPlayers());
    setBonus(DEFAULT_BONUS);
    setToast({ message: "Predictions reset to defaults", type: "info" });
  };

  const handleShare = async () => {
    const result = await sharePrediction({ players: sortedPlayers });
    if (result.ok) {
      setToast({
        message:
          result.method === "clipboard"
            ? "Copied to clipboard!"
            : "Shared successfully!",
        type: "success",
      });
    }
  };

  const handleDownload = async () => {
    setToast({ message: "Generating your share card…", type: "info" });
    await new Promise((r) => setTimeout(r, 100));
    const result = await downloadAsPNG("shareable-card", "golden-boot-prediction");
    if (result.ok) {
      setToast({ message: "Image downloaded!", type: "success" });
    } else {
      setToast({ message: "Download failed", type: "error" });
    }
  };

  return (
    <PredictionLayout
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: "Golden Boot Predictor" },
      ]}
    >
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Onboarding hint (first-time visitors) */}
      <OnboardingHint />

      {/* 3. Big Current Golden Boot Winner card */}
      <div ref={winnerCardRef}>
        <BigWinnerCard winner={winner} />
      </div>

      {/* 4. Top Scorer Predictions table */}
      <PredictionTable
        players={sortedPlayers}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />

      {/* 5. Bonus Predictions */}
      <BonusPredictions
        teams={teamsData}
        youngPlayers={youngPlayersData}
        matchups={matchupsData}
        bonus={bonus}
        onChange={setBonus}
      />

      {/* 6. Your prediction is ready! share card */}
      <PredictionReadyCard onShare={handleShare} />

      {/* 7. Bottom action bar with Download as Image */}
      <BottomActionBar onDownload={handleDownload} />

      {/* 8. FIFA World Cup 2026 Schedule */}
      <MatchSchedule matches={matchesData} />

      {/* 9. SEO Content sections (800+ words) */}
      <SeoContent sections={toolMeta.seo.sections} />

      {/* 10. FAQ Accordion */}
      <FaqAccordion faqs={toolMeta.seo.faqs} />

      {/* 11. Related tools — internal linking */}
      <RelatedTools currentToolId="golden-boot" />

      {/* Reset link (subtle) */}
      <div className="text-center">
        <button
          onClick={() => setResetModalOpen(true)}
          className="text-xs text-[var(--color-text-muted)] hover:text-red-600"
        >
          Reset all predictions
        </button>
      </div>

      {/* Floating share button (mobile) */}
      <FloatingShareButton onShare={handleShare} />

      {/* Off-screen branded share card for PNG export */}
      <ShareableCard winner={winner} top5={sortedPlayers} bonus={bonus} />

      {/* Reset confirmation modal */}
      <Modal
        open={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Reset all predictions?"
        description="This will restore the default goal counts for every player and reset your bonus predictions."
        confirmLabel="Reset"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleResetConfirm}
        icon={
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path d="M3 12a9 9 0 1015-6.7L21 8M21 3v5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
      />

      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </PredictionLayout>
  );
}
