import { SliSwapApp_backend } from "../../declarations/SliSwapApp_backend";
import { CommonIdentityProvider, WalletTypes, pageIds, pageIdValues } from "../assets/modules/Types/CommonTypes.js";
import { PubSub } from "../assets/modules/Utils/PubSub.js";
import { IdentiyProvider } from "../assets/modules/identityProvider.js";
import { createEnum } from "../assets/modules/Utils/CommonUtils.js";
import { DynamicPageContentLoad } from "../assets/modules/Utils/DynamicPageContentLoad.js";


async function OnWalletStatusChanged(args){

   let walletInfo = CommonIdentityProvider.WalletInfo;
   let labelInfo = document.getElementById("labelWalletConnectionStatus");
   console.log(labelInfo);
    
   if (walletInfo.Wallet_IsConnected == false){
          labelInfo.innerHTML = "Status: Not connected to a wallet"      
   }
   else{
    labelInfo.innerHTML = "Status: connected to " + walletInfo.Wallet_Name + " (" + walletInfo.Wallet_AccountPrincipalText +" )";
   }    
            
};


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function OnToggleWalletDropDownMenu(){
  console.log("clicked");
  document.getElementById("dropDownWalletMenu").classList.toggle("show");
  //document.getElementById("dropDownWalletMenu").style.display = 'block';
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
      
  PubSub.subscribe('index_js_WalletStatusChanged', 'WalletStatusChanged', OnWalletStatusChanged);
  await CommonIdentityProvider.Init();
  DynamicPageContentLoad(pageIds.mainContentPageId, pageIdValues.PageConvertSliDip20);      
        
  //buttonDepositNow
  // document.getElementById("buttonDepositNow").addEventListener('click', async function(){ alert('hello');}, false);
  // document.getElementById("buttonDepositNow").addEventListener('click', ()=> {blabla();}, false);
  
  // document.getElementById("info").addEventListener('click', function(){ 
  //   DynamicPageContentLoad(pageIds.mainContentPageId, pageIdValues.PageConvertSliDip20);      
  //   //convertDip20_init();
  // }, false);

  document.getElementById("buttonWalletDropDown").addEventListener('click', function(){ OnToggleWalletDropDownMenu();}, false);
  document.getElementById("loginPlug").addEventListener('click', async function(){ await CommonIdentityProvider.Login(WalletTypes.plug)}, false);
  document.getElementById("loginStoic").addEventListener('click', async function(){ await CommonIdentityProvider.Login(WalletTypes.stoic)}, false);
  document.getElementById("loginDfinity").addEventListener('click', async function(){ await CommonIdentityProvider.Login(WalletTypes.dfinity)}, false);
  // document.getElementById("info").addEventListener('click', async function(){ await CommonIdentityProvider.Info()}, false);
  document.getElementById("logout").addEventListener('click', async function(){ await CommonIdentityProvider.Logout()}, false);  
 }, false)
