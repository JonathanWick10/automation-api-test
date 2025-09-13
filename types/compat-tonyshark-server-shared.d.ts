declare module '@tonyshark/server-shared' {
  // Reexporta todo tu server-shared
  export * from 'automation-server-shared-test';

  // Asegura símbolos usados por automation-server-worker-test:
  export { QueueName, RepeatableJobType, ScheduledJobData, PiecesSource } from 'automation-server-shared-test';

  // Algunas interfaces que automation-server-worker-test usa como tipos de valor
  export type PackageInfo = import('automation-server-shared-test').PackageInfo;
  export type ApLock = import('automation-server-shared-test').ApLock;
  export type ApSemaphore = import('automation-server-shared-test').ApSemaphore;

  // Si aparece getEngineTimeout o EngineOperationType con miembros “viejos”:
  export { EngineOperationType } from 'automation-server-shared-test';
}
