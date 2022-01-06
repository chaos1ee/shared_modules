# Config Modules

A monorepo for publishing NPM packages。

## Add

### Usage

```shell
lerna add <package>[@version] [--dev] [--exact] [--peer]
```

### Examples

```shell
# Adds the module-1 package to the packages in the 'prefix-' prefixed folders
lerna add module-1 packages/prefix-*

# Install module-1 to module-2
lerna add module-1 --scope=module-2

# Install module-1 to module-2 in devDependencies
lerna add module-1 --scope=module-2 --dev

# Install module-1 to module-2 in peerDependencies
lerna add module-1 --scope=module-2 --peer

# Install module-1 in all modules except module-1
lerna add module-1

# Install babel-core in all modules
lerna add babel-core
```

## Install

```shell
lerna bootstrap
```

## Publish

```shell
lerna publish --no-push
```
