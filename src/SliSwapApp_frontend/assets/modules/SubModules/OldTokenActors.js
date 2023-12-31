import { Dip20Interface, IcpInterface, NftInterface, TokenTypes } from "../Types/CommonTypes";
import { TokenTypeToCanisterId } from "../Utils/CommonUtils";
import { Principal } from '@dfinity/principal';
import { SubAccount } from "@dfinity/ledger-icp";



export class BalanceInformation{
    RawBalance;
    Balance;
};

export class OldTokenActors{

    //private fields
    #provider;
    #principal;

    #actorSli;
    #actorGlds;
    #actorNft;
    #actorIcp

    constructor(provider, principal){
        this.#provider = provider;    
        this.#principal = principal;    
    }

    async init(){

        const responses = await Promise.all([
            this.#Get_Sli_Dip20_Actor(this.#provider),
            this.#Get_Glds_Dip20_Actor(this.#provider),
            this.#Get_Icp_Actor(this.#provider),
            this.#Get_Nft_Actor(this.#provider)
           ]);


        this.#actorSli = responses[0];
        this.#actorGlds = responses[1];
        this.#actorIcp = responses[2];
        this.#actorNft = responses[3];
              
    };

    async GetNftBalance(){        
        //TODO: make this work
        return;
        let result = await this.#actorNft.balance("");        
        return result;
    };

    //old Dip 20 sli 
    async GetSliBalance(){
      return await this.#GetDip20BalanceInformation(this.#actorSli);
    };
    async GetSliFee(){
        return await this.#GetDip20FeeInformation(this.#actorSli);
    }

    //old Dip 20 glds
    async GetGldsBalance(){
        return await this.#GetDip20BalanceInformation(this.#actorGlds);
    };

    async GetGldsFee(){
        return await this.#GetDip20FeeInformation(this.#actorGlds);
    }

    //icp
    async GetIcpBalance(){       
        let balanceInfo = new BalanceInformation();
        let balance = await this.#actorIcp.icrc1_balance_of({
            owner : this.#principal,
            subaccount : [],
          }); 

        balanceInfo.RawBalance = balance;
        balanceInfo.Balance = Number(balance) / (10**8);
        return balanceInfo;
    };

    //private functions
    async #GetDip20BalanceInformation(actorToUse){
        let balanceInfo = new BalanceInformation();
        let balance = await actorToUse.balanceOf(this.#principal); 
        balanceInfo.RawBalance = balance;
        balanceInfo.Balance = Number(balance) / (10**8);
        return balanceInfo;
    };

    async #GetDip20FeeInformation(actorToUse){
        
        var fee = await actorToUse.getTokenFee(); 
        
        fee = Number(fee) / (10**8);
        return fee;
    };

    async #Get_Sli_Dip20_Actor(provider){
        let canisterId =  TokenTypeToCanisterId(TokenTypes.SliDip20);                        
        let actor = await provider.createActor({ canisterId: canisterId, interfaceFactory: Dip20Interface }); 
        return actor;
    };

    async #Get_Glds_Dip20_Actor(provider){
        let canisterId =  TokenTypeToCanisterId(TokenTypes.GldsDip20);                        
        let actor = await provider.createActor({ canisterId: canisterId, interfaceFactory: Dip20Interface }); 
        return actor;
    };

    async #Get_Icp_Actor(provider){
        let canisterId =  TokenTypeToCanisterId(TokenTypes.Icp);                        
        let actor = await provider.createActor({ canisterId: canisterId, interfaceFactory: IcpInterface }); 
        return actor;
    };

    async #Get_Nft_Actor(provider){        
        let canisterId =  TokenTypeToCanisterId(TokenTypes.Nft50Slices);                                
        let actor = await provider.createActor({ canisterId: canisterId, interfaceFactory: NftInterface });         
        return actor;
    };



};

