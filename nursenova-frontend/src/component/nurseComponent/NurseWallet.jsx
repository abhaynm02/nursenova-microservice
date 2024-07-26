import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getWalletHistory } from '../../api/nurse';
import PageNavigationBar from '../PageNavigationBar';

const NurseWallet = () => {
    const userId = useSelector((state) => state.auth.email);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const[transactions,setTransactions]=useState([]);
    const totalAmount = 1250.75;

    useEffect(()=>{
        const fetchData=async(userId)=>{
            try {
                const response =await getWalletHistory(userId,
                    currentPage - 1,
                    pageSize);
                  setTransactions(response.data.content)
                console.log(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData(userId);

    },[userId]);
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit'
        });
      };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-6">Your Wallet</h2>
            <div className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
              <p className="text-white text-base sm:text-lg font-semibold">Total Balance</p>
              <p className="text-white text-2xl sm:text-4xl font-bold">${totalAmount}</p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Transaction History</h3>
              <div className="overflow-x-auto -mx-4 sm:-mx-6">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(transaction.dateTime)}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            ${transaction.amount }
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.transactionType}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          <PageNavigationBar
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
    />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NurseWallet
