import Bot from './Bot';

export default class StarBot {

    private bot: any;
    private kill: any;

    constructor(){
        this.bot = new Bot();
        this.kill  = require('tree-kill');
    }
    
    StartBot(){
        this.bot.Connect();
        this.bot.Run();
    }
    
    StopBot(){
        this.kill(bot);
    }
    
    StartRecordStats(){
        this.bot.RecordStats();
    }
    
    StopRecordStats(){
        this.bot.StopStats();
    }
}
