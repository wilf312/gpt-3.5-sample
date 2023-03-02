require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const { writeFile } = require("fs");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const main = async () => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      messages: [
        {
          role: "user",
          content: process.env.TEXT,
        },
      ],
    });
    console.log(completion.data.choices[0].message);
  } catch (e) {
    const data = JSON.stringify(e, null, 2);
    writeFile("./error.log", data);
    console.log(data);
  }
};

main();
