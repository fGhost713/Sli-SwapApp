import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Bool "mo:base/Bool";
import Result "mo:base/Result";
import List "mo:base/List";
import Text "mo:base/Text";
import T "../Types/TypesCommon";
import lib "../Modules/lib";
import Interfaces "../Types/TypesInterfaces";


shared ({ caller = creator }) actor class SliSwapApp():async Interfaces.SliSwapAppInterface = this{

  stable var appSettings:T.AppSettings = lib.SwapAppInit(creator);

  // private func IsCreatorOrAdmin(principal: Principal) : async Bool {
  //   if (principal == creator){
  //     return true;
  //   };

  //   if (List.size<Principal>(appSettings.SwapAppAdmins) > 0 
  //       and List.some<Principal>(appSettings.SwapAppAdmins, func(n){ n == principal})) {

  //     return true;
  //   };
 
  //   return false;
  // };


  //Returns the current user-role
  public shared query ({ caller }) func GetUserRole():async T.UserRole{        
    return lib.GetUserRole(appSettings, caller);    
  };

  //Returns the principal (==canisterId) of this dApp
  public shared query func GetSwapAppPrincipalText():async Text{
    
    let principal:Principal = Principal.fromActor(this);
    return Principal.toText(principal);
  };


  //Set the canisterId for the ICRC1 token that should be transfered to users during the conversion process
  public shared ({caller}) func SetTargetICRC1TokenCanisterId (canisterId:Text): async Result.Result<Text, Text>{
    
    let userRole = lib.GetUserRole(appSettings, caller);
    if (userRole == #Owner or userRole == #Admin){
      appSettings.TargetTokenCanisterId :=canisterId;
      return #ok("Canister-id was set to: " #debug_show(appSettings.TargetTokenCanisterId));
    };

    return #err("Only canister owner or admins can call this method");

  };


  //Here create new deposit-address and encrypt this adress and send back 
  //new identity seed -> (principal + random text)
  // public shared ({ caller }) func GetDepositAddress():async Principal{

  //   Debug.print("principal: " #debug_show(caller));
  //   return Principal.fromText("aaaaa-aa");
  // };

};



