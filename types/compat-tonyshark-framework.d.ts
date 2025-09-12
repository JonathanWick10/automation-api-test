declare module '@tonyshark/framework' {
  export * from 'automation-pieces-framework-test';

  // Si server-worker pide símbolos extra, decláralos aquí:
  export enum WebhookHandshakeStrategy {
    NONE = 'NONE',
    CUSTOM = 'CUSTOM',
  }
}
