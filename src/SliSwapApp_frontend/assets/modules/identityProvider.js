import { Artemis } from 'artemis-web3-adapter';
import { PubSub } from "./Utils/PubSub";
import { ModelIdentityProvider } from "./Models/ModelIdentityProvider";
import { WalletTypes, WalletInfo, Dip20Interface, TokenTypes } from './Types/CommonTypes';
import { Principal } from '@dfinity/principal';
import { OldTokenActors } from "./Actors/OldTokenActors"

export class IdentiyProvider{

    //private fields
    #_model;
    #_adapter;

    //public fields
    WalletInfo;

    constructor(){
        this.#_model = new ModelIdentityProvider();
        this.#_adapter = new Artemis(this.#_model.connectObj);                  
    };
    
    
    async UpdateWalletInformation(){
        this.WalletInfo.Reset();

        let connectedWalletInfo = this.#_adapter?.connectedWalletInfo;
        if (connectedWalletInfo !=null && connectedWalletInfo !=false){
            
            switch(connectedWalletInfo.id){
                case 'plug': this.WalletInfo.Wallet_Type = WalletTypes.plug;
                    break;
                case 'stoic': this.WalletInfo.Wallet_Type = WalletTypes.stoic;
                    break;
                case 'dfinity': this.WalletInfo.Wallet_Type = WalletTypes.dfinity;
                    break;
                default: return;
            }
            let principalText = this.#_adapter?.principalId;
            this.WalletInfo.Wallet_Name = connectedWalletInfo.name;
            this.WalletInfo.Wallet_AccountPrincipal = principalText;
            this.WalletInfo.Balance_Icp =  this.#_adapter?.balance;
            this.Wallet_IsConnected = true;
            let provider =  this.#_adapter?.provider;
            let actorSliDip20 = await OldTokenActors.Get_Sli_Dip20_Actor(provider);

            
            // let sliDip20CanisterId =  TokenTypeToCanisterId(TokenTypes.SliDip20);                        
            // let actorSliDip20 = await provider.createActor({ canisterId: sliDip20CanisterId, interfaceFactory: Dip20Interface });            
            let name =await actorSliDip20.name(); 
            console.log("name");
            console.log(name);
            let principal = Principal.fromText(principalText);            
            var balance = await actorSliDip20.balanceOf(principal);        
            this.WalletInfo.Balance_SliDip20 = balance;
            this.WalletInfo.DisplayBalance_SliDip20 = Number(balance) / (10**8);
            
            let actorGldsDip20 = await OldTokenActors.Get_Glds_Dip20_Actor(provider);
            balance = await actorGldsDip20.balanceOf(principal);        
            this.WalletInfo.Balance_GldsDip20 = balance;
            this.WalletInfo.DisplayBalance_GldsDip20 = Number(balance) / (10**8);
            //console.log("bal:");
            //console.log(bal);



        } else{
            return;
        };
        console.log("wallet info:");
        console.log(this.WalletInfo);
    };

    //Publish the event that the wallet status might be changed. (So update of balance, etc.., might be needed)
    async publishOnWalletStatusChanged(){
        await this.UpdateWalletInformation();


        PubSub.publish('WalletStatusChanged', null);

    };

    //This method is called when user identiy (inside plug wallet) is switched 
    async OnPlugUserIdentitySwitched()
    {
        console.log("Inside OnWalletStatusChanged");
        await this.Login(WalletTypes.plug);        
    }

    async Init(){  
        console.log("in init from IdentityProvider");        
        this.WalletInfo = new WalletInfo();
        
        //Plug wallet is sending this event when user-identity is switched 
        window.addEventListener("updateConnection",async () => {this.OnPlugUserIdentitySwitched();},false);       
                        
        try{
            await this.Logout();
        }
        catch(error)
        {
            console.log(error);
        }        
        this.publishOnWalletStatusChanged();  
    };
    
    async Login(walletType){

        var result;
        var walletName  = "";
        console.log("wallet type:");
        console.log(walletType);
        switch(walletType){
            case WalletTypes.plug: walletName="plug";
                break;
            case WalletTypes.stoic: walletName="stoic";
                break;
            case WalletTypes.dfinity: walletName="dfinity";               
                break;
            default: walletName = "";
                break;
        }
    
        console.log("Log in to wallet:");
        console.log(walletName);
        if (walletName == ""){
            return;
        }
    
        var result = await this.#_adapter.connect(walletName);
        console.log("result:");
        console.log(result);
        this.publishOnWalletStatusChanged(); 
    };

    async Logout(){
        var result = await this.#_adapter.disconnect();
        console.log(result);    
    };

    async Info(){
        let connectedWalletInfo = this.#_adapter.connectedWalletInfo;
        console.log("connectedWalletInfo:");
        console.log(connectedWalletInfo);
        console.log("identity:");
        let ident = await window.ic?.plug?.agent?._identity;
        console.log(ident);        
        console.log("adapter:");
        console.log(this.#_adapter);

        console.log("principal1:");
        console.log(this.#_adapter?.principalId);

        console.log("principal2:");
        let principalInt8Array = await this.#_adapter?.provider?.getPrincipal();
        let principal2 = Principal.fromUint8Array(principalInt8Array).toText();
        console.log(principal2);

    };

};










