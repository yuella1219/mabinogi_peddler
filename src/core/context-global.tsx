import React from 'react';
import { WalletProvider, PopUpProvider, BaggageProvider, LoadingProvider, NpcNameProvider } from 'core';

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NpcNameProvider>
      <WalletProvider>
        <PopUpProvider>
          <BaggageProvider>
            <LoadingProvider>
                  {children}
            </LoadingProvider>
          </BaggageProvider>
        </PopUpProvider>
      </WalletProvider>
    </NpcNameProvider>
  );
};