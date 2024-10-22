import React, { useState } from 'react';
import { AlertTriangle, Plus, X } from 'lucide-react';

const PenaltyManagement = () => {
  const [penalties, setPenalties] = useState([
    { id: 1, description: 'Broken window', amount: 100, student: 'John Doe' },
    { id: 2, description: 'Damaged furniture', amount: 75, student: 'Jane Smith' },
  ]);

  const [newPenalty, setNewPenalty] = useState({ description: '', amount: '', student: '' });

  const handleAddPenalty = () => {
    if (newPenalty.description && newPenalty.amount && newPenalty.student) {
      setPenalties([...penalties, { id: Date.now(), ...newPenalty, amount: parseFloat(newPenalty.amount) }]);
      setNewPenalty({ description: '', amount: '', student: '' });
    }
  };

  const handleRemovePenalty = (id) => {
    setPenalties(penalties.filter(penalty => penalty.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Penalty Management</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Penalty</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={newPenalty.description}
            onChange={(e) => setNewPenalty({ ...newPenalty, description: e.target.value })}
            placeholder="Description"
            className="p-2 border rounded"
          />
          <input
            type="number"
            value={newPenalty.amount}
            onChange={(e) => setNewPenalty({ ...newPenalty, amount: e.target.value })}
            placeholder="Amount"
            className="p-2 border rounded"
          />
          <input
            type="text"
            value={newPenalty.student}
            onChange={(e) => setNewPenalty({ ...newPenalty, student: e.target.value })}
            placeholder="Student Name"
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={handleAddPenalty}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Penalty
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {penalties.map(penalty => (
              <tr key={penalty.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <AlertTriangle size={20} className="mr-2 text-yellow-500" />
                    <span>{penalty.description}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">${penalty.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{penalty.student}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleRemovePenalty(penalty.id)} className="text-red-500 hover:text-red-700">
                    <X size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PenaltyManagement;