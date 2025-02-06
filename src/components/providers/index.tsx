"use client";

import { queryClient } from "@/configs/reactQueryConfig";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../ui/sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
    </QueryClientProvider>
  );
};

export default Providers;
