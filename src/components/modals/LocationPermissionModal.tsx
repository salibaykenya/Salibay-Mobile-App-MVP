import React from 'react';
import { CheckCircle2, MapPin, Navigation, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button, Modal, ModalBackdrop, ModalContent } from '../primitives';

export const LocationPermissionModal: React.FC = () => {
  const { isLocationEducationOpen, setIsLocationEducationOpen, setDeliveryLocation, showToast } = useApp();

  if (!isLocationEducationOpen) return null;

  const handleEnable = () => {
    setDeliveryLocation({
      county: 'Nairobi',
      area: 'Westlands',
      deliveryDays: 'Same Day / Tomorrow',
      feeKES: 250,
    });
    setIsLocationEducationOpen(false);
    showToast('Location Detected', 'Set to Nairobi (Westlands) with flat KES 250 shipping.', 'success');
  };

  return (
    <Modal isOpen={isLocationEducationOpen} onClose={() => setIsLocationEducationOpen(false)}>
      <ModalBackdrop />
      <ModalContent className="max-w-sm mx-auto p-5 text-center">
        <div className="w-14 h-14 rounded-3xl bg-emerald-50 text-[#22C55E] flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50/50">
          <Navigation className="w-7 h-7" />
        </div>

        <h3 className="text-base font-bold text-zinc-900">Accurate Delivery & Shipping Rates</h3>
        <p className="text-xs text-zinc-500 mt-1 mb-4">
          Enable location services so Salibay can automatically calculate your accurate courier rates and delivery timelines.
        </p>

        <div className="space-y-2.5 text-left bg-zinc-50 rounded-2xl p-3.5 mb-5 border border-zinc-100">
          <div className="flex items-center gap-2.5 text-xs text-zinc-700">
            <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
            <span>Instant Nairobi (KES 250) vs Upcountry (KES 300) rate matching</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-zinc-700">
            <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
            <span>Exact estimated delivery time & courier dispatch slot</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-zinc-700">
            <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
            <span>Nearby collection pickup points & rider handoff</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            id="enable-location-btn"
            variant="solid"
            action="primary"
            size="md"
            className="w-full justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold"
            onPress={handleEnable}
          >
            Enable Location Access
          </Button>

          <Button
            id="dismiss-location-btn"
            variant="ghost"
            size="sm"
            className="w-full justify-center text-zinc-500 hover:text-zinc-800 text-xs font-semibold"
            onPress={() => setIsLocationEducationOpen(false)}
          >
            Enter Address Manually
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
