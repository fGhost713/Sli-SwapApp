import { Artemis } from 'artemis-web3-adapter';
import { PubSub } from "./Utils/PubSub";
import { ModelIdentityProvider } from "./Models/ModelIdentityProvider";
import { WalletTypes, WalletInfo, Dip20Interface, TokenTypes } from './Types/CommonTypes';
import { Principal } from '@dfinity/principal';
import { OldTokenActors,BalanceInformation } from "./SubModules/OldTokenActors"

export class IdentiyProvider{

    //private fields
    #_model;
    #_adapter;
    #_plugWalletConnected;
    #_init_done;
    #_inside_login;
    #_inside_logout;

    //public fields
    WalletInfo;

    constructor(){
        this.#_init_done = false;
        this.#_model = new ModelIdentityProvider();
        this.#_adapter = new Artemis(this.#_model.connectObj);                  
    };
        
    IsWalletConnected(){

        if (this.#_adapter.provider == null || this.#_adapter.provider == false) {
            return false;
        }

        let connectedWalletInfo = this.#_adapter?.connectedWalletInfo;
        if (connectedWalletInfo ==null || connectedWalletInfo ==false){
            return false;            
        };

        if (connectedWalletInfo.id == 'plug' && this.#_plugWalletConnected == false ){
            return false;
        }
        
        return true;
    };

    async UpdateWalletInformation(){
        this.WalletInfo.Reset();
        
        try
        {
            if (this.IsWalletConnected() == false) {
                return;
            }

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
                let principal = Principal.fromText(principalText);            

                this.WalletInfo.Wallet_Name = connectedWalletInfo.name;
                this.WalletInfo.Wallet_AccountPrincipalText = principalText;
                this.WalletInfo.Wallet_AccountPrincipal = principal;
                this.WalletInfo.Balance_Icp =  this.#_adapter?.balance;
                this.Wallet_IsConnected = true;
                let provider =  this.#_adapter?.provider;
                                    
                let oldTokenActor = new OldTokenActors(provider, principal);
                await oldTokenActor.init();

                //let resultBla = await oldTokenActor.GetNftBalance();


                var balance = await oldTokenActor.GetSliBalance();
                this.WalletInfo.SliDip20_RawBalance = balance.RawBalance;
                this.WalletInfo.SliDip20_Balance = balance.Balance;
                this.WalletInfo.SliDip20_Fee = await oldTokenActor.GetSliFee();
                                
                balance = await oldTokenActor.GetGldsBalance();
                this.WalletInfo.GldsDip20_RawBalance = balance.RawBalance;
                this.WalletInfo.GldsDip20_Balance = balance.Balance;
                this.WalletInfo.GldsDip20_Fee = await oldTokenActor.GetGldsFee();

                balance = await oldTokenActor.GetIcpBalance();
                this.WalletInfo.Icp_RawBalance = balance.RawBalance;
                this.WalletInfo.Icp_Balance = balance.Balance;

                this.WalletInfo.Wallet_IsConnected = true;
            

            } else{
                return;
            };
        } catch(error){
            
        }
        finally{

            console.log("publish wallet status cheanged");
            PubSub.publish('WalletStatusChanged', null);
        };
        console.log("wallet info:");
        console.log(this.WalletInfo);
    };
   
    //This method is called when user identiy (inside plug wallet) is switched 
    async OnPlugUserIdentitySwitched()
    {
        console.log("Inside OnPlugUserIdentitySwitched");
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
        this.#_init_done = true;
        
    };
    
    async Login(walletType){

        if (this.#_inside_login == true){
            return;
        }
        this.#_inside_login = true;
        try
        {
            var walletName  = "";        
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
                
            if (walletName == ""){
                return;
            }
        
            await this.#_adapter?.connect(walletName);
            if (walletType == WalletTypes.plug){
                this.#_plugWalletConnected = true;
            };        
            this.UpdateWalletInformation(); 
        }
        catch(error){
            console.log(error);
        }
        finally{
            this.#_inside_login = false;
        }
    };

    async Logout(){
        
        if (this.#_inside_logout){
            return;
        }
        this.#_inside_logout = true;
        try{

            if (this.#_init_done == false){
                await this.#_adapter?.disconnect();
                return;
            }

            if (this.IsWalletConnected() == false){
                return;
            }

            if (this.#_adapter?.connectedWalletInfo?.id == 'plug'){                
                //disConnect on plug-wallet is throwing exception, therefore this workaround:
                this.#_plugWalletConnected = false;

            }
            else{                
                await this.#_adapter?.disconnect();                                
            }            
        }
        catch(error){
            console.log(error);    
        }
        finally{
            this.#_inside_logout = false;
            await this.UpdateWalletInformation(); 
        }

               
    };

    async Info(){

        let connectedWalletInfo = this.#_adapter?.connectedWalletInfo;
        // console.log("connectedWalletInfo:");
        // console.log(connectedWalletInfo);

        // console.log("adapter:");
        // console.log(this.#_adapter);

        console.log("Wallet info:");
        console.log(this.WalletInfo);

        // console.log("plug");
        // console.log(window.ic?.plug);

        console.log("IsWalletConnected():");
        console.log(this.IsWalletConnected());

        return;

        
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










