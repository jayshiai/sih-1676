import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { columns } from "@/components/table/products/columns";
import { DataTable } from "@/components/table/data-table";

import { productSchema, vendorSchema, vulnSchema } from "@/types/table";
import { supabase } from "@/config/supabaseClient";

export const metadata: Metadata = {
  title: "Productss",
  description:
    "A table consisting of all the products in database. Products, their Vendor Name, and total Vulnerabilites are the columns.",
};

export const revalidate = 3600;

export default async function TaskPage() {
  const { data: prouductData, error } = await supabase.rpc(
    "get_products_vulnerabilities_count"
  );
  if (error) {
    console.error(error);
  }
  // //@ts-ignore
  // const transformedProducts = prouductData?.map((vendor) => {
  //   const {  product_name, vendor_name, vulnerability_count } = vendor;
  //   return {
  //     vendor: vendor_name,
  //     url,
  //     count: advisory_count,
  //   };
  // });

  //   console.log(transformedVendors);
  //   // Validate the transformed data against the vulnSchema
  const validProdcts = z.array(productSchema).parse(prouductData);
  // console.log(validProdcts);
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Products</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all the Products in our database, along with
              their Total Vulnerabilities and Vendor.
            </p>
          </div>
        </div>
        <DataTable data={validProdcts} columns={columns} />
      </div>
    </>
  );
}
