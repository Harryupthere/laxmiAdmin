// StakeTable.js
import React from "react";

const StakeTable = ({ stakeData }) => {
  function epochToDateString(epoch) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Multiply by 1000 to convert seconds to milliseconds
    const date = new Date(epoch);
    const day = date.getDate().toString().padStart(2, "0"); // Get the day and pad with 0 if necessary
    const month = months[date.getMonth()]; // Get the month abbreviation from the months array
    const year = date.getFullYear(); // Get the full year

    return `${day}-${month}-${year}`;
  }

  return (
    <div className="w-full text-center border rounded-xl overflow-x-auto bg-white">
      <div className="my-3 w-[1200px]">
        <table>
          <thead className="text-md font-bold w-full text-center">
            <tr>
              <th className="bg-black/50 text-white py-3 w-40">Username</th>
              {/* <th className="bg-black/50 text-white py-3 w-40">User Id</th> */}
              <th className="bg-black/50 text-white py-3 w-40">Duration</th>
              <th className="bg-black/50 text-white py-3 w-40">Stake</th>
              <th className="bg-black/50 text-white py-3 w-40">ROI</th>
              <th className="bg-black/50 text-white py-3 w-40">Staked Time</th>
              <th className="bg-black/50 text-white py-3 w-40">
                Maturity Time
              </th>
              <th className="bg-black/50 text-white py-3 w-60">Process</th>
            </tr>
          </thead>
          <tbody className="w-full text-center">
            {stakeData.map((data) => (
              <tr key={data.id}>
                <td className="py-1 hover:bg-black/20 w-40">{data.username}</td>
                {/* <td className="py-1 hover:bg-black/20 w-40">{data.userId}</td> */}
                <td className="py-1 hover:bg-black/20 w-40">{data.duration}</td>
                <td className="py-1 hover:bg-black/20 w-40">{data.stake}</td>
                <td className="py-1 hover:bg-black/20 w-40">{data.roi}</td>
                <td className="py-1 hover:bg-black/20 w-40">
                  {epochToDateString(data.stakedTime)}
                </td>
                <td className="py-1 hover:bg-black/20 w-40">
                  {epochToDateString(data.maturityTime)}
                </td>

                <td className="py-1 hover:bg-black/20 w-40">
                  {data.status ? <span className="text-green-400">Running</span>  : <span className="text-red-400">Closed</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StakeTable;
