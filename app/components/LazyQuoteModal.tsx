"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useQuoteModal } from "./QuoteModalContext";

const QuoteModal = dynamic(() => import("./QuoteModal"), { ssr: false });

// QuoteModal is a large multi-step form (photo upload, Maps autocomplete,
// PDF/email submission) that every page mounts via the root layout, but
// only a fraction of visitors ever open. Deferring both the import (code
// split via next/dynamic) and the mount itself (until the first `open()`)
// keeps its JS out of every page's initial bundle entirely, fetching it
// only the first time someone clicks "Get a Free Quote".
export default function LazyQuoteModal() {
  const { isOpen } = useQuoteModal();
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [everOpened, setEverOpened] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) setEverOpened(true);
  }

  if (!everOpened) return null;
  return <QuoteModal />;
}
