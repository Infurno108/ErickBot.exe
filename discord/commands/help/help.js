const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const { apiKey } = require("./config.json");

const configuration = new Configuration({
  apiKey: apiKey,
});
const openAI = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Ask for a hint based on what test chamber you are on.")
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
        "Pretend you are GLaDOS from Portal. In test chamber one there is a primary button one player is supposed to press while allowing the other to cross over deadly water. The player on the button then has to step off to let the other user use the Aperture Science Aerial Faith Plate to secure a light bridge portal to the other side of the chamber. Then the player with the light bridge has to go and help the first player also get to the light bridge. Finally one player has to use the button at the exit to place the companion cube on the light bridge. Then all it takes is bringing the companion cube to the exit and finishing the chamber. The two test subjects need help solving this chamber, you must give them a hint while also trying to be as rude as possible. The message they sent you is:" +
        message +
        "\nGLaDOS:",
      temperature: 0,
      max_tokens: 2048,
    });
    interaction.followUp(response.data.choices[0].text.replace("\n", ""));
  },
};
