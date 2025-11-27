import { useState, useEffect } from 'react';
import { Company, getCompanies } from '@/services/CompaniesMockData';

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const data = await getCompanies();
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

  return { companies, loading, error };
};
