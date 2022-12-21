import express from "express";
import publicRoot from "./public/publicRoot";
import privateRoot from "./private/privateRoot";

const apiRoute = express.Router();

//Is it efficient to use like that, or better specify and use only for thouse route heiarchy that needs body parcer?
apiRoute.use(express.json());

apiRoute.use("api/v1/public", publicRoot);
apiRoute.use("api/v1/private", privateRoot);

export default apiRoute;
