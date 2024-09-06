import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { columns } from "@/components/table/vendors/columns";
import { DataTable } from "@/components/table/data-table";

import { vendorSchema, vulnSchema } from "@/types/table";
import { supabase } from "@/config/supabaseClient";

export const metadata: Metadata = {
  title: "Vendors",
  description:
    "A table consisting of all the vendors in database. Vendor Name, their Advisory Link, and total Vulnerabilites are the columns.",
};

export const revalidate = 3600;

export default async function TaskPage() {
  const { data: vendorData, error } = await supabase.rpc(
    "get_advisories_per_vendor"
  );
  if (error) {
    console.error(error);
  }
  // else {
  //   console.log(vendorData);
  // }
  //@ts-ignore
  const transformedVendors = vendorData?.map((vendor) => {
    const { vendor_name, url, advisory_count } = vendor;
    return {
      vendor: vendor_name,
      url,
      count: advisory_count,
    };
  });

  // console.log(transformedVendors);
  // Validate the transformed data against the vulnSchema
  const validVendors = z.array(vendorSchema).parse(transformedVendors);
  return (
    <>
      <div className=" h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Vendors</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all the Vendors in our database, along with
              their Total Vulnerabilities and Source.
            </p>
          </div>
        </div>
        <DataTable data={validVendors} columns={columns} />
      </div>
    </>
  );
}
