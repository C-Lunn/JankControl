import { useState } from "react";
import PlaybackBar from "./PlaybackBar";

export const Empty = () => (
    <PlaybackBar
        isPlaying
        onPlay={() => null}
        title="An Song Title"
        artist="A Artiste"
        progress={{ current: 666, total: 999 }}
        volume={0.9}
    ></PlaybackBar>
);

export const Overflow = () => {
    const [volume, setVolume] = useState(0.9);
    return (
        <PlaybackBar
            isPlaying
            onPlay={() => null}
            title="A lengthy annoyingly verbose bloviating title what is sure to break things beyond beggared belief blablablabREEEEEEEEEEEEEEEEEE"
            artist="IOI O OIiojf oiJWFIOj OWFIjA WOFJ IOQWJ IOQW FIOjW IWIOW iWFioJ WFIJW fiWJF OIWJfioWJ fiJW FIOQWiwjf IWFJ IWFJI fiJW F"
            progress={{
                current: 199,
                total: 599,
            }}
            volume={volume}
            onVolumeChange={setVolume}
        />
    );
};
