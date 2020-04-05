# node-optimiam

An API wrapper for the anti-waste app [Optimiam](https://optimiam.com)

## Installation

```shell
yarn add node-optimiam
```

## Usage

```javascript
const Optimiam = require("node-optimiam");
const optimiam = new Optimiam({
  email: "",
  password: "",
});
```

## Methods

### Login

```javascript
await optimiam.login();
```

### Get profile

```javascript
await optimiam.getProfile();
```

### Get nearby stores

```javascript
await optimiam.getStores({ latitude, longitude }, radius = 2000);
```

### Get deals by store

```javascript
await optimiam.getDealsByStore(storeId);
```

### Get deal

```javascript
await optimiam.getDeal(dealId);
```
