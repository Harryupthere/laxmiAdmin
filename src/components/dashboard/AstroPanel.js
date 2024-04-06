import React, { useEffect, useState } from "react";
import data from "./data";
import { FaSackDollar } from "react-icons/fa6";
import { RiArrowDownCircleFill, RiArrowUpCircleFill } from "react-icons/ri";
import StakeHistoryTable from "./StakeHistoryTable";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Import js-cookie library
const PreviousUnstakeHistory = () => {
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
              Astro Panel
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviousUnstakeHistory;
