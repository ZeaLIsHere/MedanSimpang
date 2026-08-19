import type { Metadata } from 'next';
import GameFrame from '@/components/game/GameFrame';

export const metadata: Metadata = {
  title: 'Quiz Medan Simpang',
  description: 'Masuk ke room dan mainkan Quiz Medan Simpang secara realtime.',
};

export default function GamePage() {
  return <GameFrame mode="participant" />;
}
