import { VideoExtractor, IVideo } from '../models';
import { USER_AGENT } from '../utils';

class Kwik extends VideoExtractor {
  protected override serverName = 'kwik';
  protected override sources: IVideo[] = [];

  private readonly host = 'https://animepahe.ru';

  override extract = async (videoUrl: URL, sessionId: string): Promise<IVideo[]> => {
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
          referer: `${this.host}/anime/${sessionId}`,
          'user-agent': USER_AGENT,
        },
      });

      const source = eval(/(eval)(\(f.*?)(\n<\/script>)/s.exec(data)![2].replace('eval', '')).match(
        /https.*?m3u8/
      );
      this.sources.push({
        url: source[0],
        isM3U8: source[0].includes('.m3u8'),
      });

      return this.sources;
    } catch (err) {
      console.log('kwik', err);
      throw new Error((err as Error).message);
    }
  };
}
export default Kwik;
