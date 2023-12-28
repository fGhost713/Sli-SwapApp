import { SliSwapApp_backend } from "../../declarations/SliSwapApp_backend";
import { CommonIdentityProvider, WalletTypes, pageIds, pageIdValues } from "../assets/modules/Types/CommonTypes.js";
import { PubSub } from "../assets/modules/Utils/PubSub.js";
import { IdentiyProvider } from "../assets/modules/identityProvider.js";
import { createEnum } from "../assets/modules/Utils/CommonUtils.js";
import { DynamicPageContentLoad } from "../assets/modules/Utils/DynamicPageContentLoad.js";


async function OnWalletStatusChanged(){
    console.log("OnWalletStatusChanged");

};


document.addEventListener('DOMContentLoaded', async function() {
      
  await CommonIdentityProvider.Init();
  DynamicPageContentLoad(pageIds.mainContentPageId, pageIdValues.PageConvertSliDip20);      
    
  PubSub.subscribe('WalletStatusChanged', OnWalletStatusChanged);
  
  //buttonDepositNow
  // document.getElementById("buttonDepositNow").addEventListener('click', async function(){ alert('hello');}, false);
  // document.getElementById("buttonDepositNow").addEventListener('click', ()=> {blabla();}, false);
  
  // document.getElementById("info").addEventListener('click', function(){ 
  //   DynamicPageContentLoad(pageIds.mainContentPageId, pageIdValues.PageConvertSliDip20);      
  //   //convertDip20_init();
  // }, false);

  document.getElementById("loginPlug").addEventListener('click', async function(){ await CommonIdentityProvider.Login(WalletTypes.plug)}, false);
  document.getElementById("loginStoic").addEventListener('click', async function(){ await CommonIdentityProvider.Login(WalletTypes.stoic)}, false);
  document.getElementById("loginDfinity").addEventListener('click', async function(){ await CommonIdentityProvider.Login(WalletTypes.dfinity)}, false);
  document.getElementById("info").addEventListener('click', async function(){ await CommonIdentityProvider.Info()}, false);
  document.getElementById("logout").addEventListener('click', async function(){ await CommonIdentityProvider.Logout()}, false);  
 }, false)
