var crypto = require('crypto');
var http = require('https');
var LINKHUB_API_VERSION = "1.0";

exports.initialize = function(options) {
  this._options = options;
}

exports.newToken = function(ServiceID,AccessID,Scopes,ForwardIP) {
  var _this = this;
  var _token = undefined;
  return function(callback,error) {
    if(_token) {
      callback(_token);
      return _token;
    }

    var xDate = new Date().toISOString();
    var uri = '/' + ServiceID + '/Token';
    var TokenRequest = _this.stringify({access_id : AccessID, scope : Scopes});

    var md5 = crypto.createHash('md5');
    md5.update(TokenRequest);
    var bodyDigest = md5.digest('base64');

    var digestTarget =
      'POST\n' +
      bodyDigest + '\n' +
      xDate +'\n' +
      (ForwardIP ? ForwardIP + '\n' : '') +
      LINKHUB_API_VERSION + '\n' +
      uri;

    var hmac = crypto.createHmac('sha1',new Buffer(_this._options.SecretKey,'base64'));
    hmac.update(digestTarget);
    var digest = hmac.digest('base64');

    var headers = {
      'x-lh-date' : xDate,
      'x-lh-version' : LINKHUB_API_VERSION,
      'Authorization' : 'LINKHUB ' + _this._options.LinkID + ' ' + digest,
      'Content-Type' : 'Application/json'
    }

    if(ForwardIP) headers['x-lh-forwarded'] = ForwardIP;

    var options = {
      host : 'auth.linkhub.co.kr',
      path : uri,
      method : 'POST',
      headers : headers
    };

    var req = _this.httpRequest(TokenRequest,options);

    req(function(tk) {_token = tk;callback(tk);},error ? error : _this._options.defaultErrorHandler);

    return true;
  };
}

exports.getTime = function(success,error){

  var options = {
    host : 'auth.linkhub.co.kr',
    path : '/Time',
    method : 'GET'
  }

  http.request(options,function(response) {
    var res = '';
    response.on('data',function(chunk) {
      res += chunk;
    });
    response.on('end',function(){
      if(this.statusCode == '200') success(res);
      else if(error) error(res);
    });
  }).end(null);
}

exports.getBalance = function(Token,success,error) {

    var _this = this;

    Token(function(token) {
       var options = {
          host : 'auth.linkhub.co.kr',
          path : '/' + token.serviceID + '/Point',
          method : 'GET',
          headers : {Authorization : 'Bearer ' + token.session_token}
        }

        var req = _this.httpRequest(null,options);

        req(function(response){
          if(success) success(response.remainPoint);
        },(typeof error === 'function') ? error : _this._options.defaultErrorHandler);

    },(typeof error === 'function') ? error : _this._options.defaultErrorHandler);


  return true;
}

exports.getPartnerBalance = function(Token,success,error) {

    var _this = this;

    Token(function(token) {
       var options = {
          host : 'auth.linkhub.co.kr',
          path : '/' + token.serviceID + '/PartnerPoint',
          method : 'GET',
          headers : {Authorization : 'Bearer ' + token.session_token}
        }

        var req = _this.httpRequest(null,options);

        req(function(response){
          if(success) success(response.remainPoint);
        },error ? error : _this._options.defaultErrorHandler);

    },(typeof error === 'function') ? error : _this._options.defaultErrorHandler);


  return true;
}

// 파트너 포인트 충전 URL 추가 - 2017/08/29
exports.getPartnerURL = function(Token,TOGO,success,error) {

    var _this = this;

    Token(function(token) {
       var options = {
          host : 'auth.linkhub.co.kr',
          path : '/' + token.serviceID + '/URL?TG='+TOGO,
          method : 'GET',
          headers : {Authorization : 'Bearer ' + token.session_token}
        }

        var req = _this.httpRequest(null,options);

        req(function(response){
          if(success) success(response.url);
        },(typeof error === 'function') ? error : _this._options.defaultErrorHandler);

    },(typeof error === 'function') ? error : _this._options.defaultErrorHandler);


  return true;
}

exports.stringify = function(obj) {
  return JSON.stringify(obj,function(key,value){return !value ? undefined : value;});
}


exports.httpRequest = function(data,options) {
  return function(success,error) {
    http.request(options,function(response) {
      var res = '';
      response.on('data',function(chunk) {
        res += chunk;
      });
      response.on('end',function(){
        if(this.statusCode == '200') success(JSON.parse(res));
        else if(error) error(JSON.parse(res));
      });
    }).end(data);
  }
}
