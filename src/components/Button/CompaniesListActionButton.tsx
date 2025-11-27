import React from 'react';
import { Phone, Link2, Mail, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  onCall?: () => void;
  onLink?: () => void;
  onEmail?: () => void;
  onDelete?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCall,
  onLink,
  onEmail,
  onDelete
}) => {
  return (
    <div className="flex gap-1">
      <button
        onClick={onCall}
        className="w-7 h-7 rounded bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors"
        title="Ligar"
      >
        <Phone className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={onLink}
        className="w-7 h-7 rounded bg-purple-500 hover:bg-purple-600 flex items-center justify-center transition-colors"
        title="Link"
      >
        <Link2 className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={onEmail}
        className="w-7 h-7 rounded bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-colors"
        title="Email"
      >
        <Mail className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={onDelete}
        className="w-7 h-7 rounded bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
        title="Excluir"
      >
        <Trash2 className="w-4 h-4 text-white" />
      </button>
    </div>
  );
};
