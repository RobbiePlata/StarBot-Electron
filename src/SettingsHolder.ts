import ElectronStore = require("electron-store");
export default class SettingsHolder {

    private Store: ElectronStore;
    public DarkMode: boolean;
    public RecordStats: boolean;
    public StreamName: string;
    public TwitchClientID: string;
    public TwitchAccessToken: string;
    public BotName: string;
    public BotAPIKey: string;
    public StarcraftName: string;
    public StarCraftPath: string;
    public StarCraftRegion: string;

    constructor(){
        this.Store = new ElectronStore();
        if(this.Store.get('StorageExists') == undefined){ this.SetDefaults(); }
        this.SetSettings();
    }

    // Set default values
    private SetDefaults(){
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
    private SetSettings(){
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
    private ResetStorage(){
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
    public SetDarkMode(bool: boolean){
        this.Store.set('DarkMode', bool);
        this.DarkMode = bool;
    }

    public SetRecordStats(bool: boolean){
        this.Store.set('RecordStats', bool);
        this.RecordStats = bool;
    }

    public SetStreamName(StreamName: string){
        this.Store.set('StreamName', StreamName);
        this.StreamName = StreamName;
    }
    
    public SetTwitchClientID(TwitchClientID: string){
        this.Store.set('TwitchClientID', TwitchClientID);
        this.TwitchClientID = TwitchClientID;
    }

    public SetTwitchAccessToken(TwitchAccessToken: string){
        this.Store.set('TwitchAccessToken', TwitchAccessToken);
        this.TwitchAccessToken = TwitchAccessToken;
    }

    public SetBotName(BotName: string){
        this.Store.set('BotName', BotName);
        this.BotName = BotName;
    }
    
    public SetBotAPIKey(BotAPIKey: string){
        this.Store.set('BotAPIKey', BotAPIKey);
        this.BotName = BotAPIKey;
    }

    public SetStarcraftName(StarcraftName: string){
        this.Store.set('StarcraftName', StarcraftName);
        this.StarcraftName = StarcraftName;
    }

    public SetStarCraftPath(StarCraftPath: string){
        this.Store.set('StarCraftPath', StarCraftPath);
        this.StarCraftPath = StarCraftPath;
    }

    public SetStarCraftRegion(StarCraftRegion: string){
        this.Store.set('StarCraftRegion', StarCraftRegion);
        this.StarCraftRegion = StarCraftRegion;
    }
    
}
