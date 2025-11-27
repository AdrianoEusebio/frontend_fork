import { useState, useEffect } from 'react';
import { Company } from '@/services/CompaniesMockData';
import { CompaniesService } from '@/services/CompaniesService';

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        // Inicializa os dados se necessário
        CompaniesService.initializeData();
        const data = CompaniesService.getCompanies();
        setCompanies(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar empresas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const refreshCompanies = () => {
    setCompanies(CompaniesService.getCompanies());
  };

  return { companies, loading, error, refreshCompanies };
};