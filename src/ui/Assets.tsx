import clsx from "clsx";
import { CSSProperties, PropsWithChildren } from "react";
import "./Assets.scss";

type BaseProps = {
    color?: string;
    size?: string;
    filled?: boolean;
    stroked?: boolean;
};

type FilledProps = Omit<BaseProps, "stroked">;
type StrokedProps = Omit<BaseProps, "filled">;

type Props = FilledProps | StrokedProps;

const Glyph = ({
    name,
    color = "white",
    size = "16px",
    children,
    ...props
}: PropsWithChildren<Props & { name: string }>) => {
    const classes = clsx({
        asset: true,
        [`asset-${name}`]: true,
        filled:
            ("filled" in props && props.filled) ||
            !("stroked" in props && props.stroked),
        stroked: "stroked" in props && props.stroked,
    });
    return (
        <svg
            className={classes}
            style={{ "--glyph-color": color, "--size": size } as CSSProperties}
            viewBox="0 0 16 16"
            width="16"
            height="16"
        >
            {children}
        </svg>
    );
};

export const Dot = ({ ...props }: Props) => {
    return (
        <Glyph {...{ ...props, name: "dot" }}>
            <ellipse className="glyph" cx="8" cy="8" rx="6" ry="6" />
        </Glyph>
    );
};

export const Tringle = ({ ...props }: Props) => {
    return (
        <Glyph {...{ ...props, name: "tringle" }}>
            <path
                className="glyph"
                d="M 7.4 3.6 Q 8 2.5 8.6 3.6 L 13.8 12 Q 14.4 13 13.1 13 L 2.9 13 Q 1.6 13 2.2 12 Z"
            />
        </Glyph>
    );
};

export const Prev = ({ ...props }: Props) => {
    return (
        <Glyph {...{ ...props, name: "prev" }}>
            <path
                className="glyph"
                d="M 5.4 8.6 C 4.8 8.1 4.8 7.8 5.4 7.4 L 13.1 2.2 C 13.7 1.7 14 2 14 2.9 L 14 13 C 14 13.9 13.7 14.2 13.1 13.8 L 5.4 8.6 Z"
            ></path>
            <rect
                className="glyph"
                x="2"
                y="2"
                width="1.5"
                height="12"
                rx="0.5"
                ry="0.5"
            ></rect>
        </Glyph>
    );
};

export const Next = ({ ...props }: Props) => {
    return (
        <Glyph {...{ ...props, name: "prev" }}>
            <path
                className="glyph"
                d="M 10.5 7.4 C 11.2 7.8 11.2 8.1 10.5 8.6 L 2.9 13.8 C 2.3 14.3 2 14 2 13 L 2 3 C 2 2.1 2.3 1.8 2.9 2.3 L 10.5 7.4 Z"
            ></path>

            <rect
                className="glyph"
                x="12.5"
                y="2"
                width="1.5"
                height="12"
                rx="0.5"
                ry="0.5"
            ></rect>
        </Glyph>
    );
};

export const PlayPause = ({
    isPlaying = false,
    ...props
}: Props & { isPlaying?: boolean }) => {
    return !isPlaying ? (
        <Glyph {...{ ...props, name: "play" }}>
            <path
                className="glyph"
                d="M 13.3 7.3 C 14.2 7.7 14.2 8.1 13.3 8.7 L 3.3 14.7 C 2.5 15.3 2 15 2 13.8 L 2 2.1 C 2 1 2.5 0.7 3.3 1.3 L 13.3 7.3 Z"
            ></path>
        </Glyph>
    ) : (
        <Glyph {...{ ...props, name: "pause" }}>
            <rect
                className="glyph"
                x="4"
                y="2"
                width="3"
                height="12"
                rx="0.5"
                ry="0.5"
            ></rect>
            <rect
                className="glyph"
                x="9"
                y="2"
                width="3"
                height="12"
                rx="0.5"
                ry="0.5"
            ></rect>
        </Glyph>
    );
};
