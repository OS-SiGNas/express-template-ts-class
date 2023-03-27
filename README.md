# Fast escalable template CRUD based in NodeJS OOP, TypeScript, Express, Mongo, JWT...

## Install Dependences:

```
npm i
```

## Available Scripts

```
unix systems:
  start ->  export NODE_ENV=prod && node bin/index.js
  dev ->  export NODE_ENV=dev && ts-node-dev --poll src/index.ts
  test ->  export NODE_ENV=test && jest --detectOpenHandles
windows:
  start:win ->  set NODE_ENV=prod && node bin/index.js
  dev:win ->  set NODE_ENV=dev && ts-node-dev --poll src/index.ts
  test:win ->  set NODE_ENV=test && jest --detectOpenHandles

  build ->  tsc
```

## This API need .env file:

```
#Token secretKey
JWT_SECRET=

#PORT
PORT=

#DATABASE
MONGO_URI_HEADER=mongodb+srv://username:password
MONGO_CLUSTER=@cluster0...

#Test user for Jest testing
USER_TEST_USERNAME=
USER_TEST_PASSWORD=
```

### pd: if port is undefined express will default to a random free port

## Tree

```
├── docker-compose.dev.yml
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── index.ts
│   ├── modules
│   │   ├── index.ts
│   │   ├── types.d.ts
│   │   ├── 404
│   │   │   └── index.ts
│   │   ├── errorHandler
│   │   │   └── index.ts
│   │   ├── shared
│   │   │   ├── HttpResponse.ts
│   │   │   └─── SchemaValidatorMiddleware.ts
│   │   └── users
│   │       ├── AuthService.ts
│   │       ├── index.ts
│   │       ├── types.d.ts
│   │       ├── UsersController.ts
│   │       ├── UsersMiddleware.ts
│   │       ├── UsersModel.ts
│   │       ├── UsersRouter.ts
│   │       ├── UsersSchema.ts
│   │       ├── UsersService.ts
│   │       └── users.spec.ts
│   └── server
│       ├── index.ts
│       ├── Mongo.ts
│       ├── Server.ts
│       ├── Settings.ts
│       └── types.d.ts
└── tsconfig.json
```

## How does it work?

### 1 - src/index.ts entry point with an IIFE

### 2 - Initial server configuration such as environment variables are loaded into the config object in src/server/Settings.ts

### 3 - Express configuration and modules are loaded into the server object in src/server/Server.ts

### 4 - All implementation and instances for http server will to be created in src/server/index.ts

### 5 - All modules in the src/modules folder should export an object of type Express.Router and include them in the array declared in the src/modules/index.ts file, will be automatically exported and included in the server object.

```
/***************************************************************
                Add Routers modules in the array
****************************************************************/
const modules: Modules = [users,notes, saludo, poke, otherRouterObject];
```

## 5 - Each module has 5 Class files, 1 test file, 1 type file, and index:

```
1: ModuleRouter
2: ModuleController
3: ModuleService
4: ModuleSchema
5: ModuleModel
6: module.spec
7: types.d
8: index

/*  with this organization it is possible to move all the files referring to a module
    dragging only one folder, instead of looking for them in a giant tree of directories */
```

## 6 - in the folder src/modules/share en la carpeta share estan las clases compartidas por todos los modulos, como la clase HttpResponse o el ValidadorSchemas.

## 7 - The model for user it's in src/modules/users/UserModel, you need create any user in your DB like this:

```
{
	"username": "anyuser",
	"password": "mysecurepassword123456",
	"email": "anyuser@any.com",
	"name": "Any",
	"telf": "+58 000 0000",
	"active": true,
	"roles": ["admin","dev","audit","user"]
}
```

## 8 - The user rols array are ["admin","dev","audit","user"] and are validate with the checkSession middleware.

```
this.#router.use('/users', checkSession('admin'))

// the 'admin' Rol is required for all enpoints /users
```

## 9 - The middleware checkSession is: type -> checkSession:(arg: Rol) => RequestHandler;

```
const { checkSession } = new UsersMiddleware({ httpResponse, verifyJwt });

// create instance like this, look in src/modules/users/index.ts for good example
```
