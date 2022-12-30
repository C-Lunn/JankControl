import PlaybackBar from "./PlaybackBar";

export const Empty = () => (
    <PlaybackBar
        isPlaying
        onPlay={() => null}
        title="An Song Title"
        artist="A Artiste"
        progress={{ current: 666, total: 999 }}
    ></PlaybackBar>
);
