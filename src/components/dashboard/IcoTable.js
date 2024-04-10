import React, { useEffect, useState } from "react";

const IcoTable = ({ stakeData }) => {
  const initialData = stakeData;
  const itemsPerPage = 5; // Number of items per page

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  //   const [tableData, setTableData] = useState(initialData.slice(0, itemsPerPage)); // Data for the current page
  const [tableData, setTableData] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    const filteredData = initialData.filter((data) =>
      Object.values(data).some((val) =>
        val.toString().toLowerCase().includes(value.toLowerCase())
      )
    );

    setTableData(filteredData);
  };

  const totalPages = Math.ceil(initialData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setTableData(initialData.slice(startIndex, endIndex));
  };

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

  useEffect(() => {
    setTableData(stakeData.slice(0, itemsPerPage));
  }, [stakeData]);

  return (
    <div className="w-full text-center border rounded-xl overflow-x-auto bg-gray-100">
      <div className="my-3 w-[1200px]">
        {/* Pagination controls */}
        <div className="flex justify-center items-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === i + 1 ? "bg-gray-400 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="flex flex-row items-center justify-between p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold">Search items</h3>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="p-2 ml-4 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-grow"
            style={{ maxWidth: "500px" }}
          />
        </div>

        <table>
          <thead className="text-md font-bold w-full text-center">
            <tr>
             
            <th className="bg-black/50 text-white py-3 w-40">Username</th>
              <th className="bg-black/50 text-white py-3 w-40">Email</th>
              <th className="bg-black/50 text-white py-3 w-40">Wallet Address</th>
              <th className="bg-black/50 text-white py-3 w-40">Time</th>
              <th className="bg-black/50 text-white py-3 w-40">Locked Token</th>
              <th className="bg-black/50 text-white py-3 w-40">Claimed Token</th>
              <th className="bg-black/50 text-white py-3 w-40">Remaining Token</th>
              <th className="bg-black/50 text-white py-3 w-40">Rate</th>
              <th className="bg-black/50 text-white py-3 w-40">Hash</th>
              <th className="bg-black/50 text-white py-3 w-40">INR Amount</th>
              <th className="bg-black/50 text-white py-3 w-40">ETH Amount</th>
            </tr>
          </thead>
          <tbody className="w-full text-center">
            {tableData.map((data) => (
              <tr key={data.id}>
                <td className="py-1 hover:bg-black/20 w-40">{data.userName}</td>
                <td className="py-1 hover:bg-black/20 w-40">{data.email}</td>
                <td className="py-1 hover:bg-black/20 w-40">{`${data.walletAddress.toString().substring(0,4)}...${data.walletAddress.toString().substring(data.walletAddress.length-4,data.walletAddress.length)}`}</td>
                <td className="py-1 hover:bg-black/20 w-40">{epochToDateString(data.time)}</td>
                <td className="py-1 hover:bg-black/20 w-40">{data.lockedToken}</td>
                <td className="py-1 hover:bg-black/20 w-40">{data.claimedToken}</td>
                <td className="py-1 hover:bg-black/20 w-40">{data.remainingToken}</td>
                <td className="py-1 hover:bg-black/20 w-40">{data.rate}</td>
                <td className="py-1 hover:bg-black/20 w-40">{`${data.hash.toString().substring(0,4)}...${data.hash.toString().substring(data.hash.length-4,data.hash.length)}`}</td>

                <td className="py-1 hover:bg-black/20 w-40">{data.INRAmount}</td>
                <td className="py-1 hover:bg-black/20 w-40">{data.etherAmount}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IcoTable;
