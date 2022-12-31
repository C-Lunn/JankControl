import "./App.scss";
import config from "../config.json";
import { useEffect, useReducer } from "react";
import useWebSocket from "react-use-websocket";
import PlaybackBar from "./ui/PlaybackBar";
import Queue from "./ui/Queue";
import { genFakeSubmissions } from "./utils/faker";

const fakeItems = genFakeSubmissions(19).map((s, i) => ({ key: i, ...s }));

const WS_ADDRESS = config.WEBSOCKET_ADDRESS || "ws://77.68.51.61:42069";

type SongState = {
    present_duration: number;
    duration: number;
    is_playing: boolean;
    title: string;
    up_next: string;
    url: string;
    volume: number;
};

type GenericAction = {
    type: "START" | "STOP" | "SKIP" | "VOLUME" | "SONG_UPDATE";
    payload: number;
};

type SongUpdateAction = {
    type: "SONG_UPDATE";
    payload: SongState;
};

const isSongUpdateAction = (action: PlayerAction): action is SongUpdateAction =>
    action.type === "SONG_UPDATE";

type PlayerAction = GenericAction | SongUpdateAction;

const initialState: SongState = {
    present_duration: 0,
    duration: 0,
    is_playing: false,
    title: "",
    up_next: "",
    url: "",
    volume: 0,
};

const stateReducer = (state: SongState, action: PlayerAction) => {
    if (isSongUpdateAction(action)) {
        state = action.payload;
    }
    if (action.type === "VOLUME") {
        state.volume = action.payload;
    }

    return state;
};

const App = () => {
    const [playerState, dispatch] = useReducer(stateReducer, initialState);

    const { sendMessage, lastMessage, readyState } = useWebSocket(WS_ADDRESS);

    useEffect(() => {
        if (lastMessage === null) return;
        const data = JSON.parse(lastMessage.data);

        switch (data.type) {
            case "NO_QUEUE":
                break;
            case "SONG_UPDATE":
                dispatch({ type: "SONG_UPDATE", payload: data.song });
                break;

            default:
                console.log(data);
                break;
        }
    }, [lastMessage]);

    const handleVolumeChange = (vol: number) => {
        sendMessage(`set_volume=${vol}`);
        dispatch({ type: "VOLUME", payload: vol });
    };

    return (
        <>
            <Queue items={fakeItems} />
            <PlaybackBar
                isPlaying={playerState.is_playing}
                title={playerState.title}
                artist={
                    playerState.up_next && `Up next: ${playerState.up_next}`
                }
                onPlay={() => {
                    sendMessage(playerState.is_playing ? "pause" : "start");
                }}
                onSkip={() => sendMessage("skip")}
                progress={{
                    current: playerState.present_duration,
                    total: playerState.duration,
                }}
                volume={playerState.volume}
                onVolumeChange={handleVolumeChange}
            />
        </>
    );
};

export default App;
