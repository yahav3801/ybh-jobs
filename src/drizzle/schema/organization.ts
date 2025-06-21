import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { JobListingsTable } from "./jobListing";
import { OrganizationUserSettingsTable } from "./organizationUserSettings";
import { relations } from "drizzle-orm";

export const OrganizationTable = pgTable("organizations", {
  id: varchar().primaryKey(),
  name: varchar().notNull(),
  imageUrl: varchar(),
  createdAt,
  updatedAt,
});

export const organizationRelations = relations(
  OrganizationTable,
  ({ many }) => ({
    jobListings: many(JobListingsTable),
    OrganizationUserSettings: many(OrganizationUserSettingsTable),
  })
);
