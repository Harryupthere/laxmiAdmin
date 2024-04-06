import React, { useEffect, useState } from "react";
import data from "./data";
import { AiFillGift } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { RiArrowDownCircleFill, RiArrowUpCircleFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import StakeHistoryTable from "./StakeHistoryTable";
import {getParams,withdrawToken,withdrawMatic} from "../web/web3";
import toast, { Toaster } from "react-hot-toast";
import config from "../../config";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Import js-cookie library
const ICOPanel = () => {
  const navigate = useNavigate();

  const loginStatus = Cookies.get('loginStatus');
    if (loginStatus != 'true') {
      navigate('/')
    }
  const [stakeData, setStakeData] = useState([]);
  const [hideSingleUserTable, setHideSingleUserTable] = useState(false);
  const [params,setParams] =useState([])

  const [tokenAddress,setTokenAddress]=useState("")
  const [walletAddress,setWalletAddress]=useState("")
  const [tokenWithdrawAmount,setTokenWithdrawAmount]=useState("")
  const [walletAddress2,setWalletAddress2]=useState("")
  const [tokenWithdrawAmount2,setTokenWithdrawAmount2]=useState("")
  const [getter,setter] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle submission logic here
    try{
      let result = await withdrawToken(tokenAddress,walletAddress,tokenWithdrawAmount)
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
      let result = await withdrawMatic(walletAddress2,tokenWithdrawAmount2)
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
    let result = await getParams();
    setParams(result)
  }
  const fetchAllusersApi=async()=>{
    try{
      const response = await axios.get(`${config.apiUrl}/getAllUsers`); // Make GET request to the API endpoint
      // Handle the response data here
      if(response.data.success){
        setStakeData(response.data.data)
      };
    }catch(error){
      console.log(error)
    }
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
                <div className="text-gray-400 text-sm">Current Rate</div>
                {/* <div className="text-gray-800 text-lg">25,34,000 LXM</div> */}
                <div className="text-gray-800 text-lg">0.30 LXM</div>

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
                <div className="text-gray-800 text-lg">50,345.56 LXM</div>
              </div>
              <div className="font-bold text-2xl p-4 rounded-full text-white Iconbg">
                <FaSackDollar />
              </div>
            </div>

            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">Total Investment</div>
                <div className="text-gray-800 text-lg">
                  8,987,890.00 LXM
                </div>
              </div>
              <div className="font-bold text-3xl p-3 rounded-full text-white Iconbg">
                <RiArrowDownCircleFill />
              </div>
            </div>

            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">Total Claimed</div>
                <div className="text-gray-800 text-lg">2,34,560.30 LXM</div>
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
                Get Single User Stake Data
              </h1>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search..."
                  className="p-2 ml-4 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ maxWidth: "500px" }}
                />
                <button
                  type="submit"
                  onClick={() => {
                    setHideSingleUserTable(true);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4"
                >
                  Submit
                </button>
              </div>
            </div>
            {hideSingleUserTable ? (
              <StakeHistoryTable stakeData={stakeData} />
            ) : null}
          </div>

          <div>
            <h1 className="text-indigo-800 text-xl font-medium my-3">
              All Users Stake History
            </h1>
          </div>

          <StakeHistoryTable stakeData={stakeData} />
        </div>
      </div>
    </>
  );
};

export default ICOPanel;
