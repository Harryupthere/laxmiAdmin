import React, { useEffect, useState } from "react";

const StakeHistoryTable = ({ stakeData }) => {
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
            {tableData.map((data) => (
              <tr key={data.id}>
                <td className="py-1 hover:bg-black/20 w-40">{data.username}</td>
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
                  {data.status ? (
                    <span className="text-green-400">Running</span>
                  ) : (
                    <span className="text-red-400">Closed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StakeHistoryTable;
