interface IGlobalMirage {
  request: (args: unknown) => unknown;
  isMirage: boolean;
}

export const getMirage = (mirage: any): mirage is IGlobalMirage => {
  return !!mirage?.isMirage;
};

export const getMirageProvider = () => {
  const provider = (window as any)?.mirage;
  if (!getMirage(provider)) {
    throw new Error("Mirage wallet isn't installed");
  }

  return provider;
};
