import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function evaluate(base64url) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "for the first four S in the 5s methodology rate the image from 1-10, answer only in short sentences.",
          },
          {
            type: "image_url",
            image_url: {
              url: base64url,
            },
          },
        ],
      },
    ],
    max_tokens: 300,
  });
  console.log(JSON.stringify(response));
  return JSON.stringify(response);
}

export default evaluate;
