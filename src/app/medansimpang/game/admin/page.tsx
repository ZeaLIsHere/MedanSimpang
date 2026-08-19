import type { Metadata } from 'next';
import GameFrame from '@/components/game/GameFrame';

export const metadata: Metadata = {
  title: 'Admin Quiz Medan Simpang',
  description: 'Dashboard admin dan host Quiz Medan Simpang.',
  robots: { index: false, follow: false },
};

export default function GameAdminPage() {
  return <GameFrame mode="admin" />;
}
