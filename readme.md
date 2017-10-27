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

# To rebuild js
tsc
npm run bundle
npm run bundle:prod

# run and watch for changes in .ts files
npm start

# Application available at url: http://localhost:8080
```

## Development
Uncomment in public/index.html:

```html
<script src="js/systemjs.config.js"></script>
<script>
  System.import('main')
        .then(null, console.error.bind(console));
</script>
```

Comment out
```html
<!-- Production mod -->
<script src="js/bundle.min.js"></script>
```
