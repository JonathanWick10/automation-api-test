import { JobType, UserInteractionJobDataWithoutWatchingInformation } from 'automation-server-shared-test'
import { apId } from 'automation-shared-test'
import { FastifyBaseLogger } from 'fastify'
import { engineResponseWatcher } from './engine-response-watcher'
import { jobQueue } from './queue'

export const userInteractionWatcher = (log: FastifyBaseLogger) => ({
    submitAndWaitForResponse: async <T>(request: UserInteractionJobDataWithoutWatchingInformation, requestId?: string): Promise<T> => {
        const id = requestId ?? apId()
        await jobQueue(log).add({
            id,
            type: JobType.USERS_INTERACTION,
            data: {
                ...request,
                requestId: id,
                webserverId: engineResponseWatcher(log).getServerId(),
            },
        })
        return engineResponseWatcher(log).oneTimeListener<T>(id, false, undefined, undefined)
    },
})