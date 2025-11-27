import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect?: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className="border-2 border-dashed border-blue-300 rounded-lg p-12 bg-blue-50/30 hover:bg-blue-50/50 transition-colors">
      <label className="flex flex-col items-center cursor-pointer">
        <Upload className="w-12 h-12 text-blue-500 mb-3" />
        <span className="text-base font-semibold text-blue-600 mb-1">Upload de Arquivos</span>
        <span className="text-sm text-gray-500">Arquivos PNG e JPG são permitidos</span>
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
};
