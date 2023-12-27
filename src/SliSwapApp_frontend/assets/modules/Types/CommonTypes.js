import {createEnum} from "../Utils/CommonUtils";


export const TokenTypes = createEnum(['NotConnected','Icp','SliDip20', 'GldsDip20', 'Nft50Slices']);
export const WalletTypes = createEnum(['NoWallet','plug','stoic', 'dfinity']);
