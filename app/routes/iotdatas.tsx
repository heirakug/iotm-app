import { json } from "@remix-run/node";
import { 
  Form,
  Outlet,
  // Link,
} from "@remix-run/react";

import { getIoTDataList } from "~/models/iotData.server";
import { useUser } from "~/utils";

export const loader = async () => {
  const ioTDataList = await getIoTDataList();
  return json({ ioTDataList });
};

export default function IoTDataLayout() {
  // const { ioTDataList } = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">IoT Data</h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex-1 p-6 space-y-6">
      {/* <Link
          to="new"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          New IoT Data
        </Link> */}
        <Outlet />
      </main>
    </div>
  );
}