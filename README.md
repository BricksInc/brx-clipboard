# brx-clipboard

clipboard implementation supporting html

## Install

```bash
npm install brx-clipboard
npx cap sync
```

## API

<docgen-index>

* [`write(...)`](#write)
* [`read()`](#read)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### write(...)

```typescript
write(options: WriteOptions) => Promise<void>
```

Write a value to the clipboard (the "copy" action)

| Param         | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#writeoptions">WriteOptions</a></code> |

--------------------


### read()

```typescript
read() => Promise<ReadResult>
```

Read a value from the clipboard (the "paste" action)

**Returns:** <code>Promise&lt;<a href="#readresult">ReadResult</a>&gt;</code>

--------------------


### Interfaces


#### WriteOptions

Represents the data to be written to the clipboard.

| Prop        | Type                | Description                                                                                                     |
| ----------- | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| **`text`**  | <code>string</code> | Text value to copy.                                                                                             |
| **`html`**  | <code>string</code> | HTML value to copy.                                                                                             |
| **`image`** | <code>string</code> | Image in [Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) format to copy. |
| **`url`**   | <code>string</code> | URL string to copy.                                                                                             |
| **`label`** | <code>string</code> | User visible label to accompany the copied data (Android Only).                                                 |


#### ReadResult

Represents the data read from the clipboard.

| Prop        | Type                | Description                                     |
| ----------- | ------------------- | ----------------------------------------------- |
| **`text`**  | <code>string</code> | Text reprensentation of data from the clipboard |
| **`value`** | <code>string</code> | Data read from the clipboard.                   |
| **`type`**  | <code>string</code> | Type of data in the clipboard.                  |

</docgen-api>
