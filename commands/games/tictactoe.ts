import { createCanvas, loadImage } from 'canvas'
import { MessageAttachment, MessageEmbed } from 'discord.js';
import Command from '../../constants/command';

var xs: any = []
var os: any = []
var playerA: any = null
var playerB: any = null
var table = Array(9).fill(null)
var session = false
var tick = 0
var fs = require('fs')

const TicTacToeCommand: Command = {
    name: 'tictactoe',
    description: 'Play tictactoe is discord',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {

        var canvas = createCanvas(1080, 1080)
        var ctx = canvas.getContext('2d')
        var bkg = await loadImage("./photos/ttt/plansza.png");
        ctx.drawImage(bkg, 0, 0, canvas.width, canvas.height);
        //variables(dialogaty)
        var myString
        var o = await loadImage("./photos/ttt/o.png");
        var x = await loadImage("./photos/ttt/x.png");
        var line = await loadImage("./photos/ttt/linia.png")
        var lineHorizontal = await loadImage("./photos/ttt/liniaHorizontal.png")
        var pozycje = {
            a1: [0, 0],
            a2: [360, 0],
            a3: [720, 0],
            b1: [0, 360],
            b2: [360, 360],
            b3: [720, 360],
            c1: [0, 720],
            c2: [360, 720],
            c3: [720, 720]
        }
        var a1 = [0, 0]
        var a2 = [360, 0]
        var a3 = [720, 0]
        var b1 = [0, 360]
        var b2 = [360, 360]
        var b3 = [720, 360]
        var c1 = [0, 720]
        var c2 = [360, 720]
        var c3 = [720, 720]
        //Fuctions
        var even = function (int: any) {
            var res = int % 2
            if (res == 0) return true;
            else return false;
        }
        //
        var check = function (value: any) {
            var tbo = os.indexOf(value)
            var tbx = xs.indexOf(value)
            if (tbo == -1 && tbx == -1) return false
            else return true
        }
        //
        var read = function () {
            var winner = null
            var position = null
            var mode = null
            // POZIOM
            if (table[0] == table[1] && table[1] == table[2] && table[2] != null) {
                if (table[0] == "x") winner = "x"
                if (table[0] == "o") winner = "o"
                position = 'horizontal'
                mode = 1
            }
            if (table[3] == table[4] && table[4] == table[5] && table[5] != null) {
                if (table[5] == "x") winner = "x"
                if (table[5] == "o") winner = "o"
                position = 'horizontal'
                mode = 2
            }
            if (table[6] == table[7] && table[7] == table[8] && table[8] != null) {
                if (table[8] == "x") winner = "x"
                if (table[8] == "o") winner = "o"
                position = 'horizontal'
                mode = 3
            }
            //PION
            if (table[0] == table[3] && table[3] == table[6] && table[6] != null) {
                if (table[6] == "x") winner = "x"
                if (table[6] == "o") winner = "o"
                position = 'vertical'
                mode = 1
            }
            if (table[1] == table[4] && table[4] == table[7] && table[7] != null) {
                if (table[7] == "x") winner = "x"
                if (table[7] == "o") winner = "o"
                position = 'vertical'
                mode = 2
            }
            if (table[2] == table[5] && table[5] == table[8] && table[8] != null) {
                if (table[8] == "x") winner = "x"
                if (table[8] == "o") winner = "o"
                position = 'vertical'
                mode = 3
            }
            //SKOS
            if (table[0] == table[4] && table[4] == table[8] && table[8] != null) {
                if (table[8] == "x") winner = "x"
                if (table[8] == "o") winner = "o"
                position = 'right'
            }
            if (table[2] == table[4] && table[4] == table[6] && table[6] != null) {
                if (table[6] == "x") winner = "x"
                if (table[6] == "o") winner = "o"
                position = 'left'
            }
            return [winner, position, mode]
        }
        //
        var write = function (pos: any) {
            pos = pos.toLowerCase()
            if (check(pos) == false) {
                if (even(tick) == false) {
                    xs[xs.length] = pos
                    myString = pos
                    myString = pos.replace("a", "").replace("b", "").replace("c", "")
                    var controlInt = 0
                    if (pos.startsWith("a")) controlInt = -1 //a1 = 0 a2 = 1 a3 = 2
                    if (pos.startsWith("b")) controlInt = +2 //b1 = 3 b2 = 4 b3 = 5
                    if (pos.startsWith("c")) controlInt = +5 //c1 = 6 c2 = 7 c3 = 8
                    // table[Number(myString) + controlInt] = x
                    // console.log(myString)
                    var finalInt = Number(myString) + controlInt
                    table[finalInt] = "x"
                }
                if (even(tick) == true) {
                    os[os.length] = pos
                    myString = pos
                    myString = pos.replace("a", "").replace("b", "").replace("c", "")
                    var controlInt = 0
                    if (pos.startsWith("a")) controlInt = -1 //a1 = 0 a2 = 1 a3 = 2
                    if (pos.startsWith("b")) controlInt = +2 //b1 = 3 b2 = 4 b3 = 5
                    if (pos.startsWith("c")) controlInt = +5 //c1 = 6 c2 = 7 c3 = 8
                    var finalInt = Number(myString) + controlInt
                    table[finalInt] = "o"
                }
            } else if (check(pos) == true) {
                tick -= 1
                message.reply("To pole jest zajęte")
            }
            for (var i = 0; i <= xs.length - 1; i++) {
                // @ts-ignore
                pos = pozycje[xs[i]]
                ctx.drawImage(x, pos[0], pos[1], 344, 346);
                for (var b = 0; b <= os.length - 1; b++) {
                    // @ts-ignore
                    pos = pozycje[os[b]]
                    ctx.drawImage(o, pos[0], pos[1], 344, 346);
                }
            }
            var result = read()
            var mode: any = result[2]
            if (result[1] == "vertical") {
                var coordinates = [145, 505, 865]
                ctx.drawImage(line, coordinates[mode - 1], 0, 50, 1080)
            }
            if (result[1] == "horizontal") {
                var coordinates = [145, 505, 865]
                ctx.drawImage(lineHorizontal, 0, coordinates[mode - 1], 1080, 50)
            }
            // if(result[1] == "left"){
            //   ctx.beginPath();
            //   ctx.moveTo(0,0)
            //   ctx.lineWidth = 50;
            //   ctx.strokeStyle = '#ff00aa';
            //   ctx.stroke()
            //   ctx.lineTo(1080,1080)
            // }
            // if(result[1] == "right"){
            //   ctx.beginPath();
            //   ctx.moveTo(0,0)
            //   ctx.lineWidth = 50;
            //   ctx.strokeStyle = '#ff00aa';
            //   ctx.stroke()
            //   ctx.lineTo(1080,1080)
            // }
            if (result[0] == "o") {
                let embed = new MessageEmbed()
                    .setColor("BLUE")
                    .setAuthor("Game Over", playerA.displayAvatarURL)
                    .setDescription("Winner " + playerA.tag)
                session = false
                return message.channel.send(embed)
            } else if (result[0] == "x") {
                let embed = new MessageEmbed()
                    .setColor("BLUE")
                    .setAuthor("Game Over", playerB.user.displayAvatarURL)
                    .setDescription("Winner: " + playerB.user.tag)
                session = false
                message.channel.send(embed)
            }
            tick += 1
        }

        xs = []
        os = []
        table = [null, null, null, null, null, null, null, null, null]
        session = true
        playerA = message.author
        playerB = message.mentions.members?.first()
        tick = 1
        var attachment = new MessageAttachment(canvas.toBuffer(), 'plansza.png');
        message.channel.send(attachment)

        if (session == true) {
            if (message.author.id == playerB.id) {
                if (even(tick) == false) {
                    write(message.content)
                    var attachment = new MessageAttachment(canvas.toBuffer(), 'plansza.png');
                    message.channel.send(attachment)
                }
            } else if (message.author.id == playerA.id) {
                if (even(tick) == true) {
                    write(message.content)
                    var attachment = new MessageAttachment(canvas.toBuffer(), 'plansza.png');
                    message.channel.send(attachment)
                }
            }
        }
    },
}

export default TicTacToeCommand;