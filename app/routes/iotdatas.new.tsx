// app/routes/iotdatas.new.tsx

import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createIoTData } from "~/models/iotData.server";
import { requireUserId } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const deviceId = formData.get("deviceId");
  const data = formData.get("data");

  if (typeof deviceId !== "string" || deviceId.length === 0) {
    return json(
      { errors: { deviceId: "Device ID is required", data: null } },
      { status: 400 }
    );
  }

  if (typeof data !== "string" || data.length === 0) {
    return json(
      { errors: { deviceId: null, data: "Data is required" } },
      { status: 400 }
    );
  }

  const iotData = await createIoTData({ deviceId, data, userId });

  return redirect(`/iotdatas`);
};

export default function NewIoTDataPage() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">New IoT Data</h1>
      </header>

      <main className="flex h-full bg-white p-6">
        <Form method="post" className="space-y-6">
          <div>
            <label htmlFor="deviceId" className="block text-sm font-medium text-gray-700">
              Device ID
            </label>
            <input
              type="text"
              name="deviceId"
              id="deviceId"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
            {actionData?.errors?.deviceId && (
              <p className="mt-2 text-sm text-red-600" id="deviceId-error">
                {actionData.errors.deviceId}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="data" className="block text-sm font-medium text-gray-700">
              Data
            </label>
            <textarea
              name="data"
              id="data"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            ></textarea>
            {actionData?.errors?.data && (
              <p className="mt-2 text-sm text-red-600" id="data-error">
                {actionData.errors.data}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Create IoT Data
          </button>
        </Form>
      </main>
    </div>
  );
}