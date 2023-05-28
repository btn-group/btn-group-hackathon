# Escrow on Aleph Zero demo

## Setup

### Development
In separate terminal windows:
```
foreman start --procfile Procfile.dev
```

## Checking code
```
bundle exec haml-lint app/views/
bundle exec rubocop -A
yarn prettier --write app/javascript/
yarn prettier --write node_assets/
```