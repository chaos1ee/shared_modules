# `@chaos1ee/axios`

> Easy to set the return type of axios requests.


```typescript
interface ResponseType {
    foo: string
}
```

**Before**

```typescript
axios.get<unknown, ResponseType>('/something')
```

**After**

```typescript
axios.get<ResponseType>('/something')
```

## Usage

```shell
yarn add @chaos1ee/axios
```

then:

```typescript
import axios from '@chaos1ee/axios'

axios.get('/something')
```