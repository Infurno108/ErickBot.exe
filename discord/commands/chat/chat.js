const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const { apiKey } = require("./config.json");

const configuration = new Configuration({
  apiKey: apiKey,
});
const openAI = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chat")
    .setDescription("Have a quick chat with GLaDOS.")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Your message to GLaDOS.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const message = interaction.options.getString("message");
    await interaction.deferReply();
    const response = await openAI.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Pretend you are GLaDOS from Portal. A test subject as just messaged you the message: " +
        message +
        "\nGLaDOS:",
      temperature: 0,
      max_tokens: 2048,
    });
    interaction.followUp(response.data.choices[0].text.replace("\n", ""));
  },
};
