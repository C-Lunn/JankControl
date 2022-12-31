import * as RadixSlider from "@radix-ui/react-slider";
import clsx from "clsx";
import { Dot } from "./Assets";
import "./Slider.scss";

type SliderProps = {
    progress: number;
    onChange?: (value: number) => void;
};

const Slider = ({ progress, onChange }: SliderProps) => {
    return (
        <>
            <RadixSlider.Root
                className={clsx("slider", {
                    "is-enabled": onChange !== undefined,
                })}
                max={100}
                step={1}
                aria-label="Volume"
                value={[progress || 0]}
                defaultValue={[0]}
                onValueChange={onChange ? (v) => onChange(v[0]) : undefined}
            >
                <RadixSlider.Track className="slider__track">
                    <RadixSlider.Range className="slider__range" />
                </RadixSlider.Track>
                <RadixSlider.Thumb className="slider__thumb">
                    <Dot color="var(--color-accent)" size="12px" />
                </RadixSlider.Thumb>
            </RadixSlider.Root>
        </>
    );
};

export default Slider;
