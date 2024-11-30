import express from 'express'
import cors from 'cors'

export const applyMiddleware = (app: express.Application) => {
    //I can add middleware i want to use here
    //TODO, JWT AUTHENTICATION HERE
    app.use(cors());
    app.use(express.json())
}