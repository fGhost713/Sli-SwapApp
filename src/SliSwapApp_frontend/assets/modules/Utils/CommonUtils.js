import { TokenTypes } from "../Types/CommonTypes";

//Helper function, so that fake-enum's can be created
export function createEnum(values) {
    const enumObject = {};
    for (const val of values) {
      enumObject[val] = val;
    }
    return Object.freeze(enumObject);
  }


  //Convert TokenType-Enum to corresponding canister-id
export function TokenTypeToCanisterId(TokenType){
    switch(TokenType){
        case TokenTypes.Icp: return "ryjl3-tyaaa-aaaaa-aaaba-cai";
        case TokenTypes.SliDip20: return "zzriv-cqaaa-aaaao-a2gjq-cai";
        case TokenTypes.GldsDip20: return "7a6j3-uqaaa-aaaao-a2g5q-cai";        
        case TokenTypes.Nft50Slices: return "yd2q3-zyaaa-aaaag-qcisq-cai";        
        default: return "";
    }
};

