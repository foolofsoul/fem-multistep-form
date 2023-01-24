import type { Component } from 'vue';

export interface IStepComponent {
  [key: string]: Component;
}

export interface IPlan {
  icon: string;
  title: string;
  price: string;
}

export type IPlans = Record<EPlans, IPlan>;
export type IAddOns = Record<
  EAddOns,
  { active: boolean; title: string; price: number }
>;

export enum EBillingOptions {
  monthly = 'MONTHLY',
  yearly = 'YEARLY',
}

export enum EBillingShort {
  'MONTHLY' = 'mo',
  'YEARLY' = 'yr',
}

export enum EPlans {
  arcade,
  advanced,
  pro,
}

export enum EAddOns {
  SERVICE = 'service',
  STORAGE = 'storage',
  PROFILE = 'profile',
}
