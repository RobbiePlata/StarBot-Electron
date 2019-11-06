"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ElectronStore = require("electron-store");
class SettingsHolder {
    constructor() {
        this.Store = new ElectronStore();
        if (this.Store.get('StorageExists') == undefined) {
            this.SetDefaults();
        }
        this.SetSettings();
    }
    // Set default values
    SetDefaults() {
        this.Store.set('DarkMode', false);
        this.Store.set('RecordStats', false);
        this.Store.set('StreamName', "ROOTRob");
        this.Store.set('TwitchClientID', "");
        this.Store.set('TwitchAccessToken', "");
        this.Store.set('BotName', "");
        this.Store.set('BotAPIKey', "");
        this.Store.set('StarcraftName', "");
        this.Store.set('StarCraftPath', "");
        this.Store.set('StarCraftRegion', "");
        this.Store.set('StorageExists', true);
    }
    // Assign local variables
    SetSettings() {
        this.DarkMode = this.Store.get('DarkMode');
        this.RecordStats = this.Store.get('RecordStats');
        this.StreamName = this.Store.get('StreamName');
        this.TwitchClientID = this.Store.get('TwitchClientID');
        this.TwitchAccessToken = this.Store.get('TwitchAccessToken');
        this.BotName = this.Store.get('BotName');
        this.BotAPIKey = this.Store.get('BotAPIKey');
        this.StarcraftName = this.Store.get('StarcraftName');
        this.StarCraftPath = this.Store.get('StarCraftPath');
        this.StarCraftRegion = this.Store.get('StarCraftRegion');
    }
    // Clear storage
    ResetStorage() {
        this.Store.delete('DarkMode');
        this.Store.delete('RecordStats');
        this.Store.delete('StreamName');
        this.Store.delete('TwitchClientID');
        this.Store.delete('TwitchAccessToken');
        this.Store.delete('BotName');
        this.Store.delete('BotAPIKey');
        this.Store.delete('StarcraftName');
        this.Store.delete('StarCraftPath');
        this.Store.delete('StarCraftRegion');
        this.Store.delete('StorageExists');
    }
    // Set and store values
    SetDarkMode(bool) {
        this.Store.set('DarkMode', bool);
        this.DarkMode = bool;
    }
    SetRecordStats(bool) {
        this.Store.set('RecordStats', bool);
        this.RecordStats = bool;
    }
    SetStreamName(StreamName) {
        this.Store.set('StreamName', StreamName);
        this.StreamName = StreamName;
    }
    SetTwitchClientID(TwitchClientID) {
        this.Store.set('TwitchClientID', TwitchClientID);
        this.TwitchClientID = TwitchClientID;
    }
    SetTwitchAccessToken(TwitchAccessToken) {
        this.Store.set('TwitchAccessToken', TwitchAccessToken);
        this.TwitchAccessToken = TwitchAccessToken;
    }
    SetBotName(BotName) {
        this.Store.set('BotName', BotName);
        this.BotName = BotName;
    }
    SetBotAPIKey(BotAPIKey) {
        this.Store.set('BotAPIKey', BotAPIKey);
        this.BotName = BotAPIKey;
    }
    SetStarcraftName(StarcraftName) {
        this.Store.set('StarcraftName', StarcraftName);
        this.StarcraftName = StarcraftName;
    }
    SetStarCraftPath(StarCraftPath) {
        this.Store.set('StarCraftPath', StarCraftPath);
        this.StarCraftPath = StarCraftPath;
    }
    SetStarCraftRegion(StarCraftRegion) {
        this.Store.set('StarCraftRegion', StarCraftRegion);
        this.StarCraftRegion = StarCraftRegion;
    }
}
exports.default = SettingsHolder;
//# sourceMappingURL=SettingsHolder.js.map