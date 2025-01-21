import React from 'react';
import { WalletProvider, PopUpProvider, BaggageProvider, LoadingProvider, NpcNameProvider } from 'core';

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WalletProvider>
      <PopUpProvider>
        <BaggageProvider>
          <LoadingProvider>
            <NpcNameProvider>
                {children}
            </NpcNameProvider>
          </LoadingProvider>
        </BaggageProvider>
      </PopUpProvider>
    </WalletProvider>
  );
};