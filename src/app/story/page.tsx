import GameLoader from '@/components/GameLoader';
import {Story} from '@/components/Story';
import { Suspense } from 'react';


export default function Home() {
  return (
    <Suspense fallback={<GameLoader />}>
    <Story/>
    </Suspense>
  );
}
