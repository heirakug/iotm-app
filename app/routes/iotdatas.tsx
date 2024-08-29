// app/routes/iotdatas.tsx

import { Outlet, Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getIoTDataList } from "~/models/iotData.server";

export const loader = async () => {
  const ioTDataList = await getIoTDataList();
  return json({ ioTDataList });
};

export default function IoTDataLayout() {
  const { ioTDataList } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">IoT Data</h1>
        <Link
          to="new"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          New IoT Data
        </Link>
      </header>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}