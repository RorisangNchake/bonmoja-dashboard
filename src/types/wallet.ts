import type { currency } from "./currency.type";

export interface IWallet {
    balance: number;
    currency: currency;
}