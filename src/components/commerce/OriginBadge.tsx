import React from 'react';
import { Clock, Globe, MapPin, Plane, ShieldCheck, Tag, Truck } from 'lucide-react';
import { Badge, BadgeIcon, BadgeText } from '../primitives';

export interface OriginBadgeProps {
  origin: 'local' | 'international';
  originCountry: string;
  deliveryDays?: string;
  size?: 'sm' | 'md';
}

export const LocalBadge: React.FC<{
  city?: string;
  deliveryDays?: string;
  size?: 'sm' | 'md';
}> = ({ city = 'Nairobi Hub', deliveryDays = '24-48h', size = 'sm' }) => {
  return (
    <Badge variant="subtle" action="success" size={size} className="rounded-lg">
      <BadgeIcon as={MapPin} className="text-[#22C55E]" />
      <BadgeText>🇰🇪 {city} • {deliveryDays}</BadgeText>
    </Badge>
  );
};

export const GlobalBadge: React.FC<{
  originCountry: string;
  deliveryDays?: string;
  size?: 'sm' | 'md';
}> = ({ originCountry, deliveryDays = '7-9 days', size = 'sm' }) => {
  return (
    <Badge variant="subtle" action="primary" size={size} className="rounded-lg">
      <BadgeIcon as={Plane} className="text-[#E6007E]" />
      <BadgeText>✈️ {originCountry} Direct • {deliveryDays}</BadgeText>
    </Badge>
  );
};

export const DiscountBadge: React.FC<{ percentage: number; size?: 'sm' | 'md' }> = ({
  percentage,
  size = 'sm',
}) => {
  return (
    <Badge variant="solid" action="primary" size={size} className="rounded-md">
      <BadgeIcon as={Tag} />
      <BadgeText>-{percentage}%</BadgeText>
    </Badge>
  );
};

export const DeliveryBadge: React.FC<{ date: string; size?: 'sm' | 'md' }> = ({
  date,
  size = 'sm',
}) => {
  return (
    <Badge variant="subtle" action="secondary" size={size} className="rounded-lg">
      <BadgeIcon as={Truck} />
      <BadgeText>Est: {date}</BadgeText>
    </Badge>
  );
};

export const OriginBadge: React.FC<OriginBadgeProps> = ({
  origin,
  originCountry,
  deliveryDays,
  size = 'sm',
}) => {
  if (origin === 'local') {
    return <LocalBadge city="Nairobi Local" deliveryDays={deliveryDays} size={size} />;
  }
  return <GlobalBadge originCountry={originCountry} deliveryDays={deliveryDays} size={size} />;
};
