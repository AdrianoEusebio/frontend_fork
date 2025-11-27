export interface Company {
  id: string;
  name: string;
  socialReason: string;
  address: string;
  phone1: string;
  phone2: string;
  email: string;
  website: string;
  cnpj: string;
}

export const mockCompanies: Company[] = [
  {
    id: 'REGISTRO 1',
    name: 'DESCRIÇÃO 1',
    socialReason: 'RAZÃO SOCIAL 1',
    address: 'ENDEREÇO 1',
    phone1: '(01) 1234-5678',
    phone2: '(01) 1234-5678',
    email: 'EMAIL1@GMAIL.COM',
    website: 'NOMEDOSITE1.COM.BR',
    cnpj: 'CPNJ1',
  },
  {
    id: 'REGISTRO 2',
    name: 'DESCRIÇÃO 2',
    socialReason: 'RAZÃO SOCIAL 2',
    address: 'ENDEREÇO 2',
    phone1: '(02) 1234-5678',
    phone2: '(02) 1234-5678',
    email: 'EMAIL2@GMAIL.COM',
    website: 'NOMEDOSITE2.COM.BR',
    cnpj: 'CPNJ2',
  }
];

export const getCompanies = (): Promise<Company[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCompanies);
    }, 300);
  });
};
