import { subscriptionTiers, TierNames } from "@/data/subscriptionTiers";
import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow()
const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date())

export const ProductTable = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkUserId: text("clerk_user_id").notNull(),
    name: text('name').notNull(),
    url: text('url').notNull(),
    description: text('description'),
    createdAt,
    updatedAt,
  },
  table => ({
    clerkUserIdIndex: index('products.clerk_user_id_index')
      .on(table.clerkUserId),
  })
)

export const productRelations = relations(
  ProductTable,
  ({ one, many }) => ({
    // Each product in ProductTable can have one associated row in ProductCustomizationTable (e.g., a single set of customizations for a product).
    productCustomization: one(ProductCustomizationTable),
    // A single product in ProductTable can have multiple rows in ProductViewTable (e.g., multiple views from different users or sessions).
    productView: many(ProductViewTable),
    // A single product can be associated with multiple rows in CountryGroupDiscountTable (e.g., multiple country-based discounts for the same product).
    countryGroupDiscounts: many(CountryGroupDiscountTable)
  })
)

export const ProductCustomizationTable = pgTable(
  "product_customizations",
  {
    id: uuid('id').primaryKey().defaultRandom(),
    classPrefix: text('class_prefix'),
    productId: uuid('product_id')
      .notNull()
      .references(() => ProductTable.id, { onDelete: 'cascade' })
      .unique(),
    locationMessage: text('location_message')
      .notNull()
      .default('Hi! It looks like you are from <b>{country}</b>. We support Parity Purchasing Power. If you need it, use code <b>"{coupon}"</b> to get <b>{discount}%</b> off.'),
    backgroundColor: text('background_color')
      .notNull()
      .default('hsl(193, 82%, 31%'),
    textColor: text('text_color').notNull().default('hsl(0, 0%, 100%'),
    fontSize: text('font_size').notNull().default('1rem'),
    bannerContainer: text('banner_container').notNull().default('body'),
    isSticky: boolean('is_sticky').notNull().default(true),
    createdAt,
    updatedAt,
  }
)

export const productCustomizationRelations = relations(
  ProductCustomizationTable,
  ({ one }) => ({
    product: one(ProductTable, {
      fields: [ProductCustomizationTable.productId],
      references: [ProductTable.id],
    })
  })
)

export const ProductViewTable = pgTable(
  'product_views',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id')
      .notNull()
      .references(() => ProductTable.id, { onDelete: 'cascade' }),
    countryId: uuid('country_id').references(() => CountryTable.id, { onDelete: 'cascade' }),
    visitedAt: timestamp('visited_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  }
)

export const productViewRelations = relations(
  ProductViewTable,
  ({ one }) => ({
    product: one(ProductTable, {
      fields: [ProductViewTable.productId],
      references: [ProductTable.id],
    }),
    country: one(CountryTable, {
      fields: [ProductViewTable.countryId],
      references: [CountryTable.id],
    })
  })
)

export const CountryTable = pgTable(
  'countries',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull().unique(),
    code: text('code').notNull().unique(),
    countryGroupId: uuid('country_group_id')
      .notNull()
      .references(() => CountryGroupTable.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt,
  }
)

export const countryRelations = relations(
  CountryTable,
  ({ one, many }) => ({
    countryGroups: one(CountryGroupTable, {
      fields: [CountryTable.countryGroupId],
      references: [CountryGroupTable.id],
    }),
    productViews: many(ProductViewTable),
  })
)

export const CountryGroupTable = pgTable(
  "country_groups",
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull().unique(),
    recommendedDiscountPercentage: real('recommended_discount_percentage'),
    createdAt,
    updatedAt,
  }
)

export const countryGroupRelations = relations(
  CountryGroupTable,
  ({ many }) => ({
    countries: many(CountryTable),
    countryGroupDiscounts: many(CountryGroupDiscountTable),
  })
)

export const CountryGroupDiscountTable = pgTable(
  'country_group_discounts',
  {
    countryGroupId: uuid('country_group_id')
      .notNull()
      .references(() => CountryGroupTable.id, { onDelete: 'cascade' }),
    productId: uuid('product_id')
      .notNull()
      .references(() => ProductTable.id, { onDelete: 'cascade' }),
    coupon: text('coupon').notNull(),
    discountPercentage: real('dicount_percentage').notNull(),
    createdAt,
    updatedAt,
  },
  table => ({
    pk: primaryKey({ columns: [table.countryGroupId, table.productId] })
  })
)

export const countryGroupDiscountRelations = relations(
  CountryGroupDiscountTable,
  ({ one }) => ({
    product: one(ProductTable, {
      fields: [CountryGroupDiscountTable.productId],
      references: [ProductTable.id],
    }),
    countryGroup: one(CountryGroupTable, {
      fields: [CountryGroupDiscountTable.countryGroupId],
      references: [CountryGroupTable.id],
    }),
  })
)

export const TierEnum = pgEnum(
  'tier',
  Object.keys(subscriptionTiers) as [TierNames]
)

export const UserSubscriptionTable = pgTable(
  'user_subscription',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    clerkUserId: text('clerk_user_id').notNull().unique(),
    stripeSubsriptionItemId: text('stripe_subscription_item_id'),
    stripeSubscriptionId: text('stripe_subscription_id'),
    tier: TierEnum('tier').notNull(),
    stripeCustomerId: text('stripe_customer_id'),
    createdAt,
    updatedAt,
  },
  table => ({
    clerkUserIdIndex: index('user_subscriptions.clerk_user_id_index')
      .on(table.clerkUserId),
    stripeCustomerIdIndex: index('user_subscriptions.stripe_customer_id_index')
      .on(table.stripeCustomerId)
  })
)
