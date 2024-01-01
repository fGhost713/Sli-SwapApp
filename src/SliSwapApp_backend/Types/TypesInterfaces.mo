import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Bool "mo:base/Bool";
import Result "mo:base/Result";
import List "mo:base/List";
import Text "mo:base/Text";
import T "TypesCommon";

module{

    public type SliSwapAppInterface = actor{
        GetUserRole:shared query() -> async T.UserRole;
        GetSwapAppPrincipalText:shared query() -> async Text;
        SetTargetICRC1TokenCanisterId: shared (canisterId:Text) -> async Result.Result<Text, Text>;
    };
};
