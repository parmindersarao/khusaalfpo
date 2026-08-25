const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:8000";

interface HealthResponse {
  status: string;
  message: string;
}

async function getBackendHealth(): Promise<HealthResponse> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/health`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    return {
      status: "down",
      message: "FastAPI is unreachable at http://127.0.0.1:8000/api/v1/health",
    };
  }
}

export default async function HealthPage() {
  const health = await getBackendHealth();
  const isHealthy = health.status === "ok";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans p-6">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <h1 className="text-base font-semibold text-zinc-900">
            Backend Diagnostics
          </h1>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isHealthy
                ? "bg-emerald-100 text-emerald-800"
                : "bg-rose-100 text-rose-800"
            }`}
          >
            {isHealthy ? "Operational" : "Offline"}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <p className="text-xs text-zinc-400">Target Endpoint</p>
            <p className="text-sm font-mono text-zinc-700 bg-zinc-50 p-2 rounded mt-1 border border-zinc-100">
              http://127.0.0.1:8000/api/v1/health
            </p>
          </div>

          <div>
            <p className="text-xs text-zinc-400">Response Payload</p>
            <p className="text-sm text-zinc-700 mt-1">{health.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}