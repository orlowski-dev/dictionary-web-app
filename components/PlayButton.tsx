"use client";

import { useRef } from "react";
import { TbPlayerPlayFilled } from "react-icons/tb";

export default function PlayButton({
  audioArr,
}: {
  audioArr: { audio: string }[];
}) {
  const foundAudio = audioArr.filter((audioArr) => audioArr.audio.length !== 0);
  const audioElemRef = useRef<HTMLAudioElement>(null);

  if (!foundAudio) return undefined;

  return (
    <>
      <audio ref={audioElemRef} src={foundAudio[0].audio} />
      <button
        title="Play"
        onClick={() => {
          audioElemRef.current?.play();
        }}
      >
        <TbPlayerPlayFilled />
      </button>
    </>
  );
}
