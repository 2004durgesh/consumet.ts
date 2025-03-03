"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utils_1 = require("../utils");
class Kwik extends models_1.VideoExtractor {
    constructor() {
        super(...arguments);
        this.serverName = 'kwik';
        this.sources = [];
        this.host = 'https://animepahe.ru';
        this.extract = async (videoUrl) => {
            try {
                const { data } = await this.client.get(`${videoUrl.href}`, {
                    headers: {
                        authority: 'animepahe.ru',
                        accept: 'application/json, text/javascript, */*; q=0.01',
                        'accept-language': 'en-US,en;q=0.9',
                        cookie: '__ddg2_=;',
                        dnt: '1',
                        'sec-ch-ua': '"Not A(Brand";v="99", "Microsoft Edge";v="121", "Chromium";v="121"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"Windows"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                        'x-requested-with': 'XMLHttpRequest',
                        referer: `${this.host}`,
                        'user-agent': utils_1.USER_AGENT,
                    },
                });
                const source = eval(/(eval)(\(f.*?)(\n<\/script>)/s.exec(data)[2].replace('eval', '')).match(/https.*?m3u8/);
                this.sources.push({
                    url: source[0],
                    isM3U8: source[0].includes('.m3u8'),
                });
                return this.sources;
            }
            catch (err) {
                console.log('kwik', err);
                throw new Error(err.message);
            }
        };
    }
}
exports.default = Kwik;
//# sourceMappingURL=kwik.js.map