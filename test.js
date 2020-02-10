var linkhub = require('./');

linkhub.initialize({
  LinkID :'TESTER',
  SecretKey : 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
  defaultErrorHandler :  function(linkhubException) {
    console.log('Exception Occur : [' + linkhubException.code + '] ' + linkhubException.message);
  }
});

var token = linkhub.newToken('POPBILL_TEST','1234567890',['member','110'],null);

token(
  success = function(tk){
    console.log('token expiration : ' + tk.expiration);
  }
);

linkhub.getBalance(
  Token = token,
  success = function(point){
    console.log('RemainPoint is '+ point);
  },
  error = function(linkhubException) {
    console.log('예외 발생 : [' + linkhubException.code + '] ' + linkhubException.message);
  }
);

linkhub.getPartnerBalance(
  Token = token,
  success = function(point){
    console.log('RemainPartnerPoint is '+ point);
  }
);


linkhub.getPartnerURL(
  Token = token,
  "CHRG",
  success = function(url){
    console.log('GetPartnerURL Response is '+ url);
  }
);



linkhub.getTime(
  success = function(UTCTime){
    console.log('UTCServerTime is '+ UTCTime);
  }
);
