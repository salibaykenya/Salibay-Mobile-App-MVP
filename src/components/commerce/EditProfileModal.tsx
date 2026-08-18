import React, { useState } from 'react';
import {
  Camera,
  Check,
  Image as ImageIcon,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  User,
  X,
} from 'lucide-react';
import {
  Avatar,
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

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
];

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
];

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { shippingAddress, setShippingAddress, setDeliveryLocation, showToast } = useApp();

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [phone, setPhone] = useState(shippingAddress.phone);
  const [email, setEmail] = useState(shippingAddress.email);
  const [avatarUrl, setAvatarUrl] = useState(shippingAddress.avatarUrl || AVATAR_PRESETS[0]);
  const [county, setCounty] = useState(shippingAddress.county || 'Nairobi');
  const [townCity, setTownCity] = useState(shippingAddress.townCity || 'Nairobi');
  const [estateBuilding, setEstateBuilding] = useState(shippingAddress.estateBuilding || '');
  const [houseUnit, setHouseUnit] = useState(shippingAddress.houseUnit || '');
  const [showCustomUrlInput, setShowCustomUrlInput] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Synchronize initial values when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFullName(shippingAddress.fullName);
      setPhone(shippingAddress.phone);
      setEmail(shippingAddress.email);
      setAvatarUrl(shippingAddress.avatarUrl || AVATAR_PRESETS[0]);
      setCounty(shippingAddress.county || 'Nairobi');
      setTownCity(shippingAddress.townCity || 'Nairobi');
      setEstateBuilding(shippingAddress.estateBuilding || '');
      setHouseUnit(shippingAddress.houseUnit || '');
    }
  }, [isOpen, shippingAddress]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
          showToast('Image Uploaded', 'New profile picture preview loaded.', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customImageUrl.trim()) {
      setAvatarUrl(customImageUrl.trim());
      setShowCustomUrlInput(false);
      setCustomImageUrl('');
      showToast('Photo URL Applied', 'Custom image selected.', 'info');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      showToast('Validation Error', 'Full Name is required', 'error');
      return;
    }
    if (!phone.trim()) {
      showToast('Validation Error', 'Phone number is required for delivery & M-Pesa updates', 'error');
      return;
    }

    const updatedAddress = {
      ...shippingAddress,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      avatarUrl: avatarUrl.trim(),
      county,
      townCity: townCity.trim() || 'Nairobi',
      estateBuilding: estateBuilding.trim(),
      houseUnit: houseUnit.trim(),
    };

    setShippingAddress(updatedAddress);

    // Also sync the delivery destination if county/estate changed
    if (estateBuilding.trim()) {
      setDeliveryLocation({
        county,
        area: estateBuilding.trim(),
        deliveryDays: county === 'Nairobi' ? '1 day' : '2-3 days',
        feeKES: county === 'Nairobi' ? 250 : 350,
      });
    }

    showToast('Profile Updated', 'Your profile info & delivery details have been saved.', 'success');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalBackdrop />
      <ModalContent size="md" className="max-h-[90vh] flex flex-col p-0 overflow-hidden rounded-3xl">
        {/* Header */}
        <ModalHeader className="p-4 border-b border-zinc-100 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-50 text-[#E6007E]">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">Edit Profile Information</h3>
              <p className="text-[10px] text-zinc-500">Update your avatar, M-Pesa number & default delivery details</p>
            </div>
          </div>
          <ModalCloseButton />
        </ModalHeader>

        {/* Scrollable Form Body */}
        <ModalBody className="p-4 overflow-y-auto flex-1 space-y-4 bg-zinc-50/60">
          <form id="edit-profile-form" onSubmit={handleSave} className="space-y-4">
            {/* Avatar Selection Section */}
            <div className="bg-white p-3.5 rounded-2xl border border-zinc-200/80 shadow-2xs space-y-3">
              <label className="text-[11px] font-bold text-zinc-900 flex items-center justify-between">
                <span>Profile Photo</span>
                <span className="text-[10px] font-normal text-zinc-500">Tap a preset or upload</span>
              </label>

              <div className="flex items-center gap-4">
                {/* Active Avatar Preview with Camera badge */}
                <div className="relative group shrink-0">
                  <Avatar
                    size="xl"
                    name={fullName || 'David'}
                    src={avatarUrl}
                    className="border-2 border-[#E6007E] shadow-sm w-16 h-16"
                  />
                  <label
                    htmlFor="profile-avatar-upload"
                    className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-zinc-900 text-white hover:bg-[#E6007E] cursor-pointer shadow-md transition-colors"
                    title="Upload photo from device"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <input
                      id="profile-avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Avatar Presets Grid */}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-zinc-500 mb-1.5 font-medium">Choose an avatar:</div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {AVATAR_PRESETS.map((preset, idx) => {
                      const isSelected = avatarUrl === preset;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatarUrl(preset)}
                          className={`relative shrink-0 w-9 h-9 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#E6007E] scale-105 shadow-xs ring-2 ring-[#E6007E]/30'
                              : 'border-zinc-200 hover:border-zinc-400 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <img src={preset} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
                          {isSelected && (
                            <div className="absolute inset-0 bg-[#E6007E]/30 flex items-center justify-center">
                              <Check className="w-3 h-3 text-white stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Image Options Row */}
                  <div className="flex items-center gap-2 mt-2">
                    <label
                      htmlFor="profile-avatar-upload-btn"
                      className="text-[10px] text-zinc-600 hover:text-[#E6007E] font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload file</span>
                      <input
                        id="profile-avatar-upload-btn"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    <span className="text-zinc-300">•</span>

                    <button
                      type="button"
                      onClick={() => setShowCustomUrlInput((v) => !v)}
                      className="text-[10px] text-zinc-600 hover:text-[#E6007E] font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <ImageIcon className="w-3 h-3" />
                      <span>Photo URL</span>
                    </button>

                    {avatarUrl && (
                      <>
                        <span className="text-zinc-300">•</span>
                        <button
                          type="button"
                          onClick={() => setAvatarUrl('')}
                          className="text-[10px] text-rose-500 hover:text-rose-700 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Custom Image URL Form toggle */}
              {showCustomUrlInput && (
                <div className="pt-2 border-t border-zinc-100 flex items-center gap-2">
                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="flex-1 px-3 py-1.5 bg-zinc-100 text-xs text-zinc-900 rounded-xl border border-zinc-200 focus:bg-white focus:border-[#E6007E] outline-hidden"
                  />
                  <Button
                    size="xs"
                    variant="solid"
                    action="primary"
                    type="button"
                    onClick={handleApplyCustomUrl}
                  >
                    Set URL
                  </Button>
                </div>
              )}
            </div>

            {/* Personal & Contact Details */}
            <div className="bg-white p-3.5 rounded-2xl border border-zinc-200/80 shadow-2xs space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-700">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <Input size="sm" variant="outline">
                  <InputField
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. David Ochieng"
                    required
                  />
                </Input>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-zinc-700">
                    Phone Number (Safaricom / M-Pesa) <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[9px] font-bold text-[#22C55E] flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3" /> STK Prompt
                  </span>
                </div>
                <Input size="sm" variant="outline">
                  <InputField
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 712 345 678"
                    required
                  />
                </Input>
                <p className="text-[10px] text-zinc-400">Used for courier delivery PIN and Lipa na M-Pesa checkout</p>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-700">Email Address</label>
                <Input size="sm" variant="outline">
                  <InputField
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="david.ochieng@example.com"
                  />
                </Input>
              </div>
            </div>

            {/* Default Shipping Address */}
            <div className="bg-white p-3.5 rounded-2xl border border-zinc-200/80 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-zinc-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E6007E]" />
                  <span>Default Delivery Location</span>
                </label>
                <span className="text-[9px] text-zinc-400">Kenya</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-zinc-600">County</label>
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full px-2.5 py-1.8 bg-zinc-50 text-xs text-zinc-900 rounded-xl border border-zinc-200 focus:bg-white focus:border-[#E6007E] outline-hidden"
                  >
                    {KENYA_COUNTIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-zinc-600">Town / City</label>
                  <Input size="sm" variant="outline">
                    <InputField
                      value={townCity}
                      onChange={(e) => setTownCity(e.target.value)}
                      placeholder="e.g. Nairobi"
                    />
                  </Input>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-zinc-600">
                  Estate / Building / Street Address
                </label>
                <Input size="sm" variant="outline">
                  <InputField
                    value={estateBuilding}
                    onChange={(e) => setEstateBuilding(e.target.value)}
                    placeholder="e.g. The Oval Building, Ring Road Parklands"
                  />
                </Input>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-zinc-600">
                  House / Unit / Office (Optional)
                </label>
                <Input size="sm" variant="outline">
                  <InputField
                    value={houseUnit}
                    onChange={(e) => setHouseUnit(e.target.value)}
                    placeholder="e.g. Suite 502, 5th Floor"
                  />
                </Input>
              </div>
            </div>
          </form>
        </ModalBody>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-zinc-100 flex items-center justify-end gap-2.5">
          <Button
            size="sm"
            variant="outline"
            action="default"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant="solid"
            action="primary"
            type="submit"
            form="edit-profile-form"
            className="px-5 shadow-sm shadow-pink-500/20"
          >
            Save Changes
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
