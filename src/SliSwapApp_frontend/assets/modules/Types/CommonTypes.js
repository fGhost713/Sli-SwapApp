import {createEnum} from "../Utils/CommonUtils";


export const TokenTypes = createEnum(['NotConnected','Icp','SliDip20', 'GldsDip20', 'Nft50Slices']);
export const WalletTypes = createEnum(['NoWallet','plug','stoic', 'dfinity']);


export class WalletInfo{
    Wallet_IsConnected;
    Wallet_Type; 
    Wallet_Name;
    Wallet_AccountPrincipal;
    
    //old tokens and nft
    Balance_SliDip20;
    Balance_GldsDip20;
    Balance_Sli_Nfts;

    //Converted to 'normal' balance. (==  Balance / 10⁸)
    DisplayBalance_SliDip20;
    DisplayBalance_GldsDip20;
    DisplayBalance_Sli_Nfts;

    //New token
    Balance_Sli_ICRC1;

    //Icp
    Balance_Icp;

    constructor()
    {
        this.Reset();
    };

    Reset(){
        this.Wallet_IsConnected = false;
        this.Wallet_Type = "";
        this.Wallet_Name = "";
        this.Wallet_AccountPrincipal = "";            
        this.Balance_SliDip20 = 0.0;
        this.Balance_GldsDip20 = 0.0;
        this.Balance_Sli_Nfts = 0.0;            
        this.Balance_Sli_ICRC1 = 0.0;
    };
};

export const Dip20Interface = ({IDL}) =>{
    const TxReceipt = IDL.Variant({
        'Ok' : IDL.Nat,
        'Err' : IDL.Variant({
          'InsufficientAllowance' : IDL.Null,
          'InsufficientBalance' : IDL.Null,
          'ErrorOperationStyle' : IDL.Null,
          'Unauthorized' : IDL.Null,
          'LedgerTrap' : IDL.Null,
          'ErrorTo' : IDL.Null,
          'Other' : IDL.Text,
          'BlockUsed' : IDL.Null,
          'AmountTooSmall' : IDL.Null,
        }),
      });
    return IDL.Service({
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [TxReceipt], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    });
};
