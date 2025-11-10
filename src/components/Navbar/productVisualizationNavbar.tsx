import React from 'react';
import {
  Search,
  Bell,
  Moon,
  HelpCircle,
  ChevronDown,
  FileText,
  Building2,
  DollarSign,
  Warehouse,
  Truck,
  Headphones,
  Settings,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-blue-500 text-2xl font-bold">Neo</span>
            <span className="text-gray-800 text-2xl font-bold">Loc</span>
          </div>

          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Cadastros Básicos</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-1.5 rounded-md">
              <Building2 className="w-4 h-4" />
              <span className="text-sm">Comercial</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-1.5 rounded-md">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">Financeiro</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-1.5 rounded-md">
              <Warehouse className="w-4 h-4" />
              <span className="text-sm">Almoxarifado</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-1.5 rounded-md">
              <Truck className="w-4 h-4" />
              <span className="text-sm">Logística</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-1.5 rounded-md">
              <Headphones className="w-4 h-4" />
              <span className="text-sm">CRM</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-1.5 rounded-md">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Configurações</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:text-gray-800">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800">
            <Moon className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800">
            <HelpCircle className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
