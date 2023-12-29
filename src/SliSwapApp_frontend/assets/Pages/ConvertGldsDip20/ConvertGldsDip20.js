import { CommonIdentityProvider, WalletInfo} from "../../modules/Types/CommonTypes";
import { PubSub } from "../../modules/Utils/PubSub";

var wasInitialized = false;

function RelatedHtmlPageExist(){
  return document.getElementById('walletAmountOldGldsDip20') != null;
};

async function deposit_oldGldsTokens(){
    
    console.log("deposit_oldGldsTokens");
    return;
    var availableAmount = document.getElementById('walletAmountOldGldsDip20').valueAsNumber;  
    var availableAmount1 = CommonIdentityProvider.WalletInfo.DisplayBalance_SliDip20;
    var amountToDeposit = document.getElementById('depositAmountOldGldsDip20').valueAsNumber; 
    //availableAmount = Math.max(availableAmount, 0)
    //amountToDeposit = Math.max(amountToDeposit, 0);

    alert(availableAmount.toString() + " - " + availableAmount1.toString() + " - " + amountToDeposit.toString());
}

async function OnWalletStatusChanged(args){
     
    if (RelatedHtmlPageExist() == false){
        return;
    }

    let walletInfo = CommonIdentityProvider.WalletInfo;    
    if (walletInfo.Wallet_IsConnected == false){
        document.getElementById('walletAmountOldGldsDip20').value = 0;           
    }
    else{
        var depositable_amount = walletInfo.GldsDip20_Balance - walletInfo.GldsDip20_Fee;
        depositable_amount = Math.max(depositable_amount, 0);
        //GldsDip20_Balance
        document.getElementById('walletAmountOldGldsDip20').value = depositable_amount
    }    
             
 };

export const convertGldsDip20_init =  function initConvertGldsDip20(){
        
    //if (wasInitialized == false){
        PubSub.unsubscribe('ConvertGldsDip20_js_WalletStatusChanged','WalletStatusChanged', OnWalletStatusChanged);
        PubSub.subscribe('ConvertGldsDip20_js_WalletStatusChanged','WalletStatusChanged', OnWalletStatusChanged);

        let element = document.getElementById('buttonDepositNowOldGldsDip20');        
        if (element != null){
            element.removeEventListener('click', async ()=> {await deposit_oldGldsTokens();}, true);
            // console.log("add");
            element.addEventListener('click', async ()=> {await deposit_oldGldsTokens();}, true);
        }
    //}
    wasInitialized = true;
    OnWalletStatusChanged("");
  };

