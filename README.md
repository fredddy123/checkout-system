## Description

An API service for shop checkout system. It is implemented on typescript on NestJS framework. The framework allowed to reach modular architecture which helps to relatively easy extend the system with new modules or submodules mostly without significant need in refactoring of the existing components. 

The service provides elastic functionality for configuring different kinds of promotions through the set of prepared in advance high level generic  promotion conditions that should be used in pair with `/promotions` API. The general idea is to have a generic promotion condition like `BUY_FOR_AT_LEAST_X_EUROS_GET_Y_ITEMS_DISCOUNTED_BY_Z_PERCENTS` and then to have the posibility to specificate such condition with numbers and details about products and just create a `/promotions` API essenece eg with such details:

 - applicableTotal: 50 euro // minimal purchase sum
 - productsToDiscount: apples 1kg
 - productsToDiscountQuantity: 2 // meaning 2 items of "apples 1kg" product
 - dicountValue: 30%

All the promotion conditions supported: https://github.com/fredddy123/checkout-system/blob/main/src/promotion/types/promotion-condition.ts

Tests of some of the use cases with promotions: https://github.com/fredddy123/checkout-system/blob/main/src/promotion/promotion.service.spec.ts

New implementations of generic promotion conditions should be added there https://github.com/fredddy123/checkout-system/tree/main/src/promotion/implementations as classes that extend one of the abstract classes from ./base directory.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
