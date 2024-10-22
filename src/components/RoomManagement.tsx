import { useState } from 'react';
import { Plus, CheckSquare, Square } from 'lucide-react';

interface Student {
  name: string;
  paid: boolean;
}

interface Room {
  id: number;
  number: string;
  occupants: number;
  price: number;
  students: Student[];
}

const RoomManagement = () => {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, number: 'M1', occupants: 2, price: 190, students: [{ name: '', paid: false }, { name: '', paid: false }] },
    { id: 2, number: 'M2', occupants: 3, price: 180, students: [{ name: '', paid: false }, { name: '', paid: false }, { name: '', paid: false }] },
    { id: 3, number: 'M3', occupants: 1, price: 200, students: [{ name: '', paid: false }] },
    { id: 4, number: 'M4', occupants: 4, price: 170, students: [{ name: '', paid: false }, { name: '', paid: false }, { name: '', paid: false }, { name: '', paid: false }] },
    { id: 5, number: 'M5', occupants: 1, price: 200, students: [{ name: '', paid: false }] },
    { id: 6, number: 'M6', occupants: 1, price: 200, students: [{ name: '', paid: false }] },
    { id: 7, number: 'M7', occupants: 1, price: 200, students: [{ name: '', paid: false }] },
    { id: 8, number: 'M8', occupants: 1, price: 200, students: [{ name: '', paid: false }] },
    { id: 9, number: 'Bus1', occupants: 1, price: 200, students: [{ name: '', paid: false }] },
    { id: 10, number: 'Bus2', occupants: 1, price: 200, students: [{ name: '', paid: false }] },
    { id: 11, number: 'Ext1', occupants: 1, price: 200, students: [{ name: '', paid: false }] },
    { id: 12, number: 'Ext2', occupants: 1, price: 200, students: [{ name: '', paid: false }] },
    { id: 13, number: 'Upstairs', occupants: 3, price: 150, students: [{ name: '', paid: false }, { name: '', paid: false }, { name: '', paid: false }] },
    { id: 14, number: 'C1', occupants: 1, price: 200, students: [{ name: '', paid: false }] },
    { id: 15, number: 'C2', occupants: 1, price: 200, students: [{ name: '', paid: false }] },
  ]);

  const [newRoomNumber, setNewRoomNumber] = useState<string>('');
  const [newRoomOccupants, setNewRoomOccupants] = useState<number>(1);

  const calculatePrice = (occupants: number, roomNumber: string): number => {
    if (roomNumber === 'Upstairs' && occupants === 3) {
      return 150;
    }
    return 200 - ((occupants - 1) * 10);
  };

  const handleAddRoom = () => {
    if (newRoomNumber && newRoomOccupants > 0 && newRoomOccupants <= 8) {
      const students = Array(newRoomOccupants).fill(null).map(() => ({ name: '', paid: false }));
      const newRoom: Room = {
        id: rooms.length + 1,
        number: newRoomNumber,
        occupants: newRoomOccupants,
        price: calculatePrice(newRoomOccupants, newRoomNumber),
        students: students
      };
      setRooms([...rooms, newRoom]);
      setNewRoomNumber('');
      setNewRoomOccupants(1);
    }
  };

  const handleUpdateOccupants = (id: number, newOccupants: number) => {
    setRooms(rooms.map(room => {
      if (room.id === id) {
        const newPrice = calculatePrice(newOccupants, room.number);
        const newStudents = Array(newOccupants).fill(null).map((_, index) => {
          return room.students[index] || { name: '', paid: false };
        });
        return {
          ...room,
          occupants: newOccupants,
          price: newPrice,
          students: newStudents
        };
      }
      return room;
    }));
  };

  const updateStudentName = (roomId: number, studentIndex: number, name: string) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        const newStudents = [...room.students];
        newStudents[studentIndex] = { ...newStudents[studentIndex], name };
        return { ...room, students: newStudents };
      }
      return room;
    }));
  };

  const togglePaymentStatus = (roomId: number, studentIndex: number) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        const newStudents = [...room.students];
        newStudents[studentIndex] = {
          ...newStudents[studentIndex],
          paid: !newStudents[studentIndex].paid
        };
        return { ...room, students: newStudents };
      }
      return room;
    }));
  };

  const totalRentCollected = rooms.reduce((total: number, room: Room) => {
    const paidStudents = room.students.filter(student => student.paid).length;
    return total + (paidStudents * room.price);
  }, 0);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Room Management</h1>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-lg text-blue-800">Total Rent Collected: ${totalRentCollected}</p>
        </div>
      </div>

      {/* Add New Room */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Room</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={newRoomNumber}
            onChange={(e) => setNewRoomNumber(e.target.value)}
            placeholder="Room Number"
            className="p-2 border rounded"
          />
          <input
            type="number"
            value={newRoomOccupants}
            onChange={(e) => setNewRoomOccupants(Number(e.target.value))}
            min="1"
            max="8"
            className="p-2 border rounded w-32"
          />
          <button
            onClick={handleAddRoom}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
          >
            <Plus size={20} /> Add Room
          </button>
        </div>
      </div>

      {/* Room List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div key={room.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Room {room.number}</h3>
              <div className="text-sm text-gray-600">
                ${room.price}/month per person
              </div>
            </div>

            <div className="space-y-4">
              {room.students.map((student, index) => (
                <div key={index} className="flex items-center gap-4">
                  <input
                    type="text"
                    value={student.name}
                    onChange={(e) => updateStudentName(room.id, index, e.target.value)}
                    placeholder={`Student ${index + 1}`}
                    className="p-2 border rounded flex-1"
                  />
                  <button
                    onClick={() => togglePaymentStatus(room.id, index)}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    {student.paid ? <CheckSquare size={20} /> : <Square size={20} />}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-600">Occupants:</label>
                <select
                  value={room.occupants}
                  onChange={(e) => handleUpdateOccupants(room.id, Number(e.target.value))}
                  className="p-2 border rounded"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomManagement;