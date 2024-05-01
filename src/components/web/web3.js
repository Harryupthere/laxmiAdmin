import Web3 from "web3";
import preIcoAbi from "./preIcoAbi.json";
import icoAbi from "./icoAbi.json"
import usdtAbi from "./usdtAbi.json";
import laxmiAbi from "./laxmiAbi.json"
import stakingAbi from "./stakingAbi.json"
import web3config from "./web3config";
const web3 = new Web3();
//web3.setProvider(new web3.providers.HttpProvider("https://polygon-rpc.com"));
//web3.setProvider(new web3.providers.HttpProvider("https://polygon-mumbai.blockpi.network/v1/rpc/public"));

web3.setProvider(new web3.providers.HttpProvider("https://data-seed-prebsc-1-s3.binance.org:8545/"));

const preIcoContract = new web3.eth.Contract(
  preIcoAbi,
  web3config.preIceContractAddress
);
const icoContract = new web3.eth.Contract(
  icoAbi,
  web3config.icoContractAddress
);
const laxmiTokenContract = new web3.eth.Contract(
  laxmiAbi,
  web3config.lamxiContract
);
const usdtTokenContract = new web3.eth.Contract(
  usdtAbi,
  web3config.usdtContract
);
const stakingContract = new web3.eth.Contract(
  stakingAbi,
  web3config.stakingContractAddres
);
export const getParams = async (contractAddress) => {
  try {
    console.log(contractAddress)
    let params
    let usdtDecimals
    let laxmitDecimals
    let usdtBalance
    let laxmiBalance
    let soldOutToken;

    let rate=0;
    let stage=0;
    if(contractAddress==web3config.preIceContractAddress){
      params = await preIcoContract.methods.getParams().call();
      console.log(params)
    }else{
      params = await icoContract.methods.getParams().call();
      console.log(params)
      let getStageAndRate=await icoContract.methods.getStageAndRate().call()
      rate=parseInt(getStageAndRate.rate)
        stage=parseInt(getStageAndRate.stage)/10**18
    }
  
      usdtDecimals = await usdtTokenContract.methods.decimals().call();
      laxmitDecimals = await laxmiTokenContract.methods.decimals().call();

      usdtBalance = await usdtTokenContract.methods.balanceOf(contractAddress).call();


      laxmiBalance = await laxmiTokenContract.methods.balanceOf(contractAddress).call();


      usdtBalance = parseInt(usdtBalance) / 10 ** parseInt(usdtDecimals)
      laxmiBalance = parseInt(laxmiBalance) / 10 ** parseInt(laxmitDecimals)

      soldOutToken=parseInt(params.sold_out_token) / 10 ** 9;
    

    let arr = [];
    let obj = {
      soldOutToken,
      usdtBalance,
      laxmiBalance,
      rate,
      stage
    };
    arr.push(obj);
   
    return arr;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const withdrawToken = async (
  conntractAddress,
  tokenAddress,
  walletAddress,
  tokenWithdrawAmount
) => {
  try {
    if (!window.ethereum) {
      return { status: false, msg: "Please install metamask" };
    }

    let account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    account = account[0];
    let maticBalance = await web3.eth.getBalance(account);
    maticBalance = parseInt(maticBalance) / 10 ** 18;
    if (maticBalance <= 0) {
      return { status: false, msg: "insufficient matic" };
    }

    let owner 
    if(conntractAddress==web3config.preIceContractAddress){
      owner = await preIcoContract.methods.owner().call();
    }
    if(conntractAddress==web3config.icoContractAddress){
      owner = await icoContract.methods.owner().call();
    } 
    if(conntractAddress==web3config.stakingContractAddres){
      owner = await stakingContract.methods.owner().call();
    }
    
    if (owner.toUpperCase() != account.toUpperCase()) {
      return { status: false, msg: "Caller is not owner" };
    }
    const verifyAddress = async (address) => {
      return await web3.utils.isAddress(address);
    };
    if (!(await verifyAddress(tokenAddress))) {
      return { status: false, msg: "Please enter correct token Address" };
    }
    if (!(await verifyAddress(walletAddress))) {
      return { status: false, msg: "Please enter correct wallet address" };
    }

    if (tokenWithdrawAmount <= 0) {
      return { status: false, msg: "amount must be greater than 0" };
    }

    let tokenContract = new web3.eth.Contract(usdtAbi, tokenAddress);
    let decimal = await tokenContract.methods.decimals().call();
    let balance = await tokenContract.methods
      .balanceOf(web3config.preIceContractAddress)
      .call();

    balance = parseInt(balance);
    balance = balance / 10 ** decimal;
    if (tokenWithdrawAmount > balance) {
      return { status: false, msg: "insufficient token in contract" };
    }
    let rescueBep20;
    if(conntractAddress==web3config.preIceContractAddress){
       rescueBep20 = await preIcoContract.methods.rescueBep20(
        tokenAddress,
        (tokenWithdrawAmount * 10 ** parseInt(decimal)).toString(),
        walletAddress
      );
    }
    if(conntractAddress==web3config.icoContractAddress){
      rescueBep20 = await icoContract.methods.rescueBep20(
       tokenAddress,
       (tokenWithdrawAmount * 10 ** parseInt(decimal)).toString(),
       walletAddress
     );
   }
   if(conntractAddress==web3config.stakingContractAddres){
    rescueBep20 = await stakingContract.methods.rescueFund(
     tokenAddress,
     (tokenWithdrawAmount * 10 ** parseInt(decimal)).toString(),
     walletAddress
   );
 }

    let encoded_tx = rescueBep20.encodeABI();

    let gasPrice = await web3.eth.getGasPrice();

    let gasLimit = await web3.eth.estimateGas({
      gasPrice: web3.utils.toHex(gasPrice),
      to: conntractAddress,
      from: account,
      data: encoded_tx,
    });

    let trx = await web3.eth.sendTransaction({
      gasPrice: web3.utils.toHex(gasPrice),
      gas: web3.utils.toHex(gasLimit),
      to: conntractAddress,
      from: account,
      data: encoded_tx,
    });

    if (trx.transactionHash) {
      return { status: true, msg: "Transaction succesfull." };
    }
  } catch (error) {
    console.log(error);
    return { status: false, msg: error };
  }
};



export const withdrawMatic = async (
  contractAddress,
    walletAddress,
    tokenWithdrawAmount
  ) => {
    try {
      if (!window.ethereum) {
        return { status: false, msg: "Please install metamask" };
      }
  
      let account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      account = account[0];
      let maticBalance = await web3.eth.getBalance(account);
      maticBalance = parseInt(maticBalance) / 10 ** 18;
      if (maticBalance <= 0) {
        return { status: false, msg: "insufficient matic" };
      }
  
      let owner 
      if(contractAddress==web3config.preIceContractAddress){
        owner = await preIcoContract.methods.owner().call();
      }
      if(contractAddress==web3config.icoContractAddress){
        owner = await icoContract.methods.owner().call();
      } 
      if (owner.toUpperCase() != account.toUpperCase()) {
        return { status: false, msg: "Caller is not owner" };
      }
      const verifyAddress = async (address) => {
        return await web3.utils.isAddress(address);
      };

      if (!(await verifyAddress(walletAddress))) {
        return { status: false, msg: "Please enter correct wallet address" };
      }
  
      if (tokenWithdrawAmount <= 0) {
        return { status: false, msg: "amount must be greater than 0" };
      }
  
      let maticInContract = await web3.eth.getBalance(contractAddress);
      maticInContract=maticInContract/10**18;
      if(maticInContract<tokenWithdrawAmount){
        return { status: false, msg: "insufficientmatic in contract" };

      }
      let rescueBep20
      if(contractAddress==web3config.preIceContractAddress){
       rescueBep20 = await preIcoContract.methods.rescueNative(
        (tokenWithdrawAmount * 10 ** parseInt(18)).toString(),
        walletAddress
      );
    }
    if(contractAddress==web3config.icoContractAddress){
       rescueBep20 = await preIcoContract.methods.rescueNative(
        (tokenWithdrawAmount * 10 ** parseInt(18)).toString(),
        walletAddress
      );
    }
  
      let encoded_tx = rescueBep20.encodeABI();
  
      let gasPrice = await web3.eth.getGasPrice();
  
      let gasLimit = await web3.eth.estimateGas({
        gasPrice: web3.utils.toHex(gasPrice),
        to:contractAddress,
        from: account,
        data: encoded_tx,
      });
  
      let trx = await web3.eth.sendTransaction({
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(gasLimit),
        to:contractAddress,
        from: account,
        data: encoded_tx,
      });
  
      if (trx.transactionHash) {
        return { status: true, msg: "Transaction succesfull." };
      }
    } catch (error) {
      console.log(error);
      return { status: false, msg: error };
    }
  };


  
export const addNewPlan = async (
  duration,
  apr,
  min,max,
  reward
) => {
  try {
    if (!window.ethereum) {
      return { status: false, msg: "Please install metamask" };
    }

    let account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    account = account[0];
    let maticBalance = await web3.eth.getBalance(account);
    maticBalance = parseInt(maticBalance) / 10 ** 18;
    if (maticBalance <= 0) {
      return { status: false, msg: "insufficient matic" };
    }

   
     let owner = await stakingContract.methods.owner().call();
   
    
    if (owner.toUpperCase() != account.toUpperCase()) {
      return { status: false, msg: "Caller is not owner" };
    }
   
    if (duration <= 0) {
      return { status: false, msg: "duration must be greater then 0" };
    }
    if (apr <= 0) {
      return { status: false, msg: "apr must be greater then 0" };
    }
    if (min <= 0) {
      return { status: false, msg: "min must be greater then 0" };
    }
    if (max <= 0) {
      return { status: false, msg: "max must be greater then 0" };
    }
    if (reward <= 0) {
      return { status: false, msg: "reward must be greater then 0" };
    }


      let rescueBep20 = await stakingContract.methods.addNewPlan(
        duration,
  apr,
  min,max,
  reward
      );
   


    let encoded_tx = rescueBep20.encodeABI();

    let gasPrice = await web3.eth.getGasPrice();

    let gasLimit = await web3.eth.estimateGas({
      gasPrice: web3.utils.toHex(gasPrice),
      to: web3config.stakingContractAddres,
      from: account,
      data: encoded_tx,
    });

    let trx = await web3.eth.sendTransaction({
      gasPrice: web3.utils.toHex(gasPrice),
      gas: web3.utils.toHex(gasLimit),
      to: web3config.stakingContractAddres,
      from: account,
      data: encoded_tx,
    });

    if (trx.transactionHash) {
      return { status: true, msg: "Transaction succesfull." };
    }
  } catch (error) {
    console.log(error);
    return { status: false, msg: error };
  }
};


export const reannounceOwnership = async (
 newAddress
) => {
  try {
    if (!window.ethereum) {
      return { status: false, msg: "Please install metamask" };
    }

    let account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    account = account[0];
    let maticBalance = await web3.eth.getBalance(account);
    maticBalance = parseInt(maticBalance) / 10 ** 18;
    if (maticBalance <= 0) {
      return { status: false, msg: "insufficient matic" };
    }

   
     let owner = await stakingContract.methods.owner().call();
   
    
    if (owner.toUpperCase() != account.toUpperCase()) {
      return { status: false, msg: "Caller is not owner" };
    }
   
    const verifyAddress = async (address) => {
      return await web3.utils.isAddress(address);
    };
    if (!(await verifyAddress(newAddress))) {
      return { status: false, msg: "Please enter correct new owner Address" };
    }


      let rescueBep20 = await stakingContract.methods.transferOwnership(
        newAddress
      );
   


    let encoded_tx = rescueBep20.encodeABI();

    let gasPrice = await web3.eth.getGasPrice();

    let gasLimit = await web3.eth.estimateGas({
      gasPrice: web3.utils.toHex(gasPrice),
      to: web3config.stakingContractAddres,
      from: account,
      data: encoded_tx,
    });

    let trx = await web3.eth.sendTransaction({
      gasPrice: web3.utils.toHex(gasPrice),
      gas: web3.utils.toHex(gasLimit),
      to: web3config.stakingContractAddres,
      from: account,
      data: encoded_tx,
    });

    if (trx.transactionHash) {
      return { status: true, msg: "Transaction succesfull." };
    }
  } catch (error) {
    console.log(error);
    return { status: false, msg: error };
  }
};

export const stakingParams = async (
  
 ) => {
   try {
     if (!window.ethereum) {
       return { status: false, msg: "Please install metamask" };
     }
 
     let totalLxm = await laxmiTokenContract.methods.balanceOf(web3config.stakingContractAddres).call()
     let decimasl = await laxmiTokenContract.methods.decimals().call()

     totalLxm=(parseInt(totalLxm))/10**parseInt(decimasl)
     return {status:true,data:totalLxm}
   } catch (error) {
     console.log(error);
     return { status: false, msg: error };
   }
 };