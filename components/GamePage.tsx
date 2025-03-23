'use client';
import dynamic from 'next/dynamic';

// Import PhaserGame with SSR disabled
const PhaserGame = dynamic(() => import('../components/PhaserGame'), {
  ssr: false // This ensures the component only renders on client-side
});

// Your page component
export default function GamePage() {
  return (
    <div className="game-container">
      <PhaserGame />
    </div>
  );
}