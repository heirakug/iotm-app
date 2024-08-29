import { 
  ActionFunctionArgs, 
  LoaderFunctionArgs, 
  json, 
  redirect 
} from "@remix-run/node";
import { 
  Form, 
  useLoaderData, 
  useActionData,
  useNavigation, 
  Link
 } from "@remix-run/react";
import { useState } from "react";

import { getIoTData, updateIoTData, deleteIoTData } from "~/models/iotData.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  await requireUserId(request);
  const iotData = await getIoTData(params.iotId);
  if (!iotData) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ iotData });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  await requireUserId(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete") {
    await deleteIoTData(params.iotId);
    return redirect("/iotdatas");
  }

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

  await updateIoTData({ id: params.iotId, deviceId, data });

  return redirect(`/iotdatas`);
};

export default function EditIoTDataPage() {
  const { iotData } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Edit IoT Data</h1>
      <Form method="post" className="space-y-6">
      <div>
          <label htmlFor="deviceId" className="block text-sm font-medium text-gray-700">
            Device ID
          </label>
          <input
            type="text"
            name="deviceId"
            id="deviceId"
            defaultValue={iotData.deviceId}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
          {actionData?.errors?.deviceId ? (
            <p className="mt-2 text-sm text-red-600" id="deviceId-error">
              {actionData.errors.deviceId}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="data" className="block text-sm font-medium text-gray-700">
            Data
          </label>
          <textarea
            name="data"
            id="data"
            defaultValue={iotData.data}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          ></textarea>
          {actionData?.errors?.data ? (
            <p className="mt-2 text-sm text-red-600" id="data-error">
              {actionData.errors.data}
            </p>
          ): null}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
            disabled={navigation.state === "submitting"}
          >
            {navigation.state === "submitting" ? "Updating..." : "Update IoT Data"}
          </button>

          <button
            type="submit"
            name="intent"
            value="delete"
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:bg-red-400"
            onClick={(e) => {
              if (!isDeleting) {
                e.preventDefault();
                setIsDeleting(true);
              }
            }}
          >
            {isDeleting ? "Are you sure?" : "Delete"}
          </button>
        </div>
      </Form>

      <div className="mt-4">
        <Link to="/iotdatas" className="text-blue-500 hover:underline">
          Back to IoT Data List
        </Link>
      </div>
    </div>
  );
}