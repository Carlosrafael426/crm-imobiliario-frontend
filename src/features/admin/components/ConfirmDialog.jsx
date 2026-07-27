import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from '../../../components/Modal';

export default function ConfirmDialog({ title, message, confirmLabel = 'Confirmar', danger = false, isLoading, onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel} maxWidth="max-w-sm">
      <div className="p-6">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
            danger ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'
          }`}
        >
          <AlertTriangle size={22} />
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-colors disabled:opacity-60 ${
              danger ? 'bg-red-500 hover:bg-red-600' : 'bg-action hover:bg-action/90'
            }`}
          >
            {isLoading ? 'Aguarde...' : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
