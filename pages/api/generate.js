/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { prompt, size } = req.body;

  const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

  try {
    const response = await openai.createImage({
      n: 1,
      prompt,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({ imageUrl, success: true });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res
      .status(400)
      .json({ message: 'The image could not be generated.', success: false });
  }
}
