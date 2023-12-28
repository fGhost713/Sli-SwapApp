import { CommonIdentityProvider, WalletInfo} from "../modules/Types/CommonTypes";

async function deposit_oldSliTokens(){
    
    var availableAmount = document.getElementById('walletAmountOldDip20').valueAsNumber;  
    var availableAmount1 = CommonIdentityProvider.WalletInfo.DisplayBalance_SliDip20;
    var amountToDeposit = document.getElementById('depositAmountOldDip20').valueAsNumber; 
    //availableAmount = Math.max(availableAmount, 0)
    //amountToDeposit = Math.max(amountToDeposit, 0);

    alert(availableAmount.toString() + " - " + availableAmount1.toString() + " - " + amountToDeposit.toString());
}


export const convertDip20_init =  function initConvertDip20(){
    
    let element = document.getElementById('buttonDepositNow');        
    if (element != null){
        element.removeEventListener('click', async ()=> {await deposit_oldSliTokens();}, true);
        // console.log("add");
        element.addEventListener('click', async ()=> {await deposit_oldSliTokens();}, true);
    }
  };

