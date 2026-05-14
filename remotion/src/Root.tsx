import { Composition } from 'remotion';
import { TheodoraVideo } from './TheodoraVideo';

export function RemotionRoot() {
  return (
    <Composition
      id="TheodoraVideo"
      component={TheodoraVideo}
      durationInFrames={270}  // 9 seconds at 30fps
      fps={30}
      width={1080}
      height={1920}
    />
  );
}
