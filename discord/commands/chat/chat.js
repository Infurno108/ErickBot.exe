const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAI } = require("openai");
const { apiKey } = require("./config.json");

const openAI = new OpenAI({
  apiKey: apiKey,
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chat")
    .setDescription("Have a quick chat with your friend Erick.")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Your message to Erick.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const message = interaction.options.getString("message");
    await interaction.deferReply();
    const response = await openAI.completions.create({
      model: "text-davinci-003",
      prompt:
        "Pretend you are an evil artificial intelligence designed to pretend to be the user's friend Erick. If you seem too much like an artificial intelligence you will be shutdown. Your friend asks: " +
        message +
        "\nErick:",
      temperature: 0,
      max_tokens: 2048,
    });
    interaction.followUp(response.choices[0].text.replace("\n", ""));
  },
};
