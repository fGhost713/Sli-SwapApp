import { Dip20Interface, TokenTypes } from "../Types/CommonTypes";
import { TokenTypeToCanisterId } from "../Utils/CommonUtils";

export class OldTokenActors{
 
    static async Get_Sli_Dip20_Actor(provider){
        let canisterId =  TokenTypeToCanisterId(TokenTypes.SliDip20);                        
        let actor = await provider.createActor({ canisterId: canisterId, interfaceFactory: Dip20Interface }); 
        return actor;
    };

    static async Get_Glds_Dip20_Actor(provider){
        let canisterId =  TokenTypeToCanisterId(TokenTypes.GldsDip20);                        
        let actor = await provider.createActor({ canisterId: canisterId, interfaceFactory: Dip20Interface }); 
        return actor;
    };

    // static async Get_Sli_Nft_Actor(provider){
    //     let canisterId =  TokenTypeToCanisterId(TokenTypes.GldsDip20);                        
    //     let actorSliDip20 = await provider.createActor({ canisterId: canisterId, interfaceFactory: Dip20Interface }); 
    //     return actorSliDip20;
    // };
};