import React, { useEffect, useState } from "react";
import data from "./data";
import { AiFillGift } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { RiArrowDownCircleFill, RiArrowUpCircleFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import IcoTable from "./IcoTable";
import {getParams,withdrawToken,withdrawMatic} from "../web/web3";
import toast, { Toaster } from "react-hot-toast";
import config from "../../config";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Import js-cookie library
import web3config from "../web/web3config";

const ICOPanel = () => {
  const navigate = useNavigate();

  const loginStatus = Cookies.get('loginStatus');
    if (loginStatus != 'true') {
      navigate('/')
    }
  const [stakeData, setStakeData] = useState([]);
  const [stakeData2, setStakeData2] = useState([]);

  const [hideSingleUserTable, setHideSingleUserTable] = useState(false);
  const [params,setParams] =useState([])

  const [tokenAddress,setTokenAddress]=useState("")
  const [walletAddress,setWalletAddress]=useState("")
  const [tokenWithdrawAmount,setTokenWithdrawAmount]=useState("")
  const [walletAddress2,setWalletAddress2]=useState("")
  const [tokenWithdrawAmount2,setTokenWithdrawAmount2]=useState("")
  const [singleInput,setSingleInput]=useState('')

  const [totalClaim,setTotalClaimed] = useState([{"totalClaimed":0}])
  const [getter,setter] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle submission logic here
    try{
      let result = await withdrawToken(web3config.icoContractAddress,tokenAddress,walletAddress,tokenWithdrawAmount)
      console.log(result)
      if(result.status){
        alert(result.msg)
        setter(!getter)
      }else{
        alert(result.msg)

      }
    }catch(error){
      console.log(error)

    }
  };

  const handleSubmit2 = async(e) => {
    e.preventDefault();
    // Handle submission logic here
    try{
      let result = await withdrawMatic(web3config.icoContractAddress,walletAddress2,tokenWithdrawAmount2)
      console.log(result)
      if(result.status){
        alert(result.msg)
        setter(!getter)
      }else{
        alert(result.msg)

      }
    }catch(error){
      console.log(error)

    }
  };
  useEffect(() => {
   // setStakeData(data);
    fetchAllusersApi()
    fetchParams()
  }, [getter]);

  const fetchParams=async()=>{
    let result = await getParams(web3config.icoContractAddress);
    console.log(result)
    setParams(result)
  }
  const fetchAllusersApi=async()=>{
    try{
      const response = await axios.get(`${config.apiUrl}/getUsersListIco`); // Make GET request to the API endpoint
      // Handle the response data here
      if(response.data.success){
        setStakeData(response.data.data)
        if(response.data.data.length<=0){
          return
        }
        let totalClaimed=0
        for(let i=0;i<response.data.data.length;i++){
          totalClaimed=totalClaimed+ response.data.data[i].claimedToken
        }
        setTotalClaimed([{"totalClaimed":totalClaimed}])
      };
    }catch(error){
      console.log(error)
    }
  }

  const findSingle=async(e) =>{
    setSingleInput(e.target.value);
  }
  const submitSingle=async(e)=>{
    e.preventDefault();
    const filteredData = stakeData.filter((data) =>
    Object.values(data).some((val) =>
      val.toString().toLowerCase().includes(singleInput.toLowerCase())
    )
    );
    setStakeData2(filteredData)
    setHideSingleUserTable(true)
      }
  return (
    <>
      <div className="bg-center w-screen m-auto lg:pl-56 block p-4">
    <Toaster/>

        {/* Account Summary section */}
        <div className="max-w-7xl mx-auto flex justify-start items-start p-4 flex-col bg-white PageBG rounded-xl shadow-2xl">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-indigo-800 text-3xl font-medium m-3">
              ICO Panel
            </h1>
          </div>

        {/* Top Cards  */}
          <div className="grid w-full gap-5 mx-auto   grid-cols-1  sm:grid-cols-3 md:grid-cols-4     rounded-xl  my-4  ">
            {/* <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">Current Stage</div>
                <div className="text-gray-800 text-lg">1st Stage</div>
              </div>
            </div> */}

            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                {params.length>0 &&  <div className="text-gray-400 text-sm">Current Rate stage  {params[0].stage}</div>}
                {/* <div className="text-gray-800 text-lg">25,34,000 LXM</div> */}
               { params.length>0 && <div className="text-gray-800 text-lg">{params[0].rate} LXM</div>}

              </div>
            </div>

            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">ICO Sale Interval</div>
                <div className="text-gray-800 text-lg">15 Days</div>
              </div>
            </div>

            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">Gap Between Sale</div>
                <div className="text-gray-800 text-lg">7 Days</div>
              </div>
            </div>


            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">Locking Period</div>
                <div className="text-gray-800 text-lg">2 Months</div>
              </div>
            </div>

            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">Unlock Every Month</div>
                <div className="text-gray-800 text-lg">10%</div>
              </div>
            </div>

            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">Sold Out Token</div>
                {/* <div className="text-gray-800 text-lg">50,345.56 LXM</div> */}
                {params.length>0 && <div className="text-gray-800 text-lg">{params[0].soldOutToken} LXM</div>}

              </div>
            </div>

            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">Received</div>
                <div className="text-gray-800 text-lg">4.56 MATIC</div>
              </div>
            </div>
          </div>

          {/* </div> */}

          <div className="grid w-full gap-5 mx-auto   grid-cols-1  sm:grid-cols-2 md:grid-cols-3     rounded-xl  my-4  ">
            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">ICO Contract</div>
                {params.length>0 &&<div className="text-gray-800 text-lg">{params[0].laxmiBalance} LXM</div>}
              </div>
              <div className="font-bold text-2xl p-4 rounded-full text-white Iconbg">
                <FaSackDollar />
              </div>
            </div>

            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">Total Investment</div>
               {params.length>0 && <div className="text-gray-800 text-lg">
                  {params[0].soldOutToken} LXM
                </div>}
              </div>
              <div className="font-bold text-3xl p-3 rounded-full text-white Iconbg">
                <RiArrowDownCircleFill />
              </div>
            </div>

            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">Total Claimed</div>
                { totalClaim.length>0 && <div className="text-gray-800 text-lg">{totalClaim[0].totalClaimed} LXM</div>}
              </div>
              <div className="font-bold text-3xl p-3 rounded-full text-white Iconbg">
                <RiArrowUpCircleFill />
              </div>
            </div>

            {/* Withdraw Function  */}
            <div className="flex justify-between items-center p-7 bg-gray-100 rounded-lg shadow-xl">
              <form
                //onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center"
              >
                <h1 className="text-indigo-800 text-xl font-medium my-3">
                  Withdraw Token
                </h1>
                <input
                  type="text"
                  placeholder="Enter token address"
                  value={tokenAddress}
                  onChange={(e) => setTokenAddress(e.target.value)}
                  className="p-2 m-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ width: "300px" }} // Set the width here
                />
                <input
                  type="text"
                  placeholder="Enter wallet address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="p-2 m-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ width: "300px" }} // Set the width here
                />
                <input
                  type="text"
                  placeholder="Enter other amount"
                  value={tokenWithdrawAmount}
                  onChange={(e) => setTokenWithdrawAmount(e.target.value)}
                  className="p-2 m-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ width: "300px" }} // Set the width here
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                  onClick={e=>{handleSubmit(e)}}
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Add new Plan Function  */}
            <div className="flex justify-between items-center p-7 bg-gray-100 rounded-lg shadow-xl">
              <form className="flex flex-col justify-center items-center">
                <h1 className="text-indigo-800 text-xl font-medium my-3">
                  Withdraw MATIC
                </h1>
                <input
                  type="text"
                  placeholder="To Wallet Address"
                  className="p-2 m-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ width: "300px" }} // Set the width here
                  value={walletAddress2}
                  onChange={(e) => setWalletAddress2(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="MATIC Amount"
                  className="p-2 m-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ width: "300px" }} // Set the width here
                  value={tokenWithdrawAmount2}
                  onChange={(e) => setTokenWithdrawAmount2(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                  onClick={e=>{handleSubmit2(e)}}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          <div className="w-full">
            <div className="flex flex-row items-center justify-between p-4 bg-gray-100 rounded-md w-full">
              <h1 className="text-indigo-800 text-xl font-medium my-3">
                Get Single User ICO Data
              </h1>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search..."
                  className="p-2 ml-4 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ maxWidth: "500px" }}
                  value={singleInput}
                  onChange={e=>findSingle(e)}
                />
                <button
                  type="submit"
                  onClick={e => {
                    submitSingle(e);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4"
                >
                  Submit
                </button>
              </div>
            </div>
            {hideSingleUserTable ? (
              <IcoTable stakeData={stakeData2} />
            ) : null}
          </div>

          <div>
            <h1 className="text-indigo-800 text-xl font-medium my-3">
              All Users ICO History
            </h1>
          </div>

          <IcoTable stakeData={stakeData} />
        </div>
      </div>
    </>
  );
};

export default ICOPanel;
