import { CommonIdentityProvider, SwapAppActorInterface, UserRole} from "../Types/CommonTypes.js";
//import { _SERVICE, SliSwapApp , UserRole } from "../../../../declarations/SliSwapApp_backend/SliSwapApp_backend.did.js"
import { Principal } from '@dfinity/principal';

export class SwapAppActor{

    #provider;    
    #swapAppActor;


    #ProviderIsDefined(){
        if (this.#provider == null || this.#provider == undefined || this.#provider == false){
            return false;
        };
        return true;
    };

    async Init(provider){
        this.#provider = provider;  

        if (this.#ProviderIsDefined() == false){            
            this.#provider = null;
            this.#swapAppActor = null;
            return;
        }
           
        let dAppPrincipalText =  CommonIdentityProvider.SwapAppPrincipalText;                                       
        this.#swapAppActor = await this.#provider.createActor({ canisterId: dAppPrincipalText, interfaceFactory: SwapAppActorInterface });         
              
    };

    async GetUserRole(){

        if (this.#ProviderIsDefined() == false){

            return {'NormalUser':null};
        };
        
        return await this.#swapAppActor.GetUserRole() ;                
    };


};