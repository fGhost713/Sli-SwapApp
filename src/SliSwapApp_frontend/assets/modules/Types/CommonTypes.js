import {createEnum} from "../Utils/CommonUtils";
import {IdentiyProvider} from "../identityProvider";
import {SwapAppActor} from "../SubModules/SwapAppActor";


export const TokenTypes = createEnum(['NotConnected','Icp','SliDip20', 'GldsDip20', 'Nft50Slices']);
export const WalletTypes = createEnum(['NoWallet','plug','stoic', 'dfinity']);
export const pageIds = createEnum(
  [
    'mainContentPageId','leftContentPageId'
  ]
);

export const pageIdValues = createEnum(
  [
    'PageConvertSliDip20','PageConvertGldsDip20','PageConvertNft', 
  'PageStartPage', 'PageTransactionsHistory'
  ]
);


export class WalletInfo{
    Wallet_IsConnected;
    Wallet_Type; 
    Wallet_Name;
    Wallet_AccountPrincipalText;
    Wallet_AccountPrincipal;
    
    //old tokens and nft
    SliDip20_RawBalance;
    SliDip20_Balance;
    SliDip20_Fee;

    GldsDip20_RawBalance;
    GldsDip20_Balance;
    GldsDip20_Fee;

    Sli_Nfts_RawBalance;
    Sli_Nfts_Balance;
                
    //New token
    Sli_ICRC1_RawBalance;
    Sli_ICRC1_Balance;

    //Icp
    Icp_RawBalance;
    Icp_Balance;

    constructor()
    {
        this.Reset();
    };

    Reset(){
        this.Wallet_IsConnected = false;
        this.Wallet_Type = "";
        this.Wallet_Name = "";
        this.Wallet_AccountPrincipalText = "";    
        this.Wallet_AccountPrincipal = "";   

        this.SliDip20_RawBalance = 0.0;
        this.GldsDip20_RawBalance = 0.0;
        this.Sli_Nfts_RawBalance = 0.0;            
        this.Icp_RawBalance = 0.0;
        this.Sli_ICRC1_RawBalance = 0.0;

        this.SliDip20_Balance = 0.0;
        this.GldsDip20_Balance = 0.0;
        this.Sli_Nfts_Balance = 0.0;            
        this.Icp_Balance = 0.0;
        this.Sli_ICRC1_Balance = 0.0;
    };
};



export const Dip20Interface = ({IDL}) =>{
    const TxReceipt = IDL.Variant({
        'Ok' : IDL.Nat,
        'Err' : IDL.Variant({
          'InsufficientAllowance' : IDL.Null,
          'InsufficientBalance' : IDL.Null,
          'ErrorOperationStyle' : IDL.Null,
          'Unauthorized' : IDL.Null,
          'LedgerTrap' : IDL.Null,
          'ErrorTo' : IDL.Null,
          'Other' : IDL.Text,
          'BlockUsed' : IDL.Null,
          'AmountTooSmall' : IDL.Null,
        }),
      });
    return IDL.Service({
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [TxReceipt], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'totalSupply' : IDL.Func([], [IDL.Nat], ['query']),
    'getTokenFee' : IDL.Func([], [IDL.Nat], ['query']),
    });
};

export const IcpInterface = ({IDL}) =>{
    const Account = IDL.Record({
        'owner' : IDL.Principal,
        'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
      });
    return IDL.Service({
    'icrc1_balance_of' : IDL.Func([Account], [IDL.Nat], ['query']),    
    'icrc1_name' : IDL.Func([], [IDL.Text], ['query'])        
    });
};



export const NftInterface =  ({ IDL }) => {
    const AssetHandle = IDL.Text;
    const AccountIdentifier__1 = IDL.Text;
    const TokenIndex = IDL.Nat32;
    const SubAccount__1 = IDL.Vec(IDL.Nat8);
    const TokenIdentifier = IDL.Text;
    const AccountIdentifier = IDL.Text;
    const User = IDL.Variant({
      'principal' : IDL.Principal,
      'address' : AccountIdentifier,
    });
    const BalanceRequest = IDL.Record({
      'token' : TokenIdentifier,
      'user' : User,
    });
    const Balance = IDL.Nat;
    const CommonError__1 = IDL.Variant({
      'InvalidToken' : TokenIdentifier,
      'Other' : IDL.Text,
    });
    const BalanceResponse = IDL.Variant({
      'ok' : Balance,
      'err' : CommonError__1,
    });
    const TokenIdentifier__1 = IDL.Text;
    const CommonError = IDL.Variant({
      'InvalidToken' : TokenIdentifier,
      'Other' : IDL.Text,
    });
    const Result_7 = IDL.Variant({
      'ok' : AccountIdentifier__1,
      'err' : CommonError,
    });
    const Time = IDL.Int;
    const Listing = IDL.Record({
      'locked' : IDL.Opt(Time),
      'seller' : IDL.Principal,
      'price' : IDL.Nat64,
    });
    const Result_10 = IDL.Variant({
      'ok' : IDL.Tuple(AccountIdentifier__1, IDL.Opt(Listing)),
      'err' : CommonError,
    });
    const AssetId = IDL.Nat32;
    const ChunkId = IDL.Nat32;
    const AssetType = IDL.Variant({
      'other' : IDL.Text,
      'canister' : IDL.Record({ 'id' : AssetId, 'canister' : IDL.Text }),
      'direct' : IDL.Vec(ChunkId),
    });
    const Extension = IDL.Text;
    const ListRequest = IDL.Record({
      'token' : TokenIdentifier__1,
      'from_subaccount' : IDL.Opt(SubAccount__1),
      'price' : IDL.Opt(IDL.Nat64),
    });
    const Result_3 = IDL.Variant({ 'ok' : IDL.Null, 'err' : CommonError });
    const MetadataValue = IDL.Tuple(
      IDL.Text,
      IDL.Variant({
        'nat' : IDL.Nat,
        'blob' : IDL.Vec(IDL.Nat8),
        'nat8' : IDL.Nat8,
        'text' : IDL.Text,
      }),
    );
    const MetadataContainer = IDL.Variant({
      'blob' : IDL.Vec(IDL.Nat8),
      'data' : IDL.Vec(MetadataValue),
      'json' : IDL.Text,
    });
    const Metadata = IDL.Variant({
      'fungible' : IDL.Record({
        'decimals' : IDL.Nat8,
        'metadata' : IDL.Opt(MetadataContainer),
        'name' : IDL.Text,
        'symbol' : IDL.Text,
      }),
      'nonfungible' : IDL.Record({
        'thumbnail' : IDL.Text,
        'asset' : IDL.Text,
        'metadata' : IDL.Opt(MetadataContainer),
        'name' : IDL.Text,
      }),
    });
    const Result_9 = IDL.Variant({
      'ok' : IDL.Tuple(AccountIdentifier__1, IDL.Nat64),
      'err' : CommonError,
    });
    const Transaction = IDL.Record({
      'token' : TokenIndex,
      'time' : Time,
      'seller' : AccountIdentifier__1,
      'buyer' : AccountIdentifier__1,
      'price' : IDL.Nat64,
    });
    const Result_8 = IDL.Variant({ 'ok' : Metadata, 'err' : CommonError });
    const PaymentType = IDL.Variant({
      'nft' : TokenIndex,
      'nfts' : IDL.Vec(TokenIndex),
      'sale' : IDL.Nat64,
    });
    const Payment = IDL.Record({
      'expires' : Time,
      'subaccount' : SubAccount__1,
      'payer' : AccountIdentifier__1,
      'amount' : IDL.Nat64,
      'purchase' : PaymentType,
    });
    const SalePricingGroup = IDL.Record({
      'end' : Time,
      'participants' : IDL.Vec(AccountIdentifier__1),
      'name' : IDL.Text,
      'limit' : IDL.Tuple(IDL.Nat64, IDL.Nat64),
      'pricing' : IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
      'start' : Time,
    });
    const SaleRemaining = IDL.Variant({
      'retain' : IDL.Null,
      'burn' : IDL.Null,
      'send' : AccountIdentifier__1,
    });
    const Sale = IDL.Record({
      'end' : Time,
      'groups' : IDL.Vec(SalePricingGroup),
      'start' : Time,
      'quantity' : IDL.Nat,
      'remaining' : SaleRemaining,
    });
    const Result_5 = IDL.Variant({
      'ok' : IDL.Tuple(AccountIdentifier__1, IDL.Nat64),
      'err' : IDL.Text,
    });
    const SaleDetailGroup = IDL.Record({
      'id' : IDL.Nat,
      'end' : Time,
      'name' : IDL.Text,
      'available' : IDL.Bool,
      'pricing' : IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
      'start' : Time,
    });
    const SaleDetails = IDL.Record({
      'end' : Time,
      'groups' : IDL.Vec(SaleDetailGroup),
      'start' : Time,
      'quantity' : IDL.Nat,
      'remaining' : IDL.Nat,
    });
    const Result_4 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
    const SaleTransaction = IDL.Record({
      'time' : Time,
      'seller' : IDL.Principal,
      'tokens' : IDL.Vec(TokenIndex),
      'buyer' : AccountIdentifier__1,
      'price' : IDL.Nat64,
    });
    const Memo = IDL.Vec(IDL.Nat8);
    const SubAccount = IDL.Vec(IDL.Nat8);
    const TransferRequest = IDL.Record({
      'to' : User,
      'token' : TokenIdentifier,
      'notify' : IDL.Bool,
      'from' : User,
      'memo' : Memo,
      'subaccount' : IDL.Opt(SubAccount),
      'amount' : Balance,
    });
    const TransferResponse = IDL.Variant({
      'ok' : Balance,
      'err' : IDL.Variant({
        'CannotNotify' : AccountIdentifier,
        'InsufficientBalance' : IDL.Null,
        'InvalidToken' : TokenIdentifier,
        'Rejected' : IDL.Null,
        'Unauthorized' : AccountIdentifier,
        'Other' : IDL.Text,
      }),
    });
    const Balance__1 = IDL.Nat;
    const Result_2 = IDL.Variant({ 'ok' : Balance__1, 'err' : CommonError });
    const MetadataLegacy = IDL.Variant({
      'fungible' : IDL.Record({
        'decimals' : IDL.Nat8,
        'metadata' : IDL.Opt(IDL.Vec(IDL.Nat8)),
        'name' : IDL.Text,
        'symbol' : IDL.Text,
      }),
      'nonfungible' : IDL.Record({ 'metadata' : IDL.Opt(IDL.Vec(IDL.Nat8)) }),
    });
    const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
    const HttpRequest = IDL.Record({
      'url' : IDL.Text,
      'method' : IDL.Text,
      'body' : IDL.Vec(IDL.Nat8),
      'headers' : IDL.Vec(HeaderField),
    });
    const HttpStreamingCallbackToken = IDL.Record({
      'key' : IDL.Text,
      'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
      'index' : IDL.Nat,
      'content_encoding' : IDL.Text,
    });
    const HttpStreamingCallbackResponse = IDL.Record({
      'token' : IDL.Opt(HttpStreamingCallbackToken),
      'body' : IDL.Vec(IDL.Nat8),
    });
    const HttpStreamingStrategy = IDL.Variant({
      'Callback' : IDL.Record({
        'token' : HttpStreamingCallbackToken,
        'callback' : IDL.Func(
            [HttpStreamingCallbackToken],
            [HttpStreamingCallbackResponse],
            ['query'],
          ),
      }),
    });
    const HttpResponse = IDL.Record({
      'body' : IDL.Vec(IDL.Nat8),
      'headers' : IDL.Vec(HeaderField),
      'upgrade' : IDL.Bool,
      'streaming_strategy' : IDL.Opt(HttpStreamingStrategy),
      'status_code' : IDL.Nat16,
    });
    const Result_6 = IDL.Variant({ 'ok' : MetadataLegacy, 'err' : CommonError });
    const SaleSettings = IDL.Record({
      'startTime' : Time,
      'whitelist' : IDL.Bool,
      'totalToSell' : IDL.Nat,
      'sold' : IDL.Nat,
      'bulkPricing' : IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
      'whitelistTime' : Time,
      'salePrice' : IDL.Nat64,
      'remaining' : IDL.Nat,
      'price' : IDL.Nat64,
    });
    const Result_1 = IDL.Variant({
      'ok' : IDL.Vec(TokenIndex),
      'err' : CommonError,
    });
    const Result = IDL.Variant({
      'ok' : IDL.Vec(
        IDL.Tuple(TokenIndex, IDL.Opt(Listing), IDL.Opt(IDL.Vec(IDL.Nat8)))
      ),
      'err' : CommonError,
    });
    return IDL.Service({
      'acceptCycles' : IDL.Func([], [], []),
      'addAsset' : IDL.Func(
          [AssetHandle, IDL.Nat32, IDL.Text, IDL.Text, IDL.Text],
          [],
          [],
        ),
      'addThumbnail' : IDL.Func([AssetHandle, IDL.Vec(IDL.Nat8)], [], []),
      'adminKillHeartbeat' : IDL.Func([], [], []),
      'adminRefund' : IDL.Func(
          [IDL.Text, AccountIdentifier__1, AccountIdentifier__1],
          [IDL.Text],
          [],
        ),
      'adminStartHeartbeat' : IDL.Func([], [], []),
      'allSettlements' : IDL.Func(
          [],
          [
            IDL.Vec(
              IDL.Tuple(
                TokenIndex,
                IDL.Record({
                  'subaccount' : SubAccount__1,
                  'seller' : IDL.Principal,
                  'buyer' : AccountIdentifier__1,
                  'price' : IDL.Nat64,
                }),
              )
            ),
          ],
          ['query'],
        ),
      'availableCycles' : IDL.Func([], [IDL.Nat], ['query']),
      'balance' : IDL.Func([BalanceRequest], [BalanceResponse], ['query']),
      'bearer' : IDL.Func([TokenIdentifier__1], [Result_7], ['query']),
      'details' : IDL.Func([TokenIdentifier__1], [Result_10], ['query']),
      'ext_addAssetCanister' : IDL.Func([], [], []),
      'ext_admin' : IDL.Func([], [IDL.Principal], ['query']),
      'ext_assetAdd' : IDL.Func(
          [AssetHandle, IDL.Text, IDL.Text, AssetType, IDL.Nat],
          [],
          [],
        ),
      'ext_assetExists' : IDL.Func([AssetHandle], [IDL.Bool], ['query']),
      'ext_assetFits' : IDL.Func([IDL.Bool, IDL.Nat], [IDL.Bool], ['query']),
      'ext_assetStream' : IDL.Func(
          [AssetHandle, IDL.Vec(IDL.Nat8), IDL.Bool],
          [IDL.Bool],
          [],
        ),
      'ext_balance' : IDL.Func([BalanceRequest], [BalanceResponse], ['query']),
      'ext_bearer' : IDL.Func([TokenIdentifier__1], [Result_7], ['query']),
      'ext_capInit' : IDL.Func([], [], []),
      'ext_expired' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(AccountIdentifier__1, SubAccount__1))],
          ['query'],
        ),
      'ext_extensions' : IDL.Func([], [IDL.Vec(Extension)], ['query']),
      'ext_marketplaceList' : IDL.Func([ListRequest], [Result_3], []),
      'ext_marketplaceListings' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(TokenIndex, Listing, Metadata))],
          ['query'],
        ),
      'ext_marketplacePurchase' : IDL.Func(
          [TokenIdentifier__1, IDL.Nat64, AccountIdentifier__1],
          [Result_9],
          [],
        ),
      'ext_marketplaceSettle' : IDL.Func([AccountIdentifier__1], [Result_3], []),
      'ext_marketplaceStats' : IDL.Func(
          [],
          [IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Nat, IDL.Nat, IDL.Nat],
          ['query'],
        ),
      'ext_marketplaceTransactions' : IDL.Func(
          [],
          [IDL.Vec(Transaction)],
          ['query'],
        ),
      'ext_metadata' : IDL.Func([TokenIdentifier__1], [Result_8], ['query']),
      'ext_mint' : IDL.Func(
          [IDL.Vec(IDL.Tuple(AccountIdentifier__1, Metadata))],
          [IDL.Vec(TokenIndex)],
          [],
        ),
      'ext_payments' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(AccountIdentifier__1, Payment))],
          ['query'],
        ),
      'ext_removeAdmin' : IDL.Func([], [], []),
      'ext_saleClose' : IDL.Func([], [IDL.Bool], []),
      'ext_saleCurrent' : IDL.Func([], [IDL.Opt(Sale)], ['query']),
      'ext_saleEnd' : IDL.Func([], [IDL.Bool], []),
      'ext_saleOpen' : IDL.Func(
          [
            IDL.Vec(SalePricingGroup),
            SaleRemaining,
            IDL.Vec(AccountIdentifier__1),
          ],
          [IDL.Bool],
          [],
        ),
      'ext_salePause' : IDL.Func([], [IDL.Bool], []),
      'ext_salePurchase' : IDL.Func(
          [IDL.Nat, IDL.Nat64, IDL.Nat64, AccountIdentifier__1],
          [Result_5],
          [],
        ),
      'ext_saleResume' : IDL.Func([], [IDL.Bool], []),
      'ext_saleSettings' : IDL.Func(
          [AccountIdentifier__1],
          [IDL.Opt(SaleDetails)],
          ['query'],
        ),
      'ext_saleSettle' : IDL.Func([AccountIdentifier__1], [Result_4], []),
      'ext_saleTransactions' : IDL.Func(
          [],
          [IDL.Vec(SaleTransaction)],
          ['query'],
        ),
      'ext_saleUpdate' : IDL.Func(
          [
            IDL.Opt(IDL.Vec(SalePricingGroup)),
            IDL.Opt(SaleRemaining),
            IDL.Opt(IDL.Vec(AccountIdentifier__1)),
          ],
          [IDL.Bool],
          [],
        ),
      'ext_setAdmin' : IDL.Func([IDL.Principal], [], []),
      'ext_setCollectionMetadata' : IDL.Func([IDL.Text, IDL.Text], [], []),
      'ext_setMarketplaceOpen' : IDL.Func([Time], [], []),
      'ext_setOwner' : IDL.Func([IDL.Principal], [], []),
      'ext_setRoyalty' : IDL.Func([AccountIdentifier__1, IDL.Nat64], [], []),
      'ext_transfer' : IDL.Func([TransferRequest], [TransferResponse], []),
      'extdata_supply' : IDL.Func([TokenIdentifier__1], [Result_2], ['query']),
      'extensions' : IDL.Func([], [IDL.Vec(Extension)], ['query']),
      'failedSales' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(AccountIdentifier__1, SubAccount__1))],
          ['query'],
        ),
      'getMetadata' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(TokenIndex, MetadataLegacy))],
          ['query'],
        ),
      'getMinter' : IDL.Func([], [IDL.Principal], ['query']),
      'getRegistry' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(TokenIndex, AccountIdentifier__1))],
          ['query'],
        ),
      'getTokens' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(TokenIndex, MetadataLegacy))],
          ['query'],
        ),
      'heartbeat_assetCanisters' : IDL.Func([], [], []),
      'heartbeat_capEvents' : IDL.Func([], [], []),
      'heartbeat_disbursements' : IDL.Func([], [], []),
      'heartbeat_external' : IDL.Func([], [], []),
      'heartbeat_isRunning' : IDL.Func([], [IDL.Bool], ['query']),
      'heartbeat_paymentSettlements' : IDL.Func([], [], []),
      'heartbeat_pending' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
          ['query'],
        ),
      'heartbeat_start' : IDL.Func([], [], []),
      'heartbeat_stop' : IDL.Func([], [], []),
      'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
      'http_request_streaming_callback' : IDL.Func(
          [HttpStreamingCallbackToken],
          [HttpStreamingCallbackResponse],
          ['query'],
        ),
      'http_request_update' : IDL.Func([HttpRequest], [HttpResponse], []),
      'isHeartbeatRunning' : IDL.Func([], [IDL.Bool], ['query']),
      'list' : IDL.Func([ListRequest], [Result_3], []),
      'listings' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(TokenIndex, Listing, MetadataLegacy))],
          ['query'],
        ),
      'lock' : IDL.Func(
          [TokenIdentifier__1, IDL.Nat64, AccountIdentifier__1, SubAccount__1],
          [Result_7],
          [],
        ),
      'metadata' : IDL.Func([TokenIdentifier__1], [Result_6], ['query']),
      'reserve' : IDL.Func(
          [IDL.Nat64, IDL.Nat64, AccountIdentifier__1, SubAccount__1],
          [Result_5],
          [],
        ),
      'retreive' : IDL.Func([AccountIdentifier__1], [Result_4], []),
      'saleTransactions' : IDL.Func([], [IDL.Vec(SaleTransaction)], ['query']),
      'salesSettings' : IDL.Func(
          [AccountIdentifier__1],
          [SaleSettings],
          ['query'],
        ),
      'setMinter' : IDL.Func([IDL.Principal], [], []),
      'settle' : IDL.Func([TokenIdentifier__1], [Result_3], []),
      'settlements' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(TokenIndex, AccountIdentifier__1, IDL.Nat64))],
          ['query'],
        ),
      'stats' : IDL.Func(
          [],
          [IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Nat, IDL.Nat, IDL.Nat],
          ['query'],
        ),
      'supply' : IDL.Func([TokenIdentifier__1], [Result_2], ['query']),
      'tokens' : IDL.Func([AccountIdentifier__1], [Result_1], ['query']),
      'tokens_ext' : IDL.Func([AccountIdentifier__1], [Result], ['query']),
      'transactions' : IDL.Func([], [IDL.Vec(Transaction)], ['query']),
      'transfer' : IDL.Func([TransferRequest], [TransferResponse], []),
    });
  };

  export const SwapAppActorInterface = ({ IDL }) => {
    const UserRole = IDL.Variant({
      'Anonymous' : IDL.Null,
      'NormalUser' : IDL.Null,
      'Admin' : IDL.Null,
      'Owner' : IDL.Null,
    });
    const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
    return IDL.Service({
      'GetSwapAppPrincipalText' : IDL.Func([], [IDL.Text], []),
      'GetUserRole' : IDL.Func([], [UserRole], []),
      'SetTargetICRC1TokenCanisterId' : IDL.Func([IDL.Text], [Result], []),
    });
  };
  
  export const CommonIdentityProvider = new IdentiyProvider();
  export const SwapAppActorProvider = new SwapAppActor();