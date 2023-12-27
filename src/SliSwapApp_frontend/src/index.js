import { SliSwapApp_backend } from "../../declarations/SliSwapApp_backend";
import { WalletTypes } from "../assets/modules/Types/CommonTypes.js";
import { PubSub } from "../assets/modules/Utils/PubSub.js";
import { IdentiyProvider } from "../assets/modules/identityProvider.js";

const CommonIdentityProvider = new IdentiyProvider();

async function OnWalletStatusChanged(){
    console.log("OnWalletStatusChanged");

};

document.addEventListener('DOMContentLoaded', async function() {
    
  await CommonIdentityProvider.Init();
  //Plug wallet is sending this event in case the actual account was switched in plug-wallet tool.
  window.addEventListener("updateConnection",async () => {OnWalletStatusChanged();},false);
  PubSub.subscribe('WalletStatusChanged', OnWalletStatusChanged);
  //await Artemis_Init();
  document.getElementById("loginPlug").addEventListener('click', async function(){ await CommonIdentityProvider.Login(WalletTypes.plug)}, false);
  document.getElementById("loginStoic").addEventListener('click', async function(){ await CommonIdentityProvider.Login(WalletTypes.stoic)}, false);
  document.getElementById("loginDfinity").addEventListener('click', async function(){ await CommonIdentityProvider.Login(WalletTypes.dfinity)}, false);
  document.getElementById("info").addEventListener('click', async function(){ await CommonIdentityProvider.Info()}, false);
  document.getElementById("logout").addEventListener('click', async function(){ await CommonIdentityProvider.Logout()}, false);  
 }, false)
