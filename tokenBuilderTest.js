let linkhub = require("./");

let tokenBuilder = linkhub.TokenBuilder({
    LinkID: "LINKHUB_BC",
    SecretKey: "npCAl0sHPpJqlvMbrcBmNagrxkQ74w9Sl0A+M++kMCE=",
    defaultErrorHandler: function (linkhubException) {
        console.log(
            "BC_Exception Occur : [" +
            linkhubException.code +
            "] " +
            linkhubException.message
        );
    },
});

let token = tokenBuilder.newToken(
     "BAROCERT",
     null,
     ['partner', '401', '402', '403', '404'],
     null,
     true,
     true
 );

token(
    success = function(tk){
        console.log('BC_TK expiry :' + tk.expiration);
    }
);

 console.log("TargetURL : " + tokenBuilder.getTargetURL(false, false));

tokenBuilder.getPartnerBalance(
   Token = token,false, false,
   success = function(point){
     console.log('RemainPartnerPoint is '+ point);
   }
 );


tokenBuilder.getPartnerURL(
   Token = token,false,false,
   "CHRG",
   success = function(url){
     console.log('GetPartnerURL Response is '+ url);
   },
   error = function(e){
       console.log('예외 발생');
   }
 );


console.log(tokenBuilder.getTime(false, false));