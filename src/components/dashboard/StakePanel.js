import React, { useEffect, useState } from "react";
import data from "./data";
import { FaSackDollar } from "react-icons/fa6";
import { RiArrowDownCircleFill, RiArrowUpCircleFill } from "react-icons/ri";
import StakeHistoryTable from "./StakeHistoryTable";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Import js-cookie library
const StakeHistory = () => {
  const navigate = useNavigate();

  const loginStatus = Cookies.get('loginStatus');
    if (loginStatus != 'true') {
      navigate('/')
    }
  const [stakeData, setStakeData] = useState([]);
  const [hideSingleUserTable, setHideSingleUserTable] = useState(false);

  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [otherAmount, setOtherAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic here
  };

  useEffect(() => {
    setStakeData(data);
  }, []);

  return (
    <>
      <div className="bg-center w-screen m-auto lg:pl-56 block p-4">
        {/* Account Summary section */}
        <div className="max-w-7xl mx-auto flex justify-start items-start p-4 flex-col bg-white PageBG rounded-xl shadow-2xl">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-indigo-800 text-3xl font-medium m-3">
              Stake Panel
            </h1>
          </div>
          <div className="grid w-full gap-5 mx-auto   grid-cols-1  sm:grid-cols-2 md:grid-cols-3     rounded-xl  my-4  ">
            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">Staking Contract</div>
                <div className="text-gray-800 text-lg">50,345.56 Laxmi-m</div>
              </div>
              <div className="font-bold text-2xl p-4 rounded-full text-white Iconbg">
                <FaSackDollar />
              </div>
            </div>

            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">Total Stake</div>
                <div className="text-gray-800 text-lg">
                  8,987,890.00 Laxmi-m
                </div>
              </div>
              <div className="font-bold text-3xl p-3 rounded-full text-white Iconbg">
                <RiArrowDownCircleFill />
              </div>
            </div>

            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">Total Unstake</div>
                <div className="text-gray-800 text-lg">2,34,560.30 Laxmi-m</div>
              </div>
              <div className="font-bold text-3xl p-3 rounded-full text-white Iconbg">
                <RiArrowUpCircleFill />
              </div>
            </div>

            {/* Withdraw Function  */}
            <div className="flex justify-between items-center p-7 bg-gray-100 rounded-lg shadow-xl">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center"
              >
                <h1 className="text-indigo-800 text-xl font-medium my-3">
                  Withdraw Token
                </h1>
                <input
                  type="text"
                  placeholder="Enter unstake amount"
                  value={unstakeAmount}
                  onChange={(e) => setUnstakeAmount(e.target.value)}
                  className="p-2 m-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ width: "300px" }} // Set the width here
                />
                <input
                  type="text"
                  placeholder="Enter token amount"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  className="p-2 m-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ width: "300px" }} // Set the width here
                />
                <input
                  type="text"
                  placeholder="Enter other amount"
                  value={otherAmount}
                  onChange={(e) => setOtherAmount(e.target.value)}
                  className="p-2 m-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ width: "300px" }} // Set the width here
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Add new Plan Function  */}
            <div className="flex justify-between items-center p-7 bg-gray-100 rounded-lg shadow-xl">
              <form className="flex flex-col justify-center items-center">
                <h1 className="text-indigo-800 text-xl font-medium my-3">
                  Add New Plan
                </h1>
                <input
                  type="number"
                  placeholder="Number Of Days"
                  className="p-2 m-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ width: "300px" }} // Set the width here
                />
                <div>
                  <input
                    type="number"
                    placeholder="Min Amount"
                    className="p-2 m-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ width: "140px" }} // Set the width here
                  />
                  <input
                    type="number"
                    placeholder="Max Amount"
                    className="p-2 m-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ width: "140px" }} // Set the width here
                  />
                </div>

                <div>
                  <input
                    type="number"
                    placeholder="APR Amount"
                    className="p-2 m-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ width: "140px" }} // Set the width here
                  />
                  <input
                    type="number"
                    placeholder="Reward Charge"
                    className="p-2 m-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ width: "140px" }} // Set the width here
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Remove Plan & Transfer ownership Function  */}
            <div className="flex flex-col justify-between items-center p-7 bg-gray-100 rounded-lg shadow-xl">
              <div>
                <form className="flex flex-col justify-center items-center">
                  <h1 className="text-indigo-800 text-xl font-medium my-3">
                    Remove Stake Plan
                  </h1>
                  <input
                    type="text"
                    placeholder="Enter unstake amount"
                    value={unstakeAmount}
                    onChange={(e) => setUnstakeAmount(e.target.value)}
                    className="p-2 m-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ width: "300px" }} // Set the width here
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                  >
                    Submit
                  </button>
                </form>
              </div>

              <div>
                <form className="flex flex-col justify-center items-center">
                  <h1 className="text-indigo-800 text-xl font-medium my-3">
                    Transfer Ownership
                  </h1>
                  <input
                    type="text"
                    placeholder="Enter New Owner Address"
                    className="p-2 m-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ width: "300px" }} // Set the width here
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                  >
                    Submit
                  </button>
                </form>
              </div>
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
                  onClick={()=>{
                    setHideSingleUserTable(true)
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

export default StakeHistory;
