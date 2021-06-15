import Command from '../../constants/command';
import { createCanvas } from 'canvas'
import { } from '../../util/functions'

const TriviaCommand: Command = {
    name: 'trivia',
    description: 'Play trivia in discord',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        async function generateClueCard(question: any) {
            const canvas = createCanvas(1280, 720);
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#030e78';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillStyle = 'white';
            ctx.font = '62px Korinna';
            const lines = await wrapText(ctx, question.toUpperCase(), 813);
            const topMost = (canvas.height / 2) - (((52 * lines.length) / 2) + ((20 * (lines.length - 1)) / 2));
            for (let i = 0; i < lines.length; i++) {
                const height = topMost + ((52 + 20) * i);
                ctx.fillStyle = 'black';
                ctx.fillText(lines[i], (canvas.width / 2) + 6, height + 6);
                ctx.fillStyle = 'white';
                ctx.fillText(lines[i], canvas.width / 2, height);
            }
            return canvas.toBuffer();
        }
    },
}

export default TriviaCommand;