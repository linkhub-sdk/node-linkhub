var linkhub = require('./');

linkhub.initialize({
  LinkID :'TESTER',
  SecretKey : 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
  defaultErrorHandler :  function(linkhubException) {
    console.log('Exception Occur : [' + linkhubException.code + '] ' + linkhubException.message);
  }
});

var token = linkhub.newToken('POPBILL_TEST','1231212312',['member','110'],null);

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