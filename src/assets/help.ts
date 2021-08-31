import { AdminCommands, EventsCommands, FunCommands, GamesCommands, MusicCommands, OwnerCommands, NotifyCommands, SearchCommands, NSFWCommnads, MISCCommands } from '../base/Client'
import { GeneralCommands } from '../base/Client'

export const helpAsserts = [
    {
        "name": "General",
        "number": 11,
        "emoji": ":smiley:"
    },
    {
        "name": "Games",
        "number": GamesCommands.length,
        "emoji": ":video_game:"
    },
    {
        "name": "Moderation",
        "number": AdminCommands.length,
        "emoji": "<:ban_hammer:831919397437702174>"
    },
    {
        "name": "Music",
        "number": MusicCommands.length,
        "emoji": ":musical_note:"
    },
    {
        "name": "Events",
        "number": EventsCommands.length,
        "emoji": ":checkered_flag:"
    },
    {
        "name": "Notify",
        "number": "2",
        "emoji": ":speech_left:"
    },
    {
        "name": "NSFW",
        "number": NSFWCommnads.length,
        "emoji": ":underage:"
    },
    {
        "name": "MISC",
        "number": MISCCommands.length,
        "emoji": ":wrench:"
    },
    {
        "name": "Fun",
        "number": FunCommands.length,
        "emoji": ":rofl:"
    },
    {
        "name": "Search",
        "number": SearchCommands.length,
        "emoji": ":mag:"
    },
]