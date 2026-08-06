import { useEffect, useState } from "react";
import { toast } from "sonner";

import InspectionSidebar from "../../components/InspectionSideBar";
import InspectionCards from "../../components/InspectionCards";
import FailurePanel from "../../components/FailurePanel";

import { getSystemInformation } from "../../services/system.service";
import type { SystemInformation } from "../../types/system";
import InspectionCardsLoading from "../../components/InspectionCardsLoading";

export default function SystemInspectionPage() {
  const [loading, setLoading] = useState(true);

  const [system, setSystem] = useState<SystemInformation["data"] | null>(null);

  const [error, setError] = useState(false);

  const loadSystem = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await getSystemInformation();

      setSystem(response.data);

      toast.success("System inspection completed.");
    } catch (err) {
      console.error(err);

      setError(true);

      toast.error("Unable to communicate with the JAMB Test Agent.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSystem();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center p-6">
        <div className="grid w-full overflow-hidden rounded-[40px] bg-white shadow-[0_35px_90px_rgba(0,0,0,.15)] lg:grid-cols-[40%_60%]">
          {/* LEFT */}

          <InspectionSidebar loading={loading} ready={!!system} />

          {/* RIGHT */}

          <div className="flex items-center justify-center p-8 md:p-10 lg:p-12">
            {loading && <InspectionCardsLoading />}

            {!loading && error && <FailurePanel onRetry={loadSystem} />}

            {!loading && system && <InspectionCards system={system} />}
          </div>
        </div>
      </div>
    </div>
  );
}
