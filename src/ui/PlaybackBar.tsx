import { CSSProperties } from "react";
import { Next, PlayPause, Prev } from "./Assets";
import "./PlaybackBar.scss";

type ProgressProps = {
    progress: number;
};

const Progress = ({ progress }: ProgressProps) => {
    return (
        <div className="progress">
            <div className="track">
                <div
                    className="indicator"
                    style={{ "--progress": progress } as CSSProperties}
                ></div>
            </div>
        </div>
    );
};

type Props = {
    isPlaying: boolean;
    title: string;
    artist?: string;
    onPlay: () => void;
    progress: {
        current: number;
        total: number;
    };
};

const PlaybackBar = ({ isPlaying, title, artist, onPlay, progress }: Props) => {
    const percentProgress = progress.current / progress.total;
    return (
        <div className="playback text-neutral color-fg">
            <div className="playback__details">
                <div className="title">{title}</div>
                <div className="artist">{artist}</div>
            </div>

            <div className="playback__controls">
                <button className="playbackbutton prev" onClick={onPlay}>
                    <Prev />
                </button>
                <button className="playbackbutton playpause" onClick={onPlay}>
                    <PlayPause isPlaying={isPlaying} />
                </button>
                <button className="playbackbutton next" onClick={onPlay}>
                    <Next />
                </button>
                <div className="scrubber">
                    <span className="current">{progress.current}</span>
                    <span className="progress">
                        <Progress progress={percentProgress} />
                    </span>
                    <span className="total">{progress.total}</span>
                </div>
            </div>

            <div className="playback__macros">
                <button className="playbackbutton fadeout">Fade out</button>
            </div>
        </div>
    );
};

export default PlaybackBar;
