# `@chaos1ee/axios`

> Superset of [axios](https://github.com/axios/axios).

## Easier to set the return type of axios requests

Example:

```typescript
interface ResponseType {
    foo: string
}
```

Before

```typescript
axios.get<unknown, ResponseType>('/something')
```

After

```typescript
axios.get<ResponseType>('/something')
```

## Install

```shell
yarn add @chaos1ee/axios
```

## Usage

```typescript
import axios from '@chaos1ee/axios'

axios.get<ResponseType>('/something')
```