var ws = require('ws');
var UserSerivce = require('../Service/UserSerivce');
var config = require('../WebSocketconfig');
var server = new ws.Server({
    host: config.host,
    port: config.rank_port
});

server.on('connection', function (conn) {
    conn.on('message', function (message) {
        msgSplit(message, function(type, msg){
            //将消息交给消息处理器
            msghandle(type, msg);
        });
    });

    function msgSplit(message, resultfun){
        var messages =  message.split(':');
        if(messages.length == 1) {
            var type = messages[0];
            var msg = "";
        } else {
            var type = messages[0];
            var msg = messages[1];
        }
        resultfun(type, msg);
    }
    function msghandle(type, msg){
        switch (type) {
            case "showrank":showrank();break;
            case "game_record":showgame_record(msg);break;
        }
    }
    function showrank() {
        UserSerivce.ShowRank(function (result) {
            var str = JSON.stringify(result[0]);
            for (let i = 1; i < result.length; i++) {
                str = str +"#"+JSON.stringify(result[i]);
            }
            conn.send(str);
        });
    }

    function showgame_record(email) {

    }
});