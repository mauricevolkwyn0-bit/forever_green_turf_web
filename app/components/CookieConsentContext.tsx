"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { readConsent } from "./cookieConsent";

type CookieConsentContextValue = {
  isOpen: boolean;
  expanded: boolean;
  open: (expanded?: boolean) => void;
  close: () => void;
  setExpanded: (expanded: boolean) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Reads browser storage, which only exists on the client — can't be
    // resolved during the initial render without risking an SSR mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!readConsent()) setIsOpen(true);
  }, []);

  function open(startExpanded = false) {
    setExpanded(startExpanded);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <CookieConsentContext.Provider value={{ isOpen, expanded, open, close, setExpanded }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return ctx;
}
