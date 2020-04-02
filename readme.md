# Corona Map API

The REST API Service to manage data about the Coronavirus in Peru.

## How to setup de project?

1. Run `yarn` to install all the dependencies
2. Follow the `.env.example` structure to create your `.env` file
3. Run `docker-compose up -d`
4. Run `yarn migrate up` to populate the local mongodb

## How to run the project?

Execute `yarn dev` for development purposes and `yarn start` for a production
ready environment

> The production environment must has the application build. Run `yarn build` to
> get it.

## What about the information source?

- [INDECI](https://www.indeci.gob.pe/informe/reportes-preliminares-complementarios-emergencias/?title=CORONAVIRUS&tipo_alerta=&anos_alertas=0)

## Related Projects

- [Corona Map Web](https://github.com/rqbazan/corona-map-web)
