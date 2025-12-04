export interface StorageLocation {
  id: number;
  code: string;
  description: string;
  storageType: 'INTERNO' | 'EXTERNO';
  observation: string;
  accountsOwnStock: boolean;
}

export interface StorageLocationFilters {
  description: string;
}
