interface IGlobalBitKeep {
  removeAllListeners: () => void;
  request: (args: unknown) => unknown;
  isBitKeep: boolean;
}

export const getIsBitKeep = (bitKeep: any): bitKeep is IGlobalBitKeep => {
  return !!bitKeep?.isBitKeep || !!bitKeep?.isBitKeepChrome;
};

export const getIsBitKeepInjected = (): boolean => {
  const { bitkeep } = window as any;
  const provider = bitkeep && bitkeep?.ethereum;
  return !!provider;
};

export const getBitKeepProvider = (): IGlobalBitKeep | undefined => {
  const { bitkeep } = window as any;
  const provider = bitkeep && bitkeep?.ethereum;
  return provider;
};
