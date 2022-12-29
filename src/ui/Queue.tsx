import clsx from "clsx";
import { Dot, Tringle } from "./Assets";
import "./Queue.scss";

type ItemStatus = "playing" | "played" | "queued" | "deferred";

type IndicatorProps = {
    isPresent: boolean;
    status: ItemStatus;
};

const UserIndicators: Record<ItemStatus | string, () => JSX.Element> = {
    played: () => <Dot color="var(--color-accent)" stroked />,
    playing: () => <Dot color="var(--color-accent)" filled />,
    queued: () => <Dot color="#5b0" filled />,
    deferred: () => <Dot color="gray" filled />,
    afk: () => (
        <span style={{ display: "grid", justifyItems: "center" }}>
            <Tringle color="#fd3" filled />
            <span style={{ fontSize: "0.6rem", color: "#fd3" }}>AFK</span>
        </span>
    ),
};

const UserIndicator = ({ isPresent, status }: IndicatorProps) => {
    const Component =
        status === "queued" && !isPresent
            ? UserIndicators["afk"]
            : UserIndicators[status];

    return <Component />;
};

type StatusProps = {
    isPresent: boolean;
    status: ItemStatus;
};

const Status = ({ status, isPresent }: StatusProps) => {
    const classes = clsx({
        status: true,
        "is-present": isPresent,
        [`status-${status}`]: status !== undefined,
    });

    return <div className={classes}>{status === "deferred" && "on hold"}</div>;
};

// TODO: nuke this when types get in
type UserInfo = {
    id: string;
    username: string;
    server_nick?: string;
    avatar_url?: string;
};

type QueueItemProps = {
    position: number;
    title: string;
    submitter: UserInfo;
    isPresent: boolean;
    status: ItemStatus;
    artist?: string;
};

const QueueItem = ({
    title,
    submitter,
    isPresent,
    status,
    artist,
}: QueueItemProps) => {
    const classes = clsx({
        queueitem: true,
        [`status-${status}`]: status !== undefined,
    });
    return (
        <div className={classes}>
            <div className="queueitem__track">
                <span className="title">{title}</span>
                {artist && <span className="artist">{artist}</span>}
            </div>
            <UserIndicator {...{ isPresent, status }} />
            <span className="submitter">
                {submitter.server_nick || submitter.username}
            </span>
            <Status {...{ isPresent, status }} />
        </div>
    );
};

type Props = {
    items: QueueItemProps[];
};

const Queue = ({ items }: Props) => {
    return (
        <div className="queue text-neutral color-fg">
            {items.map((i) => (
                <QueueItem key={i.position} {...i} />
            ))}
        </div>
    );
};

export default Queue;
