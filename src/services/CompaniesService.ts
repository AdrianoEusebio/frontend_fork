import { Company, mockCompanies } from './CompaniesMockData';

const STORAGE_KEY = 'companies_data';

// Interface extendida para incluir todos os campos do formulário
export interface CompanyFormData {
  nome: string;
  razaoSocial: string;
  slogan: string;
  cnpj: string;
  inscricaoEstadual: string;
  inscricaoMunicipal: string;
  cpfRepresentante: string;
  nomeRepresentante: string;
  empresaPadrao: string;
}

export const CompaniesService = {
  // Inicializa os dados no localStorage se não existirem
  initializeData: () => {
    if (typeof window === 'undefined') return;
    
    const existingData = localStorage.getItem(STORAGE_KEY);
    if (!existingData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCompanies));
    }
  },

  getCompanies: (): Company[] => {
    if (typeof window === 'undefined') return [];
    
    CompaniesService.initializeData();
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  getCompanyById: (id: string): Company | undefined => {
    const companies = CompaniesService.getCompanies();
    return companies.find(company => company.id === id);
  },

  createCompany: (formData: CompanyFormData): Company => {
    const companies = CompaniesService.getCompanies();
    const newCompany: Company = {
      id: `REGISTRO ${companies.length + 1}`,
      name: formData.nome,
      socialReason: formData.razaoSocial,
      address: 'Endereço a ser implementado', // Você pode adicionar este campo no formulário
      phone1: '',
      phone2: '',
      email: '',
      website: '',
      cnpj: formData.cnpj,
    };
    
    const updatedCompanies = [...companies, newCompany];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCompanies));
    return newCompany;
  },

  updateCompany: (id: string, formData: CompanyFormData): Company | null => {
    const companies = CompaniesService.getCompanies();
    const index = companies.findIndex(company => company.id === id);
    
    if (index === -1) return null;
    
    const updatedCompany: Company = {
      ...companies[index],
      name: formData.nome,
      socialReason: formData.razaoSocial,
      cnpj: formData.cnpj,
    };
    
    companies[index] = updatedCompany;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
    return updatedCompany;
  },

  deleteCompany: (id: string): boolean => {
    const companies = CompaniesService.getCompanies();
    const filteredCompanies = companies.filter(company => company.id !== id);
    
    if (filteredCompanies.length === companies.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCompanies));
    return true;
  }
};