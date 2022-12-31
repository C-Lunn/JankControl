import { ComponentProps } from "react";
import Queue from "../ui/Queue";

const Username = [
    "lord_moppington",
    "hurgen_flurk_69",
    "fnosktosk420",
    "teechow",
    "soularstellar",
    "arkbark_zero",
    "fakey_mc_fakeypants",
];

const Screenname = [
    "Lord Moppington III",
    "Cheatow",
    "That Fucking Guy",
    "Soul He/Helium",
    "Fake Username",
    "Real Username",
];

const Songname = [
    "Doin' Your Math Homework",
    "Thumbthumbing",
    "Never gonna give you away",
    "Song Number Five",
    "Mambo #2",
    "Shipping off to Cornwall",
    "Death, Chaos and Destruction",
    "I'm only happy when I'm glad",
    "Loneliness is unpleasant",
    "Shake, rattle and twerk",
];

const rnd = (n: number = 1) => Math.round(Math.random() * n);
const flip = (probability = 0.5) => rnd() > probability;
const pick = (a: unknown[]) => a[rnd(a.length - 1)];

type QueueItem = ComponentProps<typeof Queue>["items"][0];

const genFakeSubmission = () =>
    ({
        isPresent: flip(),
        position: rnd() * 100,
        status: ["played", "queued", "deferred"][rnd()],
        submitter: {
            avatar_url: "https://cataas.com/c?wi=256&he=256",
            username: pick(Username),
            server_nick: pick(Screenname),
            id: rnd(100).toString(),
        },
        title: pick(Songname),
    } as QueueItem);

export const genFakeSubmissions = (number: number) => {
    const midpoint = Math.floor(number / 2);

    let q = Array(number)
        .fill(0)
        .map((_) => genFakeSubmission())
        .map((qi, i) => {
            if (i < midpoint) {
                qi.status = "played";
            } else if (i > midpoint) {
                qi.status = "queued";
            } else {
                qi.isPresent = true;
                qi.status = "playing";
            }

            if (!qi.isPresent && qi.status != "played") {
                qi.status = "deferred";
            }

            return qi;
        });

    return q;
};
