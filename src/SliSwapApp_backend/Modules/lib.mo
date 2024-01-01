import T "../Types/TypesCommon";
import Principal "mo:base/Principal";
import List "mo:base/List";

module {

    public func SwapAppInit(creator:Principal): T.AppSettings{

        let returnValue:T.AppSettings =  {
           
            //Creator principal of the swap-app-canister-creator
            SwapAppCreator = creator;

            var SwapAppAdmins = List.nil<Principal>();

            //Canister Id of the ICRC1 token that should be transfered to user-account during token-conversion
            var TargetTokenCanisterId = "";
            // var TargetTokenSymbol= "";
            // var TargetTokenName = "";
            // var TargetTokenIcon:Blob = to_candid("");

            
            // Ratio for the returning amount.
            // For example:
            // if 'ConvertRatioOldSliDip20Token = 2.5' then the user will get 2.5 of the new icrc1 token, 
            // for each old sli-dip 20 token during the conversion process.
            var ConvertRatioOldSliDip20Token = 1.0;
            var ConvertRatioOldGldsDip20Token = 1.0;
            var ConvertRatioNft = 1.0;
        };

        return returnValue;

    };

    public func GetUserRole(appSettings:T.AppSettings, principal:Principal):T.UserRole{
  
        if (Principal.isAnonymous(principal)){
            return #Anonymous;
        };

        if (principal == appSettings.SwapAppCreator){
            return #Owner;
        };
        
        if (List.size<Principal>(appSettings.SwapAppAdmins) > 0 
            and List.some<Principal>(appSettings.SwapAppAdmins, func(n){ n == principal})) {                
            return #Admin;
        };

        return #NormalUser;    
    };


};