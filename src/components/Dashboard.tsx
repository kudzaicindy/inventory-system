
import { useNavigate } from 'react-router-dom';
import {
  Home,
  DollarSign,
  Package,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Home className="text-blue-400" size={32} />,
      title: 'Room Management',
      description: 'Efficiently manage and track room occupancy',
      path: '/rooms'
    },
    {
      icon: <DollarSign className="text-green-400" size={32} />,
      title: 'Bill Tracking',
      description: 'Monitor and manage all resident payments',
      path: '/bills'
    },
    {
      icon: <Package className="text-purple-400" size={32} />,
      title: 'Inventory Control',
      description: 'Keep track of supplies and assets',
      path: '/inventory'
    },
    {
      icon: <AlertTriangle className="text-orange-400" size={32} />,
      title: 'Penalty System',
      description: 'Manage rule violations and penalties',
      path: '/penalties'
    }
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 to-blue-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="/api/placeholder/1920/1080"
          alt="Boarding House"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Welcome to Our
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}Boarding House
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Efficiently manage rooms, track bills, maintain inventory, and handle penalties - all in one place.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(feature.path)}
              className="group relative overflow-hidden bg-white/10 backdrop-blur-lg border-blue-200/20 hover:bg-white/20 transition-all duration-300 cursor-pointer p-6"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="text-blue-400" size={20} />
              </div>
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-blue-100 group-hover:text-white transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
    </div>
  );
};

export default Dashboard;