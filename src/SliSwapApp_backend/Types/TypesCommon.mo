import List "mo:base/List";
import Result "mo:base/Result";
import Blob "mo:base/Blob";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Principal "mo:base/Principal";

module{

    public type UserRole = {    
        #Anonymous;
        #NormalUser;
        #Owner;
        #Admin;
    };

    // Settings that will be stored as stable var
    public type AppSettings = {

        //Creator principal of the swap-app-canister-creator
        SwapAppCreator:Principal;

        var SwapAppAdmins:List.List<Principal>;

        //Canister Id of the ICRC1 token that should be transfered to user-account during token-conversion
        var TargetTokenCanisterId:Text;
        // var TargetTokenSymbol:Text;
        // var TargetTokenName:Text;
        // var TargetTokenIcon:Blob;

        
        // Ratio for the returning amount.
        // For example:
        // if 'ConvertRatioOldSliDip20Token = 2.5' then the user will get 2.5 of the new icrc1 token, 
        // for each old sli-dip 20 token during the conversion process.
        var ConvertRatioOldSliDip20Token:Float;
        var ConvertRatioOldGldsDip20Token:Float;
        var ConvertRatioNft:Float;
    };


    // Settings that the client will use
    public type AppSettingsResponse = {
        UserRole: UserRole;


    };

};