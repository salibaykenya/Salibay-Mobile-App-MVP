import React from 'react';
import { CheckCircle2, FileCheck, Plane, ShieldCheck } from 'lucide-react';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  Button,
} from '../primitives';
import { Product } from '../../types';
import { formatKES } from '../../utils/formatters';

interface LandedCostExplainerProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const LandedCostExplainer: React.FC<LandedCostExplainerProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const isLocal = product.origin === 'local';
  const baseItemPrice =
    product.priceKES - product.importDutyKES - product.shippingFeeKES - product.insuranceFeeKES;

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper />

        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-pink-50 text-[#E6007E]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">Salibay Landed Cost Guarantee</h3>
              <p className="text-[11px] text-zinc-500">100% Transparent • Zero Unexpected Fees</p>
            </div>
          </div>
        </div>

        {/* Pricing Breakdown Card */}
        <div className="mt-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70 space-y-2.5">
          <div className="flex justify-between text-xs text-zinc-600">
            <span>Original Item Price ({product.originCountry})</span>
            <span className="font-medium text-zinc-900 font-mono">
              {formatKES(Math.max(baseItemPrice, product.priceKES * 0.8))}
            </span>
          </div>

          {!isLocal && (
            <>
              <div className="flex justify-between text-xs text-zinc-600">
                <span className="flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-zinc-500" />
                  Air Cargo Express Freight
                </span>
                <span className="font-medium text-zinc-900 font-mono">
                  {formatKES(product.shippingFeeKES || 3500)}
                </span>
              </div>

              <div className="flex justify-between text-xs text-zinc-600">
                <span className="flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                  KRA Customs & Import Duties (Prepaid)
                </span>
                <span className="font-medium text-zinc-900 font-mono">
                  {formatKES(product.importDutyKES || 4500)}
                </span>
              </div>

              <div className="flex justify-between text-xs text-zinc-600">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  Transit Loss & Damage Insurance
                </span>
                <span className="font-medium text-emerald-600 font-semibold">FREE</span>
              </div>
            </>
          )}

          {isLocal && (
            <div className="flex justify-between text-xs text-zinc-600">
              <span>Local Nairobi Hub Dispatch</span>
              <span className="font-medium text-zinc-900 font-mono">
                {formatKES(product.shippingFeeKES || 250)}
              </span>
            </div>
          )}

          <div className="pt-2 border-t border-zinc-200 flex justify-between items-baseline font-bold text-sm text-zinc-900">
            <span>Total Landed Price</span>
            <span className="text-base text-zinc-950 font-mono">{formatKES(product.priceKES)}</span>
          </div>
        </div>

        {/* Guarantees List */}
        <div className="mt-4 space-y-2 text-xs text-zinc-600">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong className="text-zinc-900">Guaranteed No KRA Surprise Fees:</strong> We pay all
              import taxes, clearing fees, and customs duties at JKIA Airport upfront.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong className="text-zinc-900">Pesapal Secured Payments:</strong> Full buyer
              protection with encrypted M-Pesa, card, and Pay on Delivery options.
            </p>
          </div>
        </div>

        <Button
          size="md"
          variant="solid"
          action="secondary"
          isFullWidth
          onClick={onClose}
          className="mt-5"
        >
          Understood & Close
        </Button>
      </ActionsheetContent>
    </Actionsheet>
  );
};
