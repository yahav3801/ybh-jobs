import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { OrganizationTable } from "./organization";
import { relations } from "drizzle-orm";
import { JobListingApplicationTable } from "./jobListingApplication";

export const wageIntervals = ["hourly", "yearly"] as const;
export type WageInterval = (typeof wageIntervals)[number];
export const wageIntervalEnum = pgEnum("wage_interval", wageIntervals);

export const locationRequirements = ["in-office", "hybrid", "remote"] as const;
export type LocationRequirement = (typeof locationRequirements)[number];
export const locationRequirementEnum = pgEnum(
  "location_requirement",
  locationRequirements
);

export const experienceLevels = ["junior", "mid-level", "senior"] as const;
export type ExperienceLevel = (typeof experienceLevels)[number];
export const experienceLevelsEnum = pgEnum(
  "experience_levels",
  experienceLevels
);

export const jobListingStatuses = ["draft", "published", "delisted"] as const;
export type JobListingStatuses = (typeof jobListingStatuses)[number];
export const jobListingStatusesEnum = pgEnum(
  "jobListing_statuses",
  jobListingStatuses
);

export const jobListingTypes = [
  "full-time",
  "part-time",
  "contract",
  "internship",
] as const;
export type JobListingType = (typeof jobListingTypes)[number];
export const jobListingTypeEnum = pgEnum("jobListing_types", jobListingTypes);

export const JobListingsTable = pgTable(
  "job_listings",
  {
    id,
    organizationId: varchar()
      .notNull()
      .references(() => OrganizationTable.id, {
        onDelete: "cascade",
      }),
    title: varchar().notNull(),
    description: text().notNull(),
    wage: integer().notNull(),
    wageInterval: wageIntervalEnum(),
    stateAbbreviation: varchar(),
    city: varchar(),
    isFeatured: boolean().notNull().default(false),
    locationRequirement: locationRequirementEnum().notNull(),
    experienceLevel: experienceLevelsEnum().notNull(),
    status: jobListingStatusesEnum().notNull().default("draft"),
    type: jobListingTypeEnum().notNull(),
    postedAt: timestamp({ withTimezone: true }),
    createdAt,
    updatedAt,
  },
  (table) => [index().on(table.stateAbbreviation)]
);

export const jobListingRelations = relations(
  JobListingsTable,
  ({ one, many }) => ({
    Organization: one(OrganizationTable, {
      fields: [JobListingsTable.organizationId],
      references: [OrganizationTable.id],
    }),
    applications: many(JobListingApplicationTable),
  })
);
