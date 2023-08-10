var TokenBuilder = require("./lib/TokenBuilder");



exports.TokenBuilder = function (options) {
  return new TokenBuilder(options);
}

/* 아래 기능들은 하위호환성을 위해 존재 */
exports.initialize = function (options) {
  this._tokenBuilder = new TokenBuilder(options);
};

exports.newToken = function (
  ServiceID,
  AccessID,
  Scopes,
  ForwardIP,
  UseStaticIP,
  UseGAIP
) {
  return this._tokenBuilder.newToken(  ServiceID,
      AccessID,
      Scopes,
      ForwardIP,
      UseStaticIP,
      UseGAIP);
};

exports.getBalance = function (Token, UseStaticIP, UseGAIP, success, error) {
  return this._tokenBuilder.getBalance(Token, UseStaticIP, UseGAIP, success, error);
};

exports.getPartnerBalance = function (
  Token,
  UseStaticIP,
  UseGAIP,
  success,
  error
) {
  return this._tokenBuilder.getPartnerBalance(Token, UseStaticIP, UseGAIP, success, error);
};

// 파트너 포인트 충전 URL 추가 - 2017/08/29
exports.getPartnerURL = function (
  Token,
  UseStaticIP,
  UseGAIP,
  TOGO,
  success,
  error
) {
  return this._tokenBuilder.getPartnerURL( Token,
      UseStaticIP,
      UseGAIP,
      TOGO,
      success,
      error);
};

exports.stringify = function (obj) {
  return JSON.stringify(obj, function (key, value) {
    return !value ? undefined : value;
  });
};

exports.getTime = function (UseStaticIP, UseGAIP) {
  return this._tokenBuilder.getTime(UseStaticIP,UseGAIP);
};

exports.getTargetURL = function (UseStaticIP, UseGAIP) {
  return this._tokenBuilder.getTargetURL(UseStaticIP,UseGAIP);
};
