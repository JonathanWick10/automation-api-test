declare module '@tonyshark/shared' {
  // Reexporta todo tu shared principal
  export * from 'automation-shared-test';

  // ★ Reexporta también los schemas (valores) que server-worker usa como *value*, no solo tipos:
  export { FlowVersion, Trigger, TriggerType, Action, ActionType } from 'automation-shared-test';

  // Tipos que server-worker menciona explícitamente:
  export type FlowId = import('automation-shared-test').FlowId;
  export type ProjectId = import('automation-shared-test').ProjectId;
  export type PopulatedFlow = import('automation-shared-test').PopulatedFlow;
  export type TriggerPayload = import('automation-shared-test').TriggerPayload;
  export type EventPayload = import('automation-shared-test').EventPayload;

  // Requests/DTOs que en tu lib tienen nombres distintos/forma distinta:
  // Haz el request lo bastante “amplio” para que no explote el tipado del worker:
  export interface GetFlowVersionForWorkerRequest {
    // tu forma actual:
    versionId?: string;
    // compat con server-worker:
    flowId?: string;
    type?: 'EXACT' | 'LATEST' | 'LOCKED';
  }

  // Enum de compat que el worker usa como valor
  export const GetFlowVersionForWorkerRequestType: {
    readonly EXACT: 'EXACT';
    readonly LATEST: 'LATEST';
    readonly LOCKED: 'LOCKED';
  };

  // Otras entidades que el worker espera desde aquí (pero tú las tienes en server-shared-test):
  export type WorkerMachineHealthcheckRequest = import('automation-server-shared-test').WorkerMachineHealthcheckRequest;
  export type WorkerMachineHealthcheckResponse = import('automation-server-shared-test').WorkerMachineHealthcheckResponse;
  export type MachineInformation = import('automation-server-shared-test').MachineInformation;

  // Cosas de engine que renombraron entre ramas: alias de compat
  export type ExecuteToolOperation = import('automation-shared-test').ExecuteToolOperation;
  export type ExecuteTriggerOperation = import('automation-shared-test').ExecuteTriggerOperation;
  export type ExecuteValidateAuthOperation = import('automation-shared-test').ExecuteValidateAuthOperation;
  export type ExecuteExtractPieceMetadata = import('automation-shared-test').ExecuteExtractPieceMetadata;
  export type ExecuteFlowOperation = import('automation-shared-test').ExecuteFlowOperation;
  export type BeginExecuteFlowOperation = import('automation-shared-test').BeginExecuteFlowOperation;
  export type ResumeExecuteFlowOperation = import('automation-shared-test').ResumeExecuteFlowOperation;
  export type FlowVersionState = import('automation-shared-test').FlowVersionState;

  // El worker usa ExecuteStepOperation (nombre viejo). Aliaséalo al actual.
  export type ExecuteStepOperation = ExecuteToolOperation;

  // También usa TriggerType como enum/valor
  export { TriggerType } from 'automation-shared-test';

  // Varias respuestas/requests que nombra desde aquí:
  export type FlowRun = import('automation-shared-test').FlowRun;
  export type FlowRunResponse = import('automation-shared-test').FlowRunResponse;
  export type UpdateRunProgressRequest = import('automation-server-shared-test').UpdateRunProgressRequest;
  export type SendEngineUpdateRequest = import('automation-server-shared-test').SendEngineUpdateRequest;
  export type UpdateJobRequest = import('automation-server-shared-test').UpdateJobRequest;
  export type UpdateFailureCountRequest = import('automation-server-shared-test').UpdateFailureCountRequest;
  export type GetRunForWorkerRequest = import('automation-server-shared-test').GetRunForWorkerRequest;
  export type PollJobRequest = import('automation-server-shared-test').PollJobRequest;
  export type ApQueueJob = import('automation-server-shared-test').ApQueueJob;

  // Tipos de jobs que se usan en firmas
  export type OneTimeJobData = import('automation-server-shared-test').OneTimeJobData;
  export type RepeatingJobData = import('automation-server-shared-test').RepeatingJobData;
  export type WebhookJobData = import('automation-server-shared-test').WebhookJobData;
  export type DelayedJobData = import('automation-server-shared-test').DelayedJobData;
  export type UserInteractionJobData = import('automation-server-shared-test').UserInteractionJobData;
  export type SavePayloadRequest = import('automation-server-shared-test').SavePayloadRequest;
  export type SubmitPayloadsRequest = import('automation-server-shared-test').SubmitPayloadsRequest;
  export type ResumeRunRequest = import('automation-server-shared-test').ResumeRunRequest;

  // Algunas utilidades/constantes que pide:
  export { EngineOperationType } from 'automation-server-shared-test';
  export { EXACT_VERSION_REGEX, flowStructureUtil, isNil, apId } from 'automation-shared-test';

  // Para PiecePackage / BasicPieceInformation, si el worker los trata como “valor”
  export type PiecePackage = import('automation-pieces-framework-test').PiecePackage;
  export type BasicPieceInformation = import('automation-pieces-framework-test').BasicPieceInformation;

  // Compat para errores/cuotas
  export type PlatformUsageMetric = import('automation-server-shared-test').PlatformUsageMetric;
}