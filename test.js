var linkhub = require('./');

linkhub.initialize({
  LinkID :'TESTER',
  SecretKey : 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
  UseLocalTimeYN : false,
  //AuthURL : 'http://192.168.0.228:9080',
  defaultErrorHandler :  function(linkhubException) {
    console.log('Exception Occur : [' + linkhubException.code + '] ' + linkhubException.message);
  }
});

var token = linkhub.newToken('POPBILL_TEST','1234567890',['member','110'],null,true);

token(
  success = function(tk){
    console.log('' + tk.expiration);
  }
);

linkhub.getBalance(
  Token = token, true,
  success = function(point){
    console.log('RemainPoint is '+ point);
  },
  error = function(linkhubException) {
    console.log('예외 발생 : [' + linkhubException.code + '] ' + linkhubException.message);
  }
);

linkhub.getPartnerBalance(
  Token = token,true,
  success = function(point){
    console.log('RemainPartnerPoint is '+ point);
  }
);


linkhub.getPartnerURL(
  Token = token,true,
  "CHRG",
  success = function(url){
    console.log('GetPartnerURL Response is '+ url);
  }
);


linkhub.getTime(true,
  success = function(UTCTime){
    console.log('UTCServerTime is '+ UTCTime);
  }
);
