## Development setup
`cd client` then:
    
    npm i -g @angular/cli
    npm i

Now you can recompile and work with:

    ng serve

Finally to build the compiled files suitable for static file serving, run:

    ng build -prod -op ../public
