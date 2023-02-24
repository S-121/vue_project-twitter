
//
/**
 *  @parms auth token
 *
 */
let zac_auth = "zac.2lmemfoyu88ghjvdibm7zavo10jx5g5vov1xpvr6jnd1rpg9jskdarlp589l7t48"
let ll7_auth = "007.a49wu5swdy8tzaumwwwekvdyfpw2yzc6fduskmpkhdwg53v5shwbtkqyy2q20r8y"
let elon_auth = "elon.mh4zdt4rc5ckvqatftl0wcuk5jl9jd21fwz5pgjm187mkeevzk6y406cavzza8nt"
let eden_auth = "eden.vqgb61bub8m629k691c33df48d2tp3r8cqfxk4lwdlpno1wkodegjf0c8dvulazi"
// // get auth token
export default{
  getT(s){
    let auth;
    switch (s) {
      case 'zac' :
        auth = zac_auth;
        break;
      case 'elon' :
        auth = elon_auth;
        break;
      case '007' :
        auth = ll7_auth;
        break;
      case 'eden' :
        auth = eden_auth;
        break;
      default :
        auth = 'auth error!'
    }
    return auth;
  }
}
