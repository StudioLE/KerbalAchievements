// Core modules
var sh = require('shelljs')

// Get command line args
var arg = process.argv.slice(2)

// Server
if(arg[0] == 'server') {
  if(arg[1] == 'src' || arg[1] === undefined) {
    sh.echo('Launching src server')
    sh.exec('http-server src -a localhost -p 1337 -c-1')
  }
  else if(arg[1] == 'build') {
    sh.echo('Launching build server')
    sh.exec('http-server build -a localhost -p 1337 -c-1')
  }
}
// Invalid
else {
  console.log('invalid operation %s', arg[0])
}
