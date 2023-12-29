import { CommonIdentityProvider, WalletInfo} from "../modules/Types/CommonTypes";
import { PubSub } from "../modules/Utils/PubSub";

async function deposit_oldSliTokens(){
    
    var availableAmount = document.getElementById('walletAmountOldSliDip20').valueAsNumber;  
    var availableAmount1 = CommonIdentityProvider.WalletInfo.DisplayBalance_SliDip20;
    var amountToDeposit = document.getElementById('depositAmountOldSliDip20').valueAsNumber; 
    //availableAmount = Math.max(availableAmount, 0)
    //amountToDeposit = Math.max(amountToDeposit, 0);

    alert(availableAmount.toString() + " - " + availableAmount1.toString() + " - " + amountToDeposit.toString());
}

async function OnWalletStatusChanged(args){

     console.log("Inside convertDip20 - OnWallerStatusChanged");

    let walletInfo = CommonIdentityProvider.WalletInfo; 
    console.log(walletInfo)    ;
    if (walletInfo.Wallet_IsConnected == false){
        document.getElementById('walletAmountOldSliDip20').value = 0;           
    }
    else{
        var depositable_amount = walletInfo.SliDip20_Balance - walletInfo.SliDip20_Fee;
        depositable_amount = Math.max(depositable_amount, 0);
        //SliDip20_Balance
        document.getElementById('walletAmountOldSliDip20').value = depositable_amount
    }    
             
 };

export const convertDip20_init =  function initConvertDip20(){
        
    PubSub.unsubscribe('ConvertDip20_js_WalletStatusChanged','WalletStatusChanged', OnWalletStatusChanged);
    PubSub.subscribe('ConvertDip20_js_WalletStatusChanged','WalletStatusChanged', OnWalletStatusChanged);

    let element = document.getElementById('buttonDepositNowOldSliDip20');        
    if (element != null){
        element.removeEventListener('click', async ()=> {await deposit_oldSliTokens();}, true);
        // console.log("add");
        element.addEventListener('click', async ()=> {await deposit_oldSliTokens();}, true);
    }
    OnWalletStatusChanged("");
  };

