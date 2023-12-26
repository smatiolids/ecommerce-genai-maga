import { NextResponse } from "next/server";
import type { NextApiRequest } from "next";
import { getSession } from "../dse";
export async function GET(req: NextApiRequest) {
  return handler(req);
}

export async function handler(req: NextApiRequest) {
  const requestUrl = `${req.url}`;
  console.log("Astra REQ: ", requestUrl);
  const session = await getSession()
  const rows = await session.execute("select * from tlp_stress.sensor_data limit 2");
  const row = rows.first()

  return NextResponse.json(row, { status: 200 });
}
