import React from 'react';
import { Check, MapPin } from 'lucide-react';
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalHeader } from '../primitives';
import { useApp } from '../../context/AppContext';
import { KENYA_LOCATIONS } from '../../data/mockData';
import { formatKES } from '../../utils/formatters';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const { deliveryLocation, setDeliveryLocation, showToast } = useApp();

  const handleSelect = (loc: (typeof KENYA_LOCATIONS)[0]) => {
    setDeliveryLocation(loc);
    showToast('Delivery Destination Updated', `Now delivering to ${loc.area}, ${loc.county}`, 'success');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalBackdrop />
      <ModalContent size="sm">
        <ModalHeader>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-pink-50 text-[#E6007E]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-zinc-900">Select Delivery Destination</h3>
              <p className="text-[10px] text-zinc-500">Calculate accurate dispatch time & fee</p>
            </div>
          </div>
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody>
          <div className="space-y-1.5">
            {KENYA_LOCATIONS.map((loc, idx) => {
              const isSelected =
                deliveryLocation.county === loc.county && deliveryLocation.area === loc.area;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(loc)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#E6007E] text-white border-[#E6007E] shadow-xs'
                      : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200/80 text-zinc-900'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">{loc.area}</div>
                    <div
                      className={`text-[10px] ${
                        isSelected ? 'text-pink-100' : 'text-zinc-500'
                      }`}
                    >
                      {loc.county} County • {loc.deliveryDays}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs font-mono font-bold ${isSelected ? 'text-white' : 'text-zinc-900'}`}>
                      {formatKES(loc.feeKES)}
                    </span>
                    {isSelected && <Check className="w-4 h-4 ml-auto text-white mt-0.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
