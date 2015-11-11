# Kerbal Achievements

Import save files from Kerbal Space Program and produce a detailed timeline of your Kerbals' achievements to date.

Find the app at [http://kerbal.studiole.uk](http://kerbal.studiole.uk)

## Roadmap / To Do

UI Overhaul
- [ ] Re-theme
- [ ] Home / splash page

Other
- [ ] Come up with a neat name

## Source

This app is run entirely in your browser using [AngularJS](https://angularjs.org).

## Contributing

I'm always on the look out for collaborators so feel free to suggest new features, get in touch or just fork at will.

## Install

If you want to host your own private version or run a local version feel free to follow these [installation instructions](https://github.com/StudioLE/KerbalAchievements/blob/master/INSTALL.md).

## Usage

Run gulp to produce a build from the app source
```
gulp
```

There's also small `cli.js` utility to simplify some of the development commands.

Launch a web server of the `src` directory
```
node cli server
```
Launch a web server of the `build` directory
```
node cli server build
```
