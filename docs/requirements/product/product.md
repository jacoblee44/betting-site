# h24-product

A product is an item that someone may want to sell on the platform. Product data is not relevant to the logic of an auction, but rather it is used to describe to users of the platform the items that are being sold.

As such, products contain information about the item itself. The products are described using a "mixin" or object composition architecture: A product type would be defined as the combination of multiple mixin types. The horse type would combine "vetinary documents", "insurance", "horse appearance", etc. The dove type would have "dove appearance" instead of "horse appearance".

To sell a product, it must be assigned to an [h24-lot].

```
h24-product
│
├── Product Type: Horse
│   ├── Mixin Type: Veterinary Documents
│   │   ├── Vaccination Record
│   │   └── Health Check History
│   │
│   ├── Mixin Type: Insurance
│   │   ├── Policy Number
│   │   └── Coverage Details
│   │
│   └── Mixin Type: Horse Appearance
│       ├── Color
│       └── Height
│
└── ... [Other Product Types with their respective Mixins]

Example Product Instance: "Starlight" (Horse)
│
├── Veterinary Documents
│   ├── Vaccination Record: "Up-to-date"
│   └── Health Check History: "Last checked: January 2023"
│
├── Insurance
│   ├── Policy Number: "H12345"
│   └── Coverage Details: "Full coverage until December 2023"
│
└── Horse Appearance
    ├── Color: "White"
    └── Height: "15.2 hands"

```