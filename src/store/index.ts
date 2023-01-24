import {
  type IAddOns,
  EPlans,
  EBillingOptions,
  EBillingShort,
  EAddOns,
} from '@/types';
import { defineStore } from 'pinia';

function getBillingPrice(price: number): number {
  return useDataStore().getBillingOption ? price * 10 : price;
}

export const useDataStore = defineStore('data', {
  state: () => {
    return {
      currentStep: 1,
      totalSteps: 4,
      billingOption: EBillingOptions.yearly,
      plan: EPlans.arcade,
      addOns: <IAddOns>{
        service: {
          active: false,
          title: 'Online service',
          price: 1,
        },
        storage: {
          active: false,
          title: 'Larger storage',
          price: 2,
        },
        profile: {
          active: false,
          title: 'Customizable Profile',
          price: 2,
        },
      },
      planPrices: {
        [EPlans.arcade]: 9,
        [EPlans.advanced]: 12,
        [EPlans.pro]: 15,
      },
    };
  },
  getters: {
    getBillingOption: (state) =>
      state.billingOption === EBillingOptions.yearly || false,
    getShortBilingStr: (state): string => EBillingShort[state.billingOption],
    getPlan: (state) => state.plan,
    getAddOns: (state) =>
      Object.entries(state.addOns).reduce((acc, [key, addOn]) => {
        const price = getBillingPrice(state.addOns[key].price);
        return { ...acc, [key]: { ...addOn, price } };
      }, {} as IAddOns),
    getSelectedAddOns: (state) =>
      Object.entries(state.addOns).reduce((acc, [key, addOn]) => {
        if (addOn.active) {
          const price = getBillingPrice(state.addOns[key].price);
          return { ...acc, [key]: { ...addOn, price } };
        }

        return acc;
      }, {} as IAddOns),
    getTotalPrice: (state) =>
      getBillingPrice(state.planPrices[state.plan]) +
      Object.values(state.addOns).reduce((acc, addOn) => {
        return addOn.active ? acc + getBillingPrice(addOn.price) : acc;
      }, 0),
    getFormattedPlanPrice: (state) => {
      const billingStr = EBillingShort[state.billingOption];
      const planPrices: Record<number, number> = { ...state.planPrices };

      for (let i = 0; i < Object.keys(planPrices).length; i++) {
        if (state.billingOption === EBillingOptions.yearly) {
          planPrices[i] *= 10;
        }
      }

      return Object.keys(EPlans).reduce((acc, key, idx) => {
        return { ...acc, [idx]: `$${planPrices[idx]}/${billingStr}` };
      }, {}) as Record<number, string>;
    },
  },

  actions: {
    setBillingOption(bool: boolean) {
      this.billingOption = bool
        ? EBillingOptions.yearly
        : EBillingOptions.monthly;
    },

    setPlan(plan: EPlans) {
      this.plan = plan;
    },

    setAddOn(addOn: EAddOns) {
      this.addOns[addOn].active = !this.addOns[addOn].active;
    },

    handleNextStep(step: number | undefined) {
      if (step && step <= this.totalSteps) {
        this.currentStep = step;
      } else {
        if (this.currentStep - 1 <= this.totalSteps) {
          this.currentStep += 1;
        }
      }
    },

    handleGoBack() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },

    setTotalSteps(totalSteps) {
      this.totalSteps = totalSteps;
    },
  },
});
