import { Artemis } from 'artemis-web3-adapter';
import { PubSub } from "../modules/Utils/PubSub";
import { ModelIdentityProvider } from "../modules/Models/ModelIdentityProvider";
import { WalletTypes } from './Types/CommonTypes';

export class IdentiyProvider{

    #_model;
    #_adapter;

    constructor(){
        this.#_model = new ModelIdentityProvider();
        this.#_adapter = new Artemis(this.#_model.connectObj);        
    };

    //Publish the event that the wallet status might be changed. (So update of balance, etc.., might be needed)
    async publishOnWalletStatusChanged(){
        PubSub.publish('WalletStatusChanged', null);
    };

    async Init(){  
        console.log("in init from IdentityProvider");
        //let connResult = await this.#_adapter.autoConnect(this.#_model.connectObj);  
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
    };

};










