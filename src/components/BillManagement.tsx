import { useState } from 'react';
import { Droplet, Zap, Flame, Plus } from 'lucide-react';

interface Bill {
  amount: number;
  description: string;
}

const BillManagement = () => {
  const [bills, setBills] = useState<{
    [key: string]: Bill;
  }>({
    water: { amount: 520, description: '' },
    electricity: { amount: 780, description: '' },
    gas: { amount: 150, description: '' },
  });

  const [newBillType, setNewBillType] = useState<string>('');
  const [newBillAmount, setNewBillAmount] = useState<number>(0);
  const [newBillDescription, setNewBillDescription] = useState<string>('');

  const handleUpdateBill = (type: string, amount: string, description: string) => {
    setBills(prevBills => ({
      ...prevBills,
      [type]: {
        ...prevBills[type],
        amount: parseFloat(amount),
        description,
      },
    }));
  };

  const handleAddBill = () => {
    if (newBillType && newBillAmount > 0) {
      setBills(prevBills => ({
        ...prevBills,
        [newBillType]: {
          amount: newBillAmount,
          description: newBillDescription,
        },
      }));
      setNewBillType('');
      setNewBillAmount(0);
      setNewBillDescription('');
    }
  };

  const BillItem = ({ type, icon, bill }: { type: string; icon: JSX.Element; bill: Bill }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-xl font-semibold ml-2 capitalize">{type} Bill</h2>
      </div>
      <div className="flex items-center mb-2">
        <span className="text-2xl font-bold text-gray-700 mr-2">$</span>
        <input
          type="number"
          value={bill.amount}
          onChange={(e) => handleUpdateBill(type, e.target.value, bill.description)}
          className="text-2xl font-bold text-gray-700 w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none"
        />
      </div>
      <input
        type="text"
        value={bill.description}
        onChange={(e) => handleUpdateBill(type, bill.amount.toString(), e.target.value)}
        placeholder="Description"
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bill Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(bills).map(([type, bill]) => (
          <BillItem key={type} type={type} icon={type === 'water' ? <Droplet size={24} className="text-blue-500" /> : type === 'electricity' ? <Zap size={24} className="text-yellow-500" /> : <Flame size={24} className="text-red-500" />} bill={bill} />
        ))}
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Add New Bill</h2>
        <input
          type="text"
          value={newBillType}
          onChange={(e) => setNewBillType(e.target.value)}
          placeholder="Bill Type"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="number"
          value={newBillAmount}
          onChange={(e) => setNewBillAmount(parseFloat(e.target.value))}
          placeholder="Amount"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="text"
          value={newBillDescription}
          onChange={(e) => setNewBillDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button onClick={handleAddBill} className="flex items-center bg-blue-500 text-white p-2 rounded">
          <Plus size={16} className="mr-2" /> Add Bill
        </button>
      </div>
    </div>
  );
};

export default BillManagement;