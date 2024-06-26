export function getIsBinanceInjected(): boolean {
  const { BinanceChain } = window as unknown as {
    BinanceChain: unknown;
  };

  return !!BinanceChain;
}
