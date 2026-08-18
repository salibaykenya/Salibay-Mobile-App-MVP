import React from 'react';
import { Clock, Globe, MapPin, Plane, ShieldCheck, Tag, Truck, Zap } from 'lucide-react';
import { Badge, BadgeIcon, BadgeText } from '../primitives';

export interface OriginBadgeProps {
  origin: 'local' | 'international';
  originCountry: string;
  deliveryDays?: string;
  size?: 'sm' | 'md';
}

/**
 * Top-left Image Tag for Local Products (Matches Salibay website "Local Ready" black pill)
 */
export const LocalReadyTag: React.FC<{ size?: 'sm' | 'md'; className?: string }> = ({
  size = 'sm',
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center font-bold tracking-tight rounded-md bg-zinc-900 text-white shadow-2xs ${
        size === 'sm' ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[10px]'
      } ${className}`}
    >
      Local Ready
    </span>
  );
};

/**
 * Top-left Image Tag for Global Products (Matches Salibay website "Global Ready" pink pill)
 */
export const GlobalReadyTag: React.FC<{ size?: 'sm' | 'md'; className?: string }> = ({
  size = 'sm',
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center font-bold tracking-tight rounded-md bg-[#E6007E] text-white shadow-2xs ${
        size === 'sm' ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[10px]'
      } ${className}`}
    >
      Global Ready
    </span>
  );
};

/**
 * Clean Single-Icon Routing Badge (e.g., "Ships from Dubai", "Ships from UK", "Ships from USA", "Ships from Kenya")
 */
export const RoutingBadge: React.FC<{
  origin: 'local' | 'international';
  originCountry: string;
  size?: 'sm' | 'md';
  className?: string;
}> = ({ origin, originCountry, size = 'sm', className = '' }) => {
  const isLocal = origin === 'local';
  const label = isLocal ? 'Ships from Kenya' : `Ships from ${originCountry || 'Global'}`;

  return (
    <div
      className={`inline-flex items-center gap-1 font-semibold rounded-md ${
        isLocal
          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
          : 'bg-pink-50 text-[#E6007E] border border-pink-200/80'
      } ${size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs'} ${className}`}
    >
      {isLocal ? (
        <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
      ) : (
        <Plane className="w-3 h-3 text-[#E6007E] shrink-0" />
      )}
      <span className="truncate">{label}</span>
    </div>
  );
};

/**
 * Website-Matched Routing Metadata List
 */
export const RoutingInfo: React.FC<{
  origin: 'local' | 'international';
  originCountry: string;
  estDeliveryDays?: string;
  className?: string;
}> = ({ origin, originCountry, estDeliveryDays, className = '' }) => {
  const isLocal = origin === 'local';
  const countryName = isLocal ? 'Kenya' : originCountry || 'Global Hub';

  return (
    <div className={`space-y-0.5 text-[10px] text-zinc-500 leading-tight ${className}`}>
      <div className="flex items-center gap-1 font-medium text-zinc-700 truncate">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isLocal ? 'bg-emerald-500' : 'bg-[#E6007E]'}`} />
        <span className="truncate">Ships from {countryName}</span>
      </div>
      {estDeliveryDays && (
        <div className="text-zinc-500 truncate pl-2.5">
          Est: {estDeliveryDays}
        </div>
      )}
    </div>
  );
};

export const LocalBadge: React.FC<{
  text?: string;
  size?: 'sm' | 'md';
}> = ({ text = 'Ships from Kenya', size = 'sm' }) => {
  return (
    <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold">
      <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
      <span className="truncate">{text}</span>
    </div>
  );
};

export const GlobalBadge: React.FC<{
  originCountry?: string;
  deliveryDays?: string;
  size?: 'sm' | 'md';
}> = ({ originCountry = 'Global', deliveryDays, size = 'sm' }) => {
  return (
    <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-pink-50 text-[#E6007E] border border-pink-200 text-[10px] font-semibold">
      <Plane className="w-3 h-3 text-[#E6007E] shrink-0" />
      <span className="truncate">Ships from {originCountry}</span>
    </div>
  );
};

export const DiscountBadge: React.FC<{ percentage: number; size?: 'sm' | 'md' }> = ({
  percentage,
  size = 'sm',
}) => {
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-zinc-900 text-white rounded text-[9px] font-bold shadow-2xs">
      <Tag className="w-2.5 h-2.5" />
      <span>-{percentage}%</span>
    </span>
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
  return (
    <RoutingBadge
      origin={origin}
      originCountry={originCountry}
      size={size}
    />
  );
};
