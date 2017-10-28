## Angular Express slim starter
### Heroku ready wih SystemJS builder

- Angular 4.4.6 ( https://angular.io/docs/ts/latest/quickstart.html )
- Express ( from generator )

https://express-angular2-slim.herokuapp.com/

## Install
```bash
git clone https://github.com/dlwebdev/angular2-express-slim
cd angular2-express-slim

# Install dependencies
npm install
npm install -g @angular/cli

# To rebuild frontend client
cd client/stockmarket
npm install
ng build -prod -op ../public  # Remove `-prod` for debug

# run and watch for changes in .ts files
npm start

# Application available at url: http://localhost:8080
```
