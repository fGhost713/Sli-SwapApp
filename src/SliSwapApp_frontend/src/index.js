import { CommonIdentityProvider, SwapAppActorProvider, SwapAppActorInterface,WalletTypes, pageIds, pageIdValues } from "../assets/modules/Types/CommonTypes.js";
import { PubSub } from "../assets/modules/Utils/PubSub.js";
import { DynamicPageContentLoad } from "../assets/modules/Utils/DynamicPageContentLoad.js";

function ContainsRule(item, ...fieldNames){

  for (let fieldName of fieldNames){
    if (Object.hasOwn(item, fieldName)){
      return true;
    }
  };
  return false;
}


async function IdentityChanged(args){
     
   let walletInfo = CommonIdentityProvider.WalletInfo;
   let labelInfo = document.getElementById("labelWalletConnectionStatus");
         
   if (walletInfo.Wallet_IsConnected == false){
          labelInfo.innerHTML = "Status: Not connected to a wallet"      
   }
   else{
    labelInfo.innerHTML = "Status: connected to " + walletInfo.Wallet_Name + " (" + walletInfo.Wallet_AccountPrincipalText +" )";
   }    

  await SwapAppActorProvider.Init(await CommonIdentityProvider.GetProvider());
  let appSettingsButton = document.getElementById("NavigateToAdminSection");   
  var userRole = await SwapAppActorProvider.GetUserRole();

  if ( ContainsRule(userRole, 'Owner', 'Admin')){           

    appSettingsButton.style.display = "block";
   }
   else{
    appSettingsButton.style.display = "none";
   }
                    
};



/* When the user clicks on the button,
toggle between hiding and showing the dropdown content of button 'Wallet Connection' */
function OnToggleWalletDropDownMenu(){ 
  document.getElementById("dropDownWalletMenu").classList.toggle("show");  
}

//Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', async function() {
      
  PubSub.subscribe('index_js_UserIdentityChanged', 'UserIdentityChanged', IdentityChanged);
  await CommonIdentityProvider.Init();
     
  DynamicPageContentLoad(pageIds.mainContentPageId, pageIdValues.PageStartPage);      
  
  document.getElementById("NavigateToStartPage").addEventListener('click', 
  function(){ DynamicPageContentLoad(pageIds.mainContentPageId, pageIdValues.PageStartPage);}, false);

  document.getElementById("NavigateConvertSli").addEventListener('click', function(){ 
    DynamicPageContentLoad(pageIds.mainContentPageId, pageIdValues.PageConvertSliDip20);}, false);

  document.getElementById("NavigateToConvertGlds").addEventListener('click', function(){
     DynamicPageContentLoad(pageIds.mainContentPageId, pageIdValues.PageConvertGldsDip20);}, false);

  document.getElementById("NavigateToShowHistoryTransactions").addEventListener('click', 
  function(){ DynamicPageContentLoad(pageIds.mainContentPageId, pageIdValues.PageTransactionsHistory);}, false);


  document.getElementById("buttonWalletDropDown").addEventListener('click', function(){ OnToggleWalletDropDownMenu();}, false);
  document.getElementById("loginPlug").addEventListener('click', async function(){ await CommonIdentityProvider.Login(WalletTypes.plug)}, false);
  document.getElementById("loginStoic").addEventListener('click', async function(){ await CommonIdentityProvider.Login(WalletTypes.stoic)}, false);
  document.getElementById("loginDfinity").addEventListener('click', async function(){ await CommonIdentityProvider.Login(WalletTypes.dfinity)}, false);  
  document.getElementById("logout").addEventListener('click', async function(){ await CommonIdentityProvider.Logout()}, false);  
 }, false)
