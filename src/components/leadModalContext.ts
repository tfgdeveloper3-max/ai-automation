import { createContext, useContext } from 'react';

export interface LeadModalContextValue {
    openLeadForm: () => void;
    closeLeadForm: () => void;
}

export const LeadModalContext = createContext<LeadModalContextValue | null>(null);

const FALLBACK: LeadModalContextValue = {
    openLeadForm: () =>
        console.warn('Lead form: <LeadModalProvider> is missing. Wrap <Routes> with it in App.tsx.'),
    closeLeadForm: () => { },
};

export function useLeadModal(): LeadModalContextValue {
    return useContext(LeadModalContext) ?? FALLBACK;
}