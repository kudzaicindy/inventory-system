import React, { useState } from 'react';
import { Package, Plus, Minus, Trash2 } from 'lucide-react';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Bed', quantity: 50 },
    { id: 2, name: 'Desk', quantity: 45 },
    { id: 3, name: 'Chair', quantity: 55 },
  ]);

  const [newItem, setNewItem] = useState({ name: '', quantity: 1 });

  const handleAddItem = () => {
    if (newItem.name) {
      setInventory([...inventory, { id: Date.now(), ...newItem }]);
      setNewItem({ name: '', quantity: 1 });
    }
  };

  const handleUpdateQuantity = (id, change) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Item name"
            className="flex-grow p-2 border rounded"
          />
          <input
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
            min="1"
            className="w-20 p-2 border rounded"
          />
          <button
            onClick={handleAddItem}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Add
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {inventory.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Package size={20} className="mr-2 text-blue-500" />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleUpdateQuantity(item.id, -1)} className="text-red-500 hover:text-red-700">
                      <Minus size={20} />
                    </button>
                    <button onClick={() => handleUpdateQuantity(item.id, 1)} className="text-green-500 hover:text-green-700">
                      <Plus size={20} />
                    </button>
                    <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManagement;