/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare const __BUILD_TIME__: string;
declare const __BUILD_DATE__: string;

declare global {
  type LenisInstance = InstanceType<typeof import('lenis').default>;
  type LenisWindow = Omit<Window, 'lenis'> & {
    lenis?: LenisInstance;
  };
}

export {};
