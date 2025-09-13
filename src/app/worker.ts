import { AppSystemProp, PiecesSource, WorkerSystemProp } from 'automation-server-shared-test'
import { isNil } from 'automation-shared-test'
import { FastifyInstance,FastifyBaseLogger } from 'fastify'
// import { flowWorker, piecesBuilder } from 'automation-server-worker-test'
import worker from 'automation-server-worker-test'
import { accessTokenManager } from './authentication/lib/access-token-manager'
import { system } from './helper/system/system'

type PiecesBuilderFn = (
  app: FastifyInstance,
  io: any,
  packages: string[],
  piecesSource: PiecesSource
) => Promise<void>

type FlowWorkerFactory = (log: FastifyBaseLogger) => {
  init(args: { workerToken: string }): Promise<void>
  close(): Promise<void>
}

const { piecesBuilder, flowWorker } = worker as {
  piecesBuilder: PiecesBuilderFn
  flowWorker: FlowWorkerFactory
}

export const setupWorker = async (app: FastifyInstance): Promise<void> => {

    const piecesSource = system.getOrThrow<PiecesSource>(AppSystemProp.PIECES_SOURCE)
    const devPieces = system.get(AppSystemProp.DEV_PIECES)?.split(',') ?? []
    await piecesBuilder(app, app.io, devPieces, piecesSource)
    
    app.addHook('onClose', async () => {
        await flowWorker(app.log).close()
    })
}

export async function workerPostBoot(app: FastifyInstance): Promise<void> {
    const workerToken = await generateWorkerToken()
    await flowWorker(app.log).init({ workerToken })
}



async function generateWorkerToken(): Promise<string> {
    const workerToken = system.get(WorkerSystemProp.WORKER_TOKEN)
    if (!isNil(workerToken)) {
        return workerToken
    }
    return accessTokenManager.generateWorkerToken()
}