import React, { useState } from 'react';
import { Check, MapPin, Plus, Search, Sparkles, Trash2, X } from 'lucide-react';
import {
  Button,
  Card,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '../primitives';
import { useApp } from '../../context/AppContext';
import { KENYA_LOCATIONS } from '../../data/mockData';
import { formatKES } from '../../utils/formatters';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KENYA_COUNTIES = [
  'Nairobi',
  'Kiambu',
  'Mombasa',
  'Nakuru',
  'Kisumu',
  'Uasin Gishu (Eldoret)',
  'Machakos',
  'Kajiado',
  'Kilifi',
  'Nyeri',
  'Meru',
  'Kakamega',
  'Kericho',
  'Laikipia',
  'Other County',
];

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const { deliveryLocation, setDeliveryLocation, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'preset' | 'custom'>('preset');
  const [searchQuery, setSearchQuery] = useState('');

  // Custom location state
  const [customCounty, setCustomCounty] = useState('Nairobi');
  const [customArea, setCustomArea] = useState('');
  const [customEstate, setCustomEstate] = useState('');
  const [customList, setCustomList] = useState<
    Array<{ county: string; area: string; deliveryDays: string; feeKES: number }>
  >([]);

  // Calculate estimated fee for custom entry
  const getEstimatedRate = (county: string) => {
    if (county === 'Nairobi') {
      return { feeKES: 250, days: '1 day (Fast Dispatch)' };
    }
    if (['Kiambu', 'Machakos', 'Kajiado'].includes(county)) {
      return { feeKES: 300, days: '1-2 days' };
    }
    return { feeKES: 450, days: '2-3 days (Upcountry Courier)' };
  };

  const allLocations = [...customList, ...KENYA_LOCATIONS];

  const filteredLocations = allLocations.filter(
    (loc) =>
      loc.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.county.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (loc: {
    county: string;
    area: string;
    deliveryDays: string;
    feeKES: number;
  }) => {
    setDeliveryLocation(loc);
    showToast('Delivery Destination Updated', `Now delivering to ${loc.area}, ${loc.county}`, 'success');
    onClose();
  };

  const handleAddCustomLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customArea.trim()) {
      showToast('Validation Error', 'Please enter your town, area, or neighborhood', 'warning');
      return;
    }

    const { feeKES, days } = getEstimatedRate(customCounty);
    const newLocation = {
      county: customCounty,
      area: customEstate.trim() ? `${customArea.trim()} (${customEstate.trim()})` : customArea.trim(),
      deliveryDays: days,
      feeKES,
    };

    setCustomList((prev) => [newLocation, ...prev]);
    setDeliveryLocation(newLocation);
    showToast(
      'Custom Location Added',
      `Delivering to ${newLocation.area}, ${newLocation.county} (Est. ${formatKES(feeKES)})`,
      'success'
    );
    setCustomArea('');
    setCustomEstate('');
    setActiveTab('preset');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalBackdrop />
      <ModalContent size="sm" className="max-h-[85vh] flex flex-col p-0 overflow-hidden">
        <ModalHeader className="p-4 border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-50 text-[#E6007E]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-zinc-900">Select Delivery Destination</h3>
              <p className="text-[10px] text-zinc-500">
                Current: <strong className="text-zinc-800">{deliveryLocation.area}, {deliveryLocation.county}</strong>
              </p>
            </div>
          </div>
          <ModalCloseButton />
        </ModalHeader>

        {/* Tab switcher */}
        <div className="flex border-b border-zinc-100 bg-zinc-50/80 px-4 pt-2">
          <button
            onClick={() => setActiveTab('preset')}
            className={`pb-2 text-xs font-bold transition-colors cursor-pointer border-b-2 px-2 ${
              activeTab === 'preset'
                ? 'border-[#E6007E] text-[#E6007E]'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            Delivery Areas
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`pb-2 text-xs font-bold transition-colors cursor-pointer border-b-2 px-2 flex items-center gap-1 ${
              activeTab === 'custom'
                ? 'border-[#E6007E] text-[#E6007E]'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Area</span>
          </button>
        </div>

        <ModalBody className="p-4 overflow-y-auto flex-1 space-y-3">
          {activeTab === 'preset' ? (
            <div className="space-y-3">
              {/* Search filter input */}
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search estate, town or county..."
                  className="w-full pl-8.5 pr-8 py-2 bg-zinc-100 focus:bg-white text-xs text-zinc-900 placeholder:text-zinc-400 rounded-xl border border-zinc-200 focus:border-[#E6007E] focus:ring-1 focus:ring-[#E6007E] outline-hidden"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 p-1 text-zinc-400 hover:text-zinc-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Location options list */}
              <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-0.5">
                {filteredLocations.map((loc, idx) => {
                  const isSelected =
                    deliveryLocation.county === loc.county && deliveryLocation.area === loc.area;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(loc)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#E6007E] text-white border-[#E6007E] shadow-xs'
                          : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200/70 text-zinc-900'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-xs font-bold truncate">{loc.area}</div>
                        <div
                          className={`text-[10px] ${
                            isSelected ? 'text-pink-100' : 'text-zinc-500'
                          }`}
                        >
                          {loc.county} County • {loc.deliveryDays}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          className={`text-xs font-mono font-bold whitespace-nowrap ${
                            isSelected ? 'text-white' : 'text-zinc-900'
                          }`}
                        >
                          {formatKES(loc.feeKES)}
                        </span>
                        {isSelected && <Check className="w-4 h-4 ml-auto text-white mt-0.5" />}
                      </div>
                    </button>
                  );
                })}

                {filteredLocations.length === 0 && (
                  <div className="text-center py-6 space-y-2">
                    <p className="text-xs text-zinc-500">
                      No matching area found for "{searchQuery}"
                    </p>
                    <Button
                      size="xs"
                      variant="solid"
                      action="primary"
                      onClick={() => {
                        setCustomArea(searchQuery);
                        setActiveTab('custom');
                      }}
                      leftIcon={<Plus className="w-3 h-3" />}
                    >
                      Add "{searchQuery}" as Custom Location
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Custom Location Form */
            <form onSubmit={handleAddCustomLocation} className="space-y-3">
              <div className="p-2.5 bg-pink-50/70 rounded-xl border border-pink-100 text-xs text-zinc-700 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#E6007E] shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  Enter any neighborhood, estate, or town in Kenya. We deliver countrywide via Salibay Last-Mile Dispatch and Wells Fargo courier.
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-700">County</label>
                <select
                  value={customCounty}
                  onChange={(e) => setCustomCounty(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-xs text-zinc-900 rounded-xl border border-zinc-200 focus:border-[#E6007E] focus:ring-1 focus:ring-[#E6007E] outline-hidden"
                >
                  {KENYA_COUNTIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-700">
                  Town / Area / Neighborhood <span className="text-rose-500">*</span>
                </label>
                <Input size="sm" variant="outline">
                  <InputField
                    value={customArea}
                    onChange={(e) => setCustomArea(e.target.value)}
                    placeholder="e.g. Rongai, Syokimau, Garden Estate, Kitengela"
                    required
                  />
                </Input>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-700">
                  Estate / Building / Landmark (Optional)
                </label>
                <Input size="sm" variant="outline">
                  <InputField
                    value={customEstate}
                    onChange={(e) => setCustomEstate(e.target.value)}
                    placeholder="e.g. Near Tuskys, House #4B, Alpha Plaza"
                  />
                </Input>
              </div>

              {/* Rate Preview Card */}
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 block">Estimated Delivery Rate</span>
                  <span className="font-bold text-zinc-900">
                    {getEstimatedRate(customCounty).days}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-extrabold text-[#E6007E]">
                    {formatKES(getEstimatedRate(customCounty).feeKES)}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  action="default"
                  type="button"
                  onClick={() => setActiveTab('preset')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="solid"
                  action="primary"
                  type="submit"
                  className="flex-1"
                >
                  Save & Deliver Here
                </Button>
              </div>
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
