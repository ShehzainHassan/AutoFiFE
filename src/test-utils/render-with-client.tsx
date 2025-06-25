import React from "react";
import { render } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactElement } from "react";
import { createTestQueryClient } from "@/providers/test-query-client";

export const renderWithClient = (ui: ReactElement) => {
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};
