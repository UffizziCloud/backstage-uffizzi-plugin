# Uffizzi Plugin

Welcome to the uffizzi plugin!

_This plugin was created through the Backstage CLI_

## Getting started

Your plugin has been added to the example app in this repository, meaning you'll be able to access it by running `yarn start` in the root directory, and then navigating to [/uffizzi](http://localhost:3000/uffizzi).

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](./dev) directory.

## Roadmap

- [ ] Update UI to show status and use the avatar and the profile link of the user
- [ ] Replace proxy with a backend
- [ ] Configuration for setting the github repos for which users can monitor previews being created
- [ ] Create a preview on a single button click
- [ ] Read the GITHUB_TOKEN environment variable with repo scope to read private repos and then create previews
- [ ] Integrate with Github PullRequests plugin