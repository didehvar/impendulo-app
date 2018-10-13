interface IIntercom {
  (action: string, options?: object): void;
  c: (...args: any) => void;
  q: any[];
}

interface Window {
  Intercom: IIntercom;
}
