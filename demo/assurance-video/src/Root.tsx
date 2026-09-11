import React from 'react';
import {Composition} from 'remotion';
import {Terminal} from './Terminal';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="AssuranceLoop"
    component={Terminal}
    durationInFrames={450} /* 15s @ 30fps */
    fps={30}
    width={1920}
    height={1080}
  />
);
