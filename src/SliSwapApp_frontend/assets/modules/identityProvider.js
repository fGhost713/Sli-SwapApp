import { Artemis } from 'artemis-web3-adapter';
import { PubSub } from "./Utils/PubSub";
//import { ModelIdentityProvider } from "./Models/ModelIdentityProvider";
import { WalletTypes, WalletInfo, Dip20Interface, TokenTypes } from './Types/CommonTypes';
import { Principal } from '@dfinity/principal';
import { OldTokenActors,BalanceInformation } from "./SubModules/OldTokenActors"
import { SliSwapApp_backend } from "../../../declarations/SliSwapApp_backend";
import { TokenTypeToCanisterId } from "../modules/Utils/CommonUtils";

export class IdentiyProvider{

    //private fields
    //#_model;
    #_adapter;
    #_plugWalletConnected;
    #_init_done;
    #_inside_login;
    #_inside_logout;
    

    //public fields
    WalletInfo;
    SwapAppPrincipalText;

    constructor(){
        this.WalletInfo = new WalletInfo();
        this.#_init_done = false;
        //this.#_model = new ModelIdentityProvider();                    
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

    async GetProvider(){
        return this.#_adapter?.provider;
    };

    //SwapAppActor
    async #UserIdentityChanged(){
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
                let provider =  this.#_adapter?.provider;
                                    
                let oldTokenActor = new OldTokenActors(provider, principal);
                await oldTokenActor.init();


                // let balanceSli = await oldTokenActor.GetSliBalance();
                // this.WalletInfo.SliDip20_RawBalance = balanceSli.RawBalance;
                // this.WalletInfo.SliDip20_Balance = balanceSli.Balance;
                // this.WalletInfo.SliDip20_Fee = await oldTokenActor.GetSliFee();
                                
                // let balanceGlds = await oldTokenActor.GetGldsBalance();
                // this.WalletInfo.GldsDip20_RawBalance = balanceGlds.RawBalance;
                // this.WalletInfo.GldsDip20_Balance = balanceGlds.Balance;
                // this.WalletInfo.GldsDip20_Fee = await oldTokenActor.GetGldsFee();

                // let balanceIcp = await oldTokenActor.GetIcpBalance();
                // this.WalletInfo.Icp_RawBalance = balanceIcp.RawBalance;
                // this.WalletInfo.Icp_Balance = balanceIcp.Balance;

                // this.WalletInfo.Wallet_IsConnected = true;

                
                const responses = await Promise.all([
                    await oldTokenActor.GetSliBalance(),
                    await oldTokenActor.GetGldsBalance(),
                    await oldTokenActor.GetIcpBalance(),    
                    await oldTokenActor.GetSliFee(),
                    await oldTokenActor.GetGldsFee()                
                ]);

                 
                let balanceSli = responses[0];
                this.WalletInfo.SliDip20_RawBalance = balanceSli.RawBalance;
                this.WalletInfo.SliDip20_Balance = balanceSli.Balance;
                this.WalletInfo.SliDip20_Fee = responses[3];
                                
                let balanceGlds = responses[1];
                this.WalletInfo.GldsDip20_RawBalance = balanceGlds.RawBalance;
                this.WalletInfo.GldsDip20_Balance = balanceGlds.Balance;
                this.WalletInfo.GldsDip20_Fee = responses[4];

                let balanceIcp = responses[2];
                this.WalletInfo.Icp_RawBalance = balanceIcp.RawBalance;
                this.WalletInfo.Icp_Balance = balanceIcp.Balance;

                this.WalletInfo.Wallet_IsConnected = true;
            

            } else{
                return;
            };
        } catch(error){
            
        }
        finally{
                        
            PubSub.publish('UserIdentityChanged', null);            
        };        
    };
   
    //This method is called when user identiy (inside plug wallet) is switched 
    async OnPlugUserIdentitySwitched()
    {        
        await this.Login(WalletTypes.plug);        
    }

    async Init(){                  
                

        this.SwapAppPrincipalText = await SliSwapApp_backend.GetSwapAppPrincipalText();
                  
        let connectedObj = { 
            whitelist: 
            [
                TokenTypeToCanisterId(TokenTypes.Icp),TokenTypeToCanisterId(TokenTypes.SliDip20),
                TokenTypeToCanisterId(TokenTypes.GldsDip20),TokenTypeToCanisterId(TokenTypes.Nft),
                this.SwapAppPrincipalText
            ]
            , host: 'https://icp0.io/'
        };

        this.#_adapter = new Artemis(connectedObj); 


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
        
            let result = await this.#_adapter.connect(walletName);
           
            if (walletType == WalletTypes.plug){
                this.#_plugWalletConnected = true;
            };                    
        }
        catch(error){
            console.log(error);
        }
        finally{
            this.#_inside_login = false;
            this.#UserIdentityChanged(); 
        }
    };

    async Logout(){
        
        if (this.#_inside_logout){
            return;
        }
        this.#_inside_logout = true;
        try{

            if (this.#_init_done == false){
                await this.#_adapter.disconnect();
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
                await this.#_adapter.disconnect();                                
            }            
        }
        catch(error){
            console.log(error);    
        }
        finally{
            this.#_inside_logout = false;
            await this.#UserIdentityChanged(); 
        }

               
    };

};










