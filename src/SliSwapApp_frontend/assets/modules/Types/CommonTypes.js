import {createEnum} from "../Utils/CommonUtils";


export const TokenTypes = createEnum(['NotConnected','Icp','SliDip20', 'GldsDip20', 'Nft50Slices']);
export const WalletTypes = createEnum(['NoWallet','plug','stoic', 'dfinity']);


export class WalletInfo{
    Wallet_IsConnected;
    Wallet_Type; 
    Wallet_AccountPrincipal;
    
    //old tokens and nft
    Balance_SliDip20;
    Balance_GldsDip20;
    Balance_Sli_Nfts;

    //New token
    Balance_Sli_ICRC1;
};
