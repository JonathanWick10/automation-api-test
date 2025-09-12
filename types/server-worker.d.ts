// types/server-worker.d.ts
declare module 'server-worker' {
  import type { FastifyInstance, FastifyBaseLogger } from 'fastify'
  import type { Server as IOServer } from 'socket.io'
  import type { PieceMetadata } from 'automation-pieces-framework-test'
  import type {
    ScheduleOptions,
    TriggerSourceScheduleType,
    WebhookHandshakeResponse,
  } from 'automation-shared-test'

  // Respuesta estándar del helper (incluye logs)
  export type EngineHelperResponse<T = unknown> = {
    result: T
    status?: 'OK' | 'ERROR'
    error?: unknown
    standardOutput?: string
    standardError?: string
  }

  // validateAuth -> tu código espera string en `error`
  export type EngineHelperValidateAuthResult = {
    valid: boolean
    error?: string
  }

  // props resolver -> accedes a .result.options
  export type EngineHelperPropResult = {
    options?: unknown
  }

  // extract piece metadata
  export type EngineHelperExtractPieceInformation = PieceMetadata

  // triggers -> tu código usa listeners, scheduleOptions y response
  export type EngineHelperTriggerResult<T = unknown> = {
    success: boolean
    message?: string
    output: unknown[]

    // lo tratas como array definido
    listeners: Array<{
      event: string
      identifierValue: string
      // algunos sitios usan listener.events; lo exponemos opcional para compat
      events?: string[]
    }>

    // lo usas como objeto con 'type/cronExpression/timezone'
    scheduleOptions: ScheduleOptions

    // handshake devuelve un objeto con 'status' y más campos
    response?: WebhookHandshakeResponse

    hookType?: T
  }

  // API runtime que invocas
  export function piecesBuilder(
    app: FastifyInstance,
    io: IOServer | undefined,
    packages: string[],
    piecesSource: unknown
  ): Promise<void>

  export function flowWorker(log: FastifyBaseLogger): {
    init(args: { workerToken: string }): Promise<void>
    close(): Promise<void>
  }

  export function userInteractionWatcher(log: FastifyBaseLogger): {
    submitAndWaitForResponse<T>(input: Record<string, unknown>): Promise<T>
  }
}
