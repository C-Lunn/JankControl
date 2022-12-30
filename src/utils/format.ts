export const pad = (ts: number, zpad = 2) => {
    let out = ts.toString();
    while (out.length < zpad) {
        out = "0" + out;
    }
    return out.substring(0, zpad > 0 ? Math.max(zpad, out.length) : out.length);
};

const HOUR_THRES = 60 * 60;
const MINUTE_THRES =  60;

export class TS {
    ts: number;
    sign: string;
    h: number;
    m: number;
    s: number;
    ms: number;

    constructor(seconds: number) {
        this.ts = seconds;

        let remainder: number = Math.abs(seconds);
        this.sign = seconds >= 0 ? "" : "-";

        this.h = Math.floor(remainder / HOUR_THRES);
        remainder -= this.h * HOUR_THRES;
        this.m = Math.floor(remainder / MINUTE_THRES);
        remainder -= this.m * MINUTE_THRES;
        this.s = Math.floor(remainder);
        remainder -= this.s;
        this.ms = remainder;
    }

    get shortformat() {
        let out = `${pad(this.m)}:${pad(this.s)}`;
        if (Math.abs(this.ts) >= HOUR_THRES) out = `${pad(this.h)}:${out}`;
        out = `${this.sign}${out}`;

        return out;
    }
}

export const shortformat = (seconds: number) =>
    new TS(seconds).shortformat;
