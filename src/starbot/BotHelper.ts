import Initializer from './Initializer';
import ClientHolder from './ClientHolder';
import http from 'http'; 
import Config from './Config.json';
export default class BotHelper{
    
    private _Config;
    private _ClientHolder;
    public _Initializer;
    private _sc2server;
    public _channelname;

    constructor(){
        this._Initializer = new Initializer();
        this._ClientHolder = new ClientHolder();
        this._Config = Config;
        this._sc2server = this._Config.App.Game.region;
        this.InitializeClient();
        this._channelname = this._Initializer.channelname;
    }

    async InitializeClient(){
        await this._ClientHolder.init(this._Initializer.clientid, this._Initializer.accessToken);
    }

    async IsStreamLive(username: string) {
        try{
            const client = await this._ClientHolder.GetClient()
            const user = await client.helix.users.getUserByName(username);
            if (!user) {
                return false;
            }
            return user.getStream();
        } catch(err){ console.log(err) }
    }

    async GetUptime(channelname, callback){
        if (await this.IsStreamLive(channelname)){
            var client = this._ClientHolder.GetClient();
            const user = await client.helix.users.getUserByName(channelname);
            const stream = user.getStream();
            var start = stream.startDate; // Start date
            var currentTime = new Date(); // Current time
            var msdifference = (currentTime.getTime() - start); // Difference
            var output = await this.ConvertUptime(msdifference);
            if(output.day === 0 && output.hour === 0 && output.minutes === 0){
                callback(channelname + " has been live for " + output.seconds + " seconds");
            }
            else if(output.day === 0 && output.hour === 0){
                callback(channelname + " has been live for " + output.minutes + " minutes " + output.seconds + " seconds");
            }
            else if(output.day === 0){
                callback(channelname + " has been live for " + output.hour + " hours " + output.minutes + " minutes " + output.seconds + " seconds");
            }
            else if(output.day === 1){
                callback(channelname + " has been live for " + output.day + " day " + output.hour + " hours " + output.minutes + " minutes " + output.seconds + " seconds");
            }
            else{
                callback(channelname + " has been live for " + output.day + " days" + output.hour + " hours " + output.minutes + " minutes " + output.seconds + " seconds");
            }
        }
        else{
            callback("Stream is not live");
        }
    }

    ConvertUptime(milliseconds: number){
        var day: number; 
        var hour: number;
        var minutes: number;
        var seconds: number;
        seconds = Math.floor(milliseconds / 1000);
        minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        hour = Math.floor(minutes / 60);
        minutes = minutes % 60;
        day = Math.floor(hour / 24);
        hour = hour % 24;
        return {
            day: day,
            hour: hour,
            minutes: minutes,
            seconds: seconds
        };
    }

    async SearchSC2Unmasked(player1: any, player2: any, callback){
        var player1search = "http://sc2unmasked.com/API/Player?name=" + player1.name + "&server=" + this._sc2server + "&race=" + this.GetMatchup(player1.race);
        var player2search = "http://sc2unmasked.com/API/Player?name=" + player2.name + "&server=" + this._sc2server + "&race=" + this.GetMatchup(player2.race);
        
        this.requestSC2Unmasked(player1search, player1, (mmr1) => {
            this.requestSC2Unmasked(player2search, player2, (mmr2) => {
                callback(mmr1, mmr2);
            });
        });
    }

    async requestSC2Unmasked(playersearch, player, callback){
        http.get(playersearch, (resp) => {
            var playerdatastr = "";
            resp.on('data', (chunk) => {
                playerdatastr += chunk;
            });
            
            resp.on('end', () => {
                if(playerdatastr != ""){
                    var playerdata = JSON.parse(playerdatastr);
                    this.getMMR(playerdata, player, (mmr) => {
                        callback(mmr);
                    });
                }
                else{
                    callback("?","?");
                }
            });
    
            }).on("error", (err) => {
                //console.log(err);
                var mmr = "?";
                callback(mmr);
            });
    }

    async getMMR(playerdata, player, callback){
        var mmr = 0;
        for (let i = 0; i < playerdata.players.length; i++){
            if(playerdata.players[i].acc_name == player.name && playerdata.players[i].server == this._sc2server && playerdata.players[i].mmr > mmr){
                mmr = playerdata.players[i].mmr;
            }
        }
        callback(mmr);
    }

    async GetOpponent(callback) {
        var gameurl = "http://localhost:6119/game"; //StarCraft 2 Port
        var data;
        http.get(gameurl, (resp) => {
            resp.on('data', (chunk) => {
                data = JSON.parse(chunk);
            });
            resp.on('end', () => {
                //console.log(data);
                this.SearchSC2Unmasked(data.players[0], data.players[1], (mmr1, mmr2) => {
                    if(data.isReplay == false){
                        //console.log(mmr1, mmr2);
                        var players = data.players;
                        var player1 = players[0];
                        var player1race = this.GetMatchup(player1.race);
                        var player2 = players[1];
                        var player2race = this.GetMatchup(player2.race);
                        callback(player1.name + " (" + player1race + "), " + mmr1 + " MMR" + " VS " + player2.name + " (" + player2race  + "), " + mmr2 + " MMR");
                    }
                    else{
                        callback(this._channelname + " is in not in a game, or is in a replay");
                    }
                });
            });
            
        }).on("error", (err) => {
            console.log("Starcraft needs to be open");
            return "StarCraft II must be open";
        });
    }

    GetMatchup(race: string) {
        if(race == "Prot"){
            race = 'P';
        }
        if(race == "Zerg"){
            race = 'Z';
        }
        if(race == "Terr"){
            race = 'T';
        }
        return race;
    }

    async PrintCommands(){
        try{
            var commands = this._Config.Commands;
            console.log("\nCurrent Commands:");
            console.log("!shoutout twitchname");
            console.log("!add !command message");
            console.log("!remove !command");
            console.log("!addmessage message")
            console.log("!addsub message");
            console.log("!addban message");
            console.log("!uptime");
            console.log("!addhostmessage");
            console.log("!addwelcome");
            console.log("");
            Object.keys(commands).forEach(function(key) {
                console.log(key + ': ' + commands[key])
            })
        } catch { }
    };
}