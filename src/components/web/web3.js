import Web3 from "web3";
import preIcoAbi from "./preIcoAbi.json";
import usdtAbi from "./usdtAbi.json";
import web3config from "./web3config";
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("https://polygon-rpc.com"));
// var web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mainnet.infura.io/75424779582248e9a2b625d4e3b5b576"));

const preIcoContract = new web3.eth.Contract(
  preIcoAbi,
  web3config.preIceContractAddress
);

export const getParams = async () => {
  try {
    const params = await preIcoContract.methods.getParams().call();
    console.log(params);
    let soldOutToken = parseInt(params.sold_out_token) / 10 ** 6;

    let arr = [];
    let obj = {
      soldOutToken,
    };
    arr.push(obj);
    return arr;
  } catch (error) {
    console.log(error);
  }
};

export const withdrawToken = async (
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

    let owner = await preIcoContract.methods.owner().call();
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

    let rescueBep20 = await preIcoContract.methods.rescueBep20(
      tokenAddress,
      (tokenWithdrawAmount * 10 ** parseInt(decimal)).toString(),
      walletAddress
    );

    let encoded_tx = rescueBep20.encodeABI();

    let gasPrice = await web3.eth.getGasPrice();

    let gasLimit = await web3.eth.estimateGas({
      gasPrice: web3.utils.toHex(gasPrice),
      to: web3config.preIceContractAddress,
      from: account,
      data: encoded_tx,
    });

    let trx = await web3.eth.sendTransaction({
      gasPrice: web3.utils.toHex(gasPrice),
      gas: web3.utils.toHex(gasLimit),
      to: web3config.preIceContractAddress,
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
  
      let owner = await preIcoContract.methods.owner().call();
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
  
      let maticInContract = await web3.eth.getBalance(web3config.preIceContractAddress);
      maticInContract=maticInContract/10**18;
      if(maticInContract<tokenWithdrawAmount){
        return { status: false, msg: "insufficientmatic in contract" };

      }
  
      let rescueBep20 = await preIcoContract.methods.rescueNative(
        (tokenWithdrawAmount * 10 ** parseInt(18)).toString(),
        walletAddress
      );
  
      let encoded_tx = rescueBep20.encodeABI();
  
      let gasPrice = await web3.eth.getGasPrice();
  
      let gasLimit = await web3.eth.estimateGas({
        gasPrice: web3.utils.toHex(gasPrice),
        to: web3config.preIceContractAddress,
        from: account,
        data: encoded_tx,
      });
  
      let trx = await web3.eth.sendTransaction({
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(gasLimit),
        to: web3config.preIceContractAddress,
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