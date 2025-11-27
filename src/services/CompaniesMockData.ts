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
  },
  {
    id: 'REGISTRO 3',
    name: 'DESCRIÇÃO 3',
    socialReason: 'RAZÃO SOCIAL 3',
    address: 'ENDEREÇO 3',
    phone1: '(03) 1234-5678',
    phone2: '(03) 1234-5678',
    email: 'EMAIL3@GMAIL.COM',
    website: 'NOMEDOSITE3.COM.BR',
    cnpj: 'CPNJ3',
  },
  {
    id: 'REGISTRO 4',
    name: 'DESCRIÇÃO 4',
    socialReason: 'RAZÃO SOCIAL 4',
    address: 'ENDEREÇO 4',
    phone1: '(04) 1234-5678',
    phone2: '(04) 1234-5678',
    email: 'EMAIL4@GMAIL.COM',
    website: 'NOMEDOSITE4.COM.BR',
    cnpj: 'CPNJ4',
  },
  {
    id: 'REGISTRO 5',
    name: 'DESCRIÇÃO 5',
    socialReason: 'RAZÃO SOCIAL 5',
    address: 'ENDEREÇO 5',
    phone1: '(05) 1234-5678',
    phone2: '(05) 1234-5678',
    email: 'EMAIL5@GMAIL.COM',
    website: 'NOMEDOSITE5.COM.BR',
    cnpj: 'CPNJ5',
  },
  {
    id: 'REGISTRO 6',
    name: 'DESCRIÇÃO 6',
    socialReason: 'RAZÃO SOCIAL 6',
    address: 'ENDEREÇO 6',
    phone1: '(06) 1234-5678',
    phone2: '(06) 1234-5678',
    email: 'EMAIL6@GMAIL.COM',
    website: 'NOMEDOSITE6.COM.BR',
    cnpj: 'CPNJ6',
  },
  {
    id: 'REGISTRO 7',
    name: 'DESCRIÇÃO 7',
    socialReason: 'RAZÃO SOCIAL 7',
    address: 'ENDEREÇO 7',
    phone1: '(07) 1234-5678',
    phone2: '(07) 1234-5678',
    email: 'EMAIL7@GMAIL.COM',
    website: 'NOMEDOSITE7.COM.BR',
    cnpj: 'CPNJ7',
  },
  {
    id: 'REGISTRO 8',
    name: 'DESCRIÇÃO 8',
    socialReason: 'RAZÃO SOCIAL 8',
    address: 'ENDEREÇO 8',
    phone1: '(08) 1234-5678',
    phone2: '(08) 1234-5678',
    email: 'EMAIL8@GMAIL.COM',
    website: 'NOMEDOSITE8.COM.BR',
    cnpj: 'CPNJ8',
  },
  {
    id: 'REGISTRO 9',
    name: 'DESCRIÇÃO 9',
    socialReason: 'RAZÃO SOCIAL 9',
    address: 'ENDEREÇO 9',
    phone1: '(09) 1234-5678',
    phone2: '(09) 1234-5678',
    email: 'EMAIL9@GMAIL.COM',
    website: 'NOMEDOSITE9.COM.BR',
    cnpj: 'CPNJ9',
  },
  {
    id: 'REGISTRO 10',
    name: 'DESCRIÇÃO 10',
    socialReason: 'RAZÃO SOCIAL 10',
    address: 'ENDEREÇO 10',
    phone1: '(10) 1234-5678',
    phone2: '(10) 1234-5678',
    email: 'EMAIL10@GMAIL.COM',
    website: 'NOMEDOSITE10.COM.BR',
    cnpj: 'CPNJ10',
  },
];

export const getCompanies = (): Promise<Company[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCompanies);
    }, 300);
  });
};
