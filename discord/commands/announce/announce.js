const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const { apiKey } = require("./config.json");

const configuration = new Configuration({
  apiKey: apiKey,
});
const openAI = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announce")
    .setDescription("Announce a new test chamber.")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("How you would like to announce a new chamber.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const message = interaction.options.getString("prompt");
    await interaction.deferReply();
    const response = await openAI.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Pretend you are GLaDOS from Portal. You have just built a brand new test chamber for your two test subjects, Brag and Garret. " +
        message +
        "\nGLaDOS:",
      temperature: 0,
      max_tokens: 2048,
    });
    interaction.followUp(response.data.choices[0].text.replace("\n", ""));
  },
};
