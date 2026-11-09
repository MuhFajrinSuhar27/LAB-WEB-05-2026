import {ambilSemuaBuku} from "@/lib/buku";
import {connection} from "next/server";
import KatalogClient from "@/components/KatalogClient";


export default async function KatalogPage() {
  await connection();


  const dataBuku = await ambilSemuaBuku();
  return (
    <div className="space-y-16">
      <KatalogClient dataBuku={dataBuku} />
    </div>
  );

}




