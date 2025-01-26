import axios from "axios";
import fs from "fs";
import path from "path";

const configPath = path.resolve(__dirname, "../../config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const conf2Captcha = config.captcha2;

/**
 *
 * @param siteKey
 * @param pageUrl
 */
export async function solveTurnstileCaptcha(
  siteKey: string,
  pageUrl: string
): Promise<string | null> {
  try {
    const captchaRequest = await axios.post(
      "http://2captcha.com/in.php",
      null,
      {
        params: {
          key: conf2Captcha,
          method: "turnstile",
          sitekey: siteKey,
          pageurl: pageUrl,
          json: 1,
        },
      }
    );

    const captchaId = captchaRequest.data.request;
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const captchaResult = await axios.get("http://2captcha.com/res.php", {
        params: {
          key: conf2Captcha,
          action: "get",
          id: captchaId,
          json: 1,
        },
      });

      if (captchaResult.data.status === 1) {
        return captchaResult.data.request;
      } else if (captchaResult.data.request !== "CAPCHA_NOT_READY") {
        return null;
      }
    }
  } catch (error) {
    console.error("Error solving CAPTCHA:", error);
    return null;
  }
}
