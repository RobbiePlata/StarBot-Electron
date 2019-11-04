"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage = require("electron-json-storage");
class Settings {
    constructor() {
        this.DarkMode = null;
        this.RecordStats = null;
        this.StreamName = null;
        this.TwitchClientID = null;
        this.TwitchAccessToken = null;
        this.BotName = null;
        this.BotAPIKey = null;
        this.StarcraftName = null;
        this.StarCraftPath = null;
        this.StarCraftRegion = null;
        this.default = {
            DarkMode: true,
            RecordStats: true,
            StreamName: "rootrob",
            TwitchClientID: "",
            TwitchAccessToken: "",
            BotName: "",
            BotAPIKey: "",
            StarcraftName: "",
            StarCraftPath: "",
            StarCraftRegion: ""
        };
    }
    InitializeSettings() {
        storage.setDataPath(__dirname);
        this.CreateDefault();
        storage.get("Configuration", (error, keys) => {
            if (error)
                throw error;
            this.DarkMode = keys.DarkMode;
            this.RecordStats = keys.RecordStats;
            this.StreamName = keys.StreamName;
            this.TwitchClientID = keys.TwitchClientID;
            this.TwitchAccessToken = keys.TwitchAccessToken;
            this.BotName = keys.BotName;
            this.BotAPIKey = keys.BotAPIKey;
            this.StarcraftName = keys.StarcraftName;
            this.StarCraftPath = keys.StarCraftPath;
            this.StarCraftRegion = keys.StarCraftRegion;
        });
    }
    CreateDefault() {
        storage.set("Configuration", this.default, function (error) {
            if (error)
                throw error;
        });
    }
}
exports.default = Settings;
//# sourceMappingURL=Settings.js.map