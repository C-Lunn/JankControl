import clsx from "clsx";
import { CSSProperties, PropsWithChildren } from "react";
import "./Assets.scss";

type BaseProps = {
    color: string;
    filled?: boolean;
    stroked?: boolean;
};

type FilledProps = Omit<BaseProps, "stroked">;
type StrokedProps = Omit<BaseProps, "filled">;

type Props = FilledProps | StrokedProps;

const Glyph = ({
    name,
    color,
    children,
    ...props
}: PropsWithChildren<Props & { name: string }>) => {
    const classes = clsx({
        "asset": true,
        [`asset-${name}`]: true,
        filled: "filled" in props && props.filled,
        stroked: "stroked" in props && props.stroked,
    });
    return (
        <svg
            className={classes}
            style={{ "--glyph-color": color } as CSSProperties}
            viewBox="0 0 16 16"
            width="16"
            height="16"
        >
            {children}
        </svg>
    );
};

export const Dot = ({ color, ...props }: Props) => {
    return (
        <Glyph {...{ ...props, color, name: "dot" }}>
            <ellipse className="glyph" cx="8" cy="8" rx="6" ry="6" />
        </Glyph>
    );
};

export const Tringle = ({ color, ...props }: Props) => {
    return (
        <Glyph {...{ ...props, color, name: "tringle" }}>
            <path
                className="glyph"
                d="M 7.4 3.6 Q 8 2.5 8.6 3.6 L 13.8 12 Q 14.4 13 13.1 13 L 2.9 13 Q 1.6 13 2.2 12 Z"
            />
        </Glyph>
    );
};
