"use client";
import { useEffect, useState } from "react";
import { getReport } from "@/lib/api";

export default function BalanceSheetPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getReport("balance-sheet").then(setData).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Balance Sheet Report</h1>
      <pre className="bg-gray-100 p-4 rounded-md">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

