import { shortformat } from "../utils/format";
import { Next, PlayPause, Prev } from "./Assets";
import "./PlaybackBar.scss";
import Slider from "./Slider";

type Props = {
    isPlaying: boolean;
    title: string;
    artist?: string;
    onPlay: () => void;
    progress: {
        current: number;
        total: number;
    };
    volume: number;
    onVolumeChange?: (value: number) => void;
};

const PlaybackBar = ({
    isPlaying,
    title,
    artist,
    onPlay,
    progress,
    volume,
    onVolumeChange,
}: Props) => {
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
                    <span className="current">
                        {shortformat(progress.current)}
                    </span>
                    <span className="progress">
                        <Slider progress={percentProgress} />
                    </span>
                    <span className="total">{shortformat(progress.total)}</span>
                </div>
            </div>

            <div className="playback__macros">
                <button className="playbackbutton fadeout">Fade out</button>
                <Slider progress={volume} onChange={onVolumeChange} />
            </div>
        </div>
    );
};

export default PlaybackBar;
