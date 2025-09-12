// Reexporta todo el framework hacia el nombre que espera server-worker
declare module '@tonyshark/framework' {
  export * from 'automation-pieces-framework-test';
}

// Mapea tipos que server-worker espera desde @tonyshark/shared
declare module '@tonyshark/shared' {
  // Tipos “modelo” desde tu shared
  export type ProjectId = import('automation-shared-test').ProjectId;
  export type FlowVersion = import('automation-shared-test').FlowVersion;
  export type TriggerPayload = import('automation-shared-test').TriggerPayload;
  export type EventPayload = import('automation-shared-test').EventPayload;
  export type PopulatedFlow = import('automation-shared-test').PopulatedFlow;
  export type FlowId = import('automation-shared-test').FlowId;

  // Tipos de “server shared” que también usa server-worker
  export type PackageInfo = import('automation-server-shared-test').PackageInfo;
  export type WorkerMachineHealthcheckRequest = import('automation-server-shared-test').WorkerMachineHealthcheckRequest;
  export type WorkerMachineHealthcheckResponse = import('automation-server-shared-test').WorkerMachineHealthcheckResponse;
  export type MachineInformation = import('automation-server-shared-test').MachineInformation;

  // Y por si acaso, reexporta todo tu shared
  export * from 'automation-shared-test';
}
