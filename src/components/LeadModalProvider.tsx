import { useCallback, useMemo, useState, type ReactNode } from 'react';
import LeadFormModal from './LeadFormModal';
import { LeadModalContext } from './leadModalContext';

const LeadModalProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const openLeadForm = useCallback(() => setOpen(true), []);
    const closeLeadForm = useCallback(() => setOpen(false), []);
    const value = useMemo(() => ({ openLeadForm, closeLeadForm }), [openLeadForm, closeLeadForm]);

    return (
        <LeadModalContext.Provider value={value}>
            {children}
            <LeadFormModal open={open} onClose={closeLeadForm} />
        </LeadModalContext.Provider>
    );
};

export default LeadModalProvider;