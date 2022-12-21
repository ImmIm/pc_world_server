import express from 'express'
import publicRoot from './public/publicRoot'
import privateRoot from './private/privateRoot'

const apiRoute = express.Router()


apiRoute.use('api/v1/public', publicRoot)
apiRoute.use('api/v1/private', privateRoot)

export default apiRoute