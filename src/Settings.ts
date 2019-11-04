import * as storage from 'electron-json-storage';
import { IKeys } from './IKeys';

export default class Settings {

    public DarkMode: boolean;
    public RecordStats: boolean;
    public StreamName: string
    public TwitchClientID: string
    public TwitchAccessToken: string
    public BotName: string
    public BotAPIKey: string
    public StarcraftName: string
    public StarCraftPath: string
    public StarCraftRegion: string
    private default: IKeys;

    constructor(){
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
        }
    }

    public InitializeSettings(){
        storage.setDataPath(__dirname);
        this.CreateDefault();
        storage.get("Configuration", (error, keys: IKeys) => {
            if (error) throw error;
            this.DarkMode = keys.DarkMode;
            this.RecordStats = keys.RecordStats;
            this.StreamName = keys.StreamName;
            this.TwitchClientID = keys.TwitchClientID;
            this.TwitchAccessToken = keys.TwitchAccessToken;
            this.BotName = keys.BotName;
            this.BotAPIKey = keys.BotAPIKey;
            this.StarcraftName = keys.StarcraftName
            this.StarCraftPath = keys.StarCraftPath;
            this.StarCraftRegion = keys.StarCraftRegion;
        });
    }

    private CreateDefault(){
        storage.set("Configuration", this.default, function(error){
            if(error) throw error;
        });
    }
    
}
