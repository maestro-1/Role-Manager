import swaggerDoc from './docs/role-manager-api.json';
import swaggerUi from 'swagger-ui-express';

import express from 'express';

const app = express()

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

app.get('/', (req, res) => {
    return res.status(200).send({
        'message': 'Welcome to Role-managers page'
    });
})


app.listen(5050)

console.log('running app on port', 5050);