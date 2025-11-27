import React, { useState } from 'react';
import {
  Search,
  Bell,
  Moon,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  FileText,
  Building2,
  DollarSign,
  Warehouse,
  Truck,
  Headphones,
  Settings,
} from 'lucide-react';

interface SubMenuItem {
  label: string;
  path: string;
}

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  path?: string;
  subItems?: SubMenuItem[];
}

interface MenuCategory {
  label: string;
  items: MenuItem[];
}

interface NavbarProps {
  menuConfig?: {
    cadastrosBasicos?: MenuCategory[];
    comercial?: MenuCategory[];
    financeiro?: MenuCategory[];
    almoxarifado?: MenuCategory[];
    logistica?: MenuCategory[];
    crm?: MenuCategory[];
    configuracoes?: MenuCategory[];
  };
  onNavigate?: (path: string) => void;
}

const defaultCadastrosBasicos: MenuCategory[] = [
  {
    label: 'Cadastros Básicos',
    items: [
      {
        label: 'Tipos de Produtos',
        path: '/product/type',
      },
      {
        label: 'Categoria de Produto',
        path: '/product/categoria',
      },
      {
        label: 'Produtos',
        path: '/product/visualization',
      },
      {
        label: 'Serial',
        path: '/serial/list'
      },
      {
        label: 'Empresas',
        path: '/companies/list'
      }
    ],
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  menuConfig = {},
  onNavigate = (path) => console.log('Navigate to:', path)
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  const handleMenuClick = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
    setActiveSubMenu(null);
  };

  const handleSubMenuHover = (categoryLabel: string) => {
    setActiveSubMenu(categoryLabel);
  };

  const handleItemClick = (path: string) => {
    onNavigate(path);
    setActiveMenu(null);
    setActiveSubMenu(null);
  };

  const cadastrosBasicosMenu = menuConfig.cadastrosBasicos || defaultCadastrosBasicos;

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-blue-500 text-2xl font-bold">Neo</span>
            <span className="text-gray-800 text-2xl font-bold">Loc</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button
                onClick={() => handleMenuClick('cadastros')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
                  activeMenu === 'cadastros'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Cadastros Básicos</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'cadastros' ? 'rotate-180' : ''}`} />
              </button>

              {activeMenu === 'cadastros' && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-50">
                  {cadastrosBasicosMenu.map((category, idx) => (
                    <div key={idx} className="relative">
                      <button
                        onMouseEnter={() => handleSubMenuHover(category.label)}
                        onClick={() => category.items.length === 0 && handleSubMenuHover(category.label)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                      >
                        {category.label}
                        {category.items.length > 0 && <ChevronRight className="w-4 h-4" />}
                      </button>

                      {activeSubMenu === category.label && category.items.length > 0 && (
                        <div className="absolute left-full top-0 ml-1 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[220px]">
                          {category.items.map((item, itemIdx) => (
                            <button
                              key={itemIdx}
                              onClick={() => item.path && handleItemClick(item.path)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleMenuClick('comercial')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
                    activeMenu === 'comercial'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                >

              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium">Comercial</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'comercial' ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={() => handleMenuClick('financeiro')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
                    activeMenu === 'financeiro'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                >

              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-medium">Financeiro</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'financeiro' ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={() => handleMenuClick('almoxarifado')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
                    activeMenu === 'almoxarifado'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                >

              <Warehouse className="w-4 h-4" />
              <span className="text-sm font-medium">Almoxarifado</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'almoxarifado' ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={() => handleMenuClick('logistica')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
                    activeMenu === 'logistica'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                >

              <Truck className="w-4 h-4" />
              <span className="text-sm font-medium">Logística</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'logistica' ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={() => handleMenuClick('crm')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
                    activeMenu === 'crm'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                >
              <Headphones className="w-4 h-4" />
              <span className="text-sm font-medium">CRM</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'crm' ? 'rotate-180' : ''}`} />
            </button>

            <button
                onClick={() => handleMenuClick('configuracoes')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
                    activeMenu === 'configuracoes'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                >
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Configurações</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'configuracoes' ? 'rotate-180' : ''}`} />
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
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center cursor-pointer">
            <span className="text-white text-sm font-medium">U</span>
          </div>
        </div>
      </div>

      {activeMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setActiveMenu(null);
            setActiveSubMenu(null);
          }}
        />
      )}
    </nav>
  );
};
