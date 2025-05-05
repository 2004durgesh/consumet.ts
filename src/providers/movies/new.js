import { getSources } from "./megacloud.getsrcs.js";

(async () => {
    const sources = await getSources("https://megacloud.blog/embed-2/e-1/KxQ16iMffl4Q?k=1");
    console.log(sources);
    }
)();