import { create } from "zustand";

export const useSignInStore = create((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
  msisdn: "",
  setMsisdn: (msisdn) => set({ msisdn }),
  password: "",
  setPassword: (password) => set({ password }),
}));
