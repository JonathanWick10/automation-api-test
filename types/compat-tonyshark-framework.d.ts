declare module '@tonyshark/framework' {
  export * from 'automation-pieces-framework-test';

  // Si automation-server-worker-test pide símbolos extra, decláralos aquí:
  export enum WebhookHandshakeStrategy {
    NONE = 'NONE',
    CUSTOM = 'CUSTOM',
  }
}
