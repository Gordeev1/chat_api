import asyncRouteHandlers from 'hapi-async-handler';
import inert from 'inert';
import authJWT from 'hapi-auth-jwt2';
import swagger from 'hapi-swagger';
import vision from 'vision';

export default [inert, asyncRouteHandlers, authJWT, swagger, vision];
