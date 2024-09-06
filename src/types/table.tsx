import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export const vulnSchema = z.object({
  title: z.string(),
  cve: z.string(),
  base_score: z.number().nullable(),
  severity: z.string().nullable(),
  vendor: z.string(),
  publication_date: z.string(),
});

export const vendorSchema = z.object({
  vendor: z.string(),
  count: z.number().nullable(),
  url: z.string(),
});

export const productSchema = z.object({
  product_name: z.string(),
  vulnerability_count: z.number().nullable(),
  vendor: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
export type Vuln = z.infer<typeof vulnSchema>;
export type Vendor = z.infer<typeof vendorSchema>;
export type Product = z.infer<typeof productSchema>;
