import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getIoTDataList } from "~/models/iotData.server";

export const loader = async () => {
  const ioTDataList = await getIoTDataList();
  return json({ ioTDataList });
};

export default function IoTDataIndex() {
  const { ioTDataList } = useLoaderData<typeof loader>();

  return (
    <div>
      {ioTDataList.length === 0 ? (
        <p>No IoT data available</p>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">Recent IoT Data</h2>
          <ul>
            {ioTDataList.map((entry) => (
              <li key={entry.id} className="mb-2 p-4 border rounded-md shadow-sm">
                <p><strong>Device ID:</strong> {entry.deviceId}</p>
                <p><strong>Timestamp:</strong> {new Date(entry.timestamp).toLocaleString()}</p>
                <p><strong>Data:</strong> {entry.data}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}