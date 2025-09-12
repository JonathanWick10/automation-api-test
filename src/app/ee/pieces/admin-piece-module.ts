import { PieceMetadata, PieceMetadataModel } from 'automation-pieces-framework-test'
import { PackageType, PieceType } from 'automation-shared-test'
import { FastifyPluginAsyncTypebox, FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox'
import { pieceMetadataService } from '../../pieces/piece-metadata-service'
import { CreatePieceRequest } from './admin-piece-requests.ee'

export const adminPieceModule: FastifyPluginAsyncTypebox = async (app) => {
    await app.register(adminPieceController, { prefix: '/v1/admin/pieces' })
}

const adminPieceController: FastifyPluginCallbackTypebox = (
    app,
    _opts,
    done,
) => {
    app.post(
        '/',
        CreatePieceRequest,
        async (req): Promise<PieceMetadataModel> => {
            return pieceMetadataService(req.log).create({
                pieceMetadata: req.body as PieceMetadata,
                packageType: PackageType.REGISTRY,
                pieceType: PieceType.OFFICIAL,
            })
        },
    )

    done()
}
