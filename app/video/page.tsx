'use client';

import { Player } from '@remotion/player';
import { TheodoraVideo } from '../../remotion/src/TheodoraVideo';

export default function VideoPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#111',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: 32,
      }}
    >
      <h1 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: 22, margin: 0 }}>
        Theodora — Summer Edition
      </h1>

      <Player
        component={TheodoraVideo}
        durationInFrames={270}
        fps={30}
        compositionWidth={1080}
        compositionHeight={1920}
        style={{
          height: '80vh',
          borderRadius: 12,
          overflow: 'hidden',
        }}
        controls
        loop
      />
    </div>
  );
}
