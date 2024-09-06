import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { columns } from "@/components/table/vulnerabilities/columns";
import { DataTable } from "@/components/table/data-table";
import { UserNav } from "@/components/user-nav";
import { vulnSchema } from "@/types/table";
import { supabase } from "@/config/supabaseClient";

export const metadata: Metadata = {
  title: "Vulnerabilities",
  description:
    "A table consisting of vulnerabilities in database. CVE, Title, Vendor, Severity, Base Score, Publication Date are the columns.",
};

export default async function TaskPage() {
  const { data: vulnerabilities, error } = await supabase
    .from("vulnerabilities")
    .select(
      `
      cve,
      severity,
      base_score,
      advisories (
        title,
        publication_date,
        vendors (name)
      )
    `
    );

  if (error) {
    console.error(error);
  }
  const transformedVulnerabilities = vulnerabilities?.map((vuln) => {
    const { cve, severity, base_score, advisories } = vuln;

    // Extract the first vendor's name (assuming there's at least one vendor)
    //@ts-ignore
    const vendor = advisories.vendors?.name || "Unknown Vendor";
    const modifiedSeverity = severity || "Unknown";
    const modifiedBaseScore = base_score || 0;
    return {
      //@ts-ignore
      title: advisories.title,
      cve,
      base_score: modifiedBaseScore,
      severity: modifiedSeverity,
      vendor,
      //@ts-ignore
      publication_date: advisories.publication_date,
    };
  });
  // Validate the transformed data against the vulnSchema
  const validVulnerabilities = z
    .array(vulnSchema)
    .parse(transformedVulnerabilities);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Vulnerabilities
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all the CVEs in our database, along with
              their Advisories, Base Score, Severity and Publication date.
            </p>
          </div>
        </div>
        <DataTable data={validVulnerabilities} columns={columns} />
      </div>
    </>
  );
}
