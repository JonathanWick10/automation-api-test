// types/automation-server-worker-test.d.ts
declare module 'automation-server-worker-test' {
  import type { FastifyInstance, FastifyBaseLogger } from 'fastify'
  import type { Server as IOServer } from 'socket.io'
  import type { PieceMetadata } from 'automation-pieces-framework-test'
  import type {
    PiecesSource,
    ScheduleOptions,
    WebhookHandshakeResponse,
  } from 'automation-shared-test'

  export type EngineHelperResponse<T = unknown> = {
    result: T
    status?: 'OK' | 'ERROR'
    error?: unknown
    standardOutput?: string
    standardError?: string
  }

  export type EngineHelperValidateAuthResult = {
    valid: boolean
    error?: string
  }

  export type EngineHelperPropResult = {
    options?: unknown
  }

  export type EngineHelperExtractPieceInformation = PieceMetadata

  export type EngineHelperTriggerResult<T = unknown> = {
    success: boolean
    message?: string
    output: unknown[]
    listeners: Array<{
      event: string
      identifierValue: string
      events?: string[]
    }>
    scheduleOptions: ScheduleOptions
    response?: WebhookHandshakeResponse
    hookType?: T
  }

  type PiecesBuilderFn = (
    app: FastifyInstance,
    io: IOServer | undefined,
    packages: string[],
    piecesSource: PiecesSource
  ) => Promise<void>

  type FlowWorker = (log: FastifyBaseLogger) => {
    init(args: { workerToken: string }): Promise<void>
    close(): Promise<void>
  }

  // 👇 Unión: default puede ser función o objeto con métodos
  const _default:
    | PiecesBuilderFn
    | {
        piecesBuilder: PiecesBuilderFn
        flowWorker?: FlowWorker
      }

  export default _default

  // ❌ No declares exports nombrados si el runtime no los tiene.
}
