import { TokenTypes } from "../Types/CommonTypes";
import {TokenTypeToCanisterId} from "../Utils/CommonUtils";

export class ModelIdentityProvider{
    
    //Connection argument
    connectObj = { 
        whitelist: 
        [
            TokenTypeToCanisterId(TokenTypes.Icp),TokenTypeToCanisterId(TokenTypes.SliDip20),
            TokenTypeToCanisterId(TokenTypes.GldsDip20),TokenTypeToCanisterId(TokenTypes.Nft)
        ]
        , host: 'https://icp0.io/'
    };

    

}