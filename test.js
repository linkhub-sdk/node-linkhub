var linkhub = require("./");

linkhub.initialize({
  LinkID: "TESTER",
  SecretKey: "SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=",
  // UseLocalTimeYN: true,
  //AuthURL : 'http://192.168.0.228:9080',
  defaultErrorHandler: function (linkhubException) {
    console.log(
      "Exception Occur : [" +
        linkhubException.code +
        "] " +
        linkhubException.message
    );
  },
});


let barocert_tokenbuilder = linkhub.TokenBuilder({
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

let token = linkhub.newToken(
  "POPBILL_TEST",
  "1234567890",
  ["member", "110"],
  //null,
  //true,
  //true
);

 token(
   success = function(tk){
     console.log('TK expiry :' + tk.expiration);
   }
 );

 let bc_token = barocert_tokenbuilder.newToken(
     "BAROCERT",
     null,
     ['partner', '401', '402', '403', '404'],
     null,
     true,
     true
 );

bc_token(
    success = function(tk){
        console.log('BC_TK expiry :' + tk.expiration);
    }
);

token = linkhub.newToken(
    "POPBILL_TEST",
    "1234567890",
    ["member", "110"],
    //null,
    //true,
    //true
);

token(
    success = function(tk){
        console.log('TK expiry :' + tk.expiration);

        let bc_token = barocert_tokenbuilder.newToken(
            "BAROCERT",
            null,
            ['partner', '401', '402', '403', '404'],
            null,
            true,
            true
        );

        bc_token(
            success = function(tk){
                console.log('BC_TK expiry :' + tk.expiration);
            }
        );
    }
);

 linkhub.getBalance(
   Token = token, false, false,
   success = function(point){
     console.log('RemainPoint is '+ point);
   },
   error = function(linkhubException) {
     console.log('예외 발생 : [' + linkhubException.code + '] ' + linkhubException.message);
   }
 );

 console.log("TargetURL : " + linkhub.getTargetURL(false, false));

 linkhub.getPartnerBalance(
   Token = token,false, false,
   success = function(point){
     console.log('RemainPartnerPoint is '+ point);
   }
 );


 linkhub.getPartnerURL(
   Token = token,false,false,
   "CHRG",
   success = function(url){
     console.log('GetPartnerURL Response is '+ url);
   },
   error = function(e){
       console.log('예외 발생');
   }
 );


console.log(linkhub.getTime(false, false));
console.log(exports)


