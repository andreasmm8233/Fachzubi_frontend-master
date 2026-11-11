import { request } from "../api";
import { ErrorResult, SuccessResult } from "../runtimeType";

// A plan on the pricing page (managed in admin → Manage Content → Pricing Page)
export interface PricingPlan {
  _id: string;
  name: string;
  description?: string;
  price: number;
  duration: "month" | "year";
  features: string[];
  highlighted?: boolean;
  priceNote?: string;
  buttonText?: string;
  badgeText?: string;
}

export const getPricingPlans = async (): Promise<
  SuccessResult<PricingPlan[]> | ErrorResult
> => {
  return request({ url: "/pricing/", method: "get" });
};
