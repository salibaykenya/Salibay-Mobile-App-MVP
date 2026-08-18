import React from 'react';
import { Check, Clock, MapPin, PackageCheck, Plane, Truck } from 'lucide-react';
import { OrderTimelineEvent } from '../../types';

interface OrderTimelineProps {
  events: OrderTimelineEvent[];
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ events }) => {
  return (
    <div className="space-y-4">
      {events.map((event, index) => {
        const isLast = index === events.length - 1;

        return (
          <div key={event.id} className="relative flex gap-3">
            {/* Timeline Vertical Line */}
            {!isLast && (
              <div
                className={`absolute top-6 left-3 w-0.5 -bottom-4 ${
                  event.completed ? 'bg-zinc-900' : 'bg-zinc-200'
                }`}
              />
            )}

            {/* Icon Node */}
            <div
              className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs transition-all ${
                event.current
                  ? 'bg-zinc-900 text-white ring-4 ring-zinc-100 shadow-xs'
                  : event.completed
                  ? 'bg-zinc-900 text-white'
                  : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
              }`}
            >
              {event.completed ? (
                <Check className="w-3.5 h-3.5" />
              ) : event.current ? (
                <Clock className="w-3.5 h-3.5 animate-pulse" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
              )}
            </div>

            {/* Event Content */}
            <div className="flex-1 pb-2">
              <div className="flex items-baseline justify-between gap-2">
                <h4
                  className={`text-xs font-bold ${
                    event.current ? 'text-zinc-900' : event.completed ? 'text-zinc-800' : 'text-zinc-400'
                  }`}
                >
                  {event.title}
                </h4>
                <span className="text-[10px] font-mono text-zinc-400 shrink-0">{event.timestamp}</span>
              </div>

              <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{event.description}</p>

              {event.location && (
                <div className="inline-flex items-center gap-1 mt-1 text-[10px] font-medium text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-md">
                  <MapPin className="w-3 h-3 text-zinc-400" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
