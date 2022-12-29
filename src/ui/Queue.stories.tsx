import Queue from "./Queue";

type QueueItem = Parameters<typeof Queue>[0]["items"][0];

const testItems: QueueItem[] = [
    {
        position: 0,
        title: "Jazzing Jazzingly",
        artist: "Jazzy McJazzypants",
        isPresent: true,
        status: "played",
        submitter: { id: "123", username: "teetow", server_nick: "Cheetow" },
    },
    {
        position: 1,
        title: "Winds Of Pocket Change",
        isPresent: true,
        status: "playing",
        artist: "Guns 'n Toasters",
        submitter: {
            id: "324",
            username: "Santana Ft. Rob Thomas",
        },
    },
    {
        position: 2,
        title: "Doin' Your Math Homework",
        isPresent: false,
        status: "deferred",
        submitter: {
            id: "515",
            username: "habitboi",
            server_nick: "Hat Bib Boi",
        },
    },
    {
        position: 3,
        title: "Terrible Terrible Damage",
        isPresent: false,
        status: "queued",
        artist: "Ludovico Einaudi",
        submitter: {
            id: "911",
            username: "the_mop",
            server_nick: "Lord Moppington III",
        },
    },
    {
        position: 4,
        title: "La Bamba",
        isPresent: true,
        status: "queued",
        submitter: { id: "7177", username: "moly", server_nick: "Mowgly" },
    },
    {
        position: 5,
        title: "Obnoxiously long track title with like a bunch of words in it like argenfarbenzwichenmachen, supercalifragilisticexpialidocious and REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",
        artist: "Johann Gambolputty de von Ausfern-schplenden-schlitter-crasscrenbon-fried-digger-dingle-dangle-dongle-dungle-burstein-von-knacker-thrasher-apple-banger-horowitz-ticolensic-grander-knotty-spelltinkle-grandlich-grumblemeyer-spelterwasser-kurstlich-himbleeisen-bahnwagen-gutenabend-bitte-ein-nürnburger-bratwustle-gerspurten-mitzweimache-luber-hundsfut-gumberaber-shönendanker-kalbsfleisch-mittler-aucher von Hautkopft of Ulm",
        submitter: {
            id: "1234",
            username:
                "obnoxiouslylongusernamewithoutspacesinitgoodlordwillyoushutupman",
        },
        isPresent: true,
        status: "queued",
    },
];

export const empty = () => <Queue items={[]} />;

export const singleItem = () => <Queue items={[testItems[3]]} />;

export const manyItems = () => <Queue items={testItems} />;
