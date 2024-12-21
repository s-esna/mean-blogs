import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { SERVER_CONFIG } from '../config/env';

const PORT = SERVER_CONFIG.PORT

/**
 * Set up Swagger for API documentation
 * 
 * @param app - The Express app to which Swagger UI and Swagger JSDoc will be applied.
 */
export const setupSwagger = (app: express.Application) => {
    // Swagger Definition
    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'Swagger Implementation',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Local development server',
            },
        ],
        components: {
            securitySchemes: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
              },
            }
        }
    };

    // Options for swagger-jsdoc
    const options = {
        swaggerDefinition,
        apis: [
            'src/routes/*.ts', 
            // "./controllers/*.ts"
        ]
    };
    // Initialize swagger-jsdoc
    const swaggerSpec = swaggerJsdoc(options);
    // Set up Swagger UI
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
