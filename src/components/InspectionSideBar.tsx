import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

interface Props {
  loading: boolean;
  ready: boolean;
}

const steps = [
  "Operating System",
  "Processor",
  "Memory",
  "Network",
  "Machine Identity",
];

export default function InspectionSidebar({ loading, ready }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrentStep(steps.length);
      return;
    }

    let index = 0;

    const interval = setInterval(() => {
      index++;

      setCurrentStep(index);

      if (index >= steps.length) {
        clearInterval(interval);
      }
    }, 350);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div
      className="
            relative
            overflow-hidden
            bg-gradient-to-br
            from-emerald-950
            via-green-800
            to-lime-600
            p-6
            md:p-8
            lg:p-10
            xl:p-14
            text-white
        "
    >
      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
                    linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
                    `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow */}

      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-lime-300/10 blur-3xl" />

      {/* Watermark */}

      <img
        src={logo}
        alt=""
        className="pointer-events-none absolute bottom-6 right-6 w-72 opacity-[0.05]"
      />

      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* ================= TOP ================= */}

        <div>
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] border border-white/20 bg-white/10 backdrop-blur-xl">
            <img src={logo} className="w-14" />
          </div>

          <h1 className="text-3xl font-black">JAMB TEST</h1>

          <p className="mt-2 text-green-100">System Readiness Inspection</p>

          <div className="mt-6 h-1 w-20 rounded-full bg-white" />

          <div className="mt-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-xl">
              <span
                className={`
                                h-3
                                w-3
                                rounded-full

                                ${
                                  ready
                                    ? "bg-lime-300 animate-pulse"
                                    : "bg-amber-300 animate-pulse"
                                }
                            `}
              />

              <span className="font-medium">
                {ready ? "System Ready" : "Inspecting Local Machine..."}
              </span>
            </div>
          </div>
        </div>

        {/* ================= Timeline ================= */}

        <div className="mt-12 space-y-6">
          {steps.map((step, index) => {
            const complete = currentStep > index;

            return (
              <div key={step} className="flex items-center gap-4">
                <div
                  className={`
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-full
                                    transition-all

                                    ${
                                      complete
                                        ? "bg-lime-300 text-green-900"
                                        : "border border-white/20 bg-white/10"
                                    }
                                `}
                >
                  {complete ? "✓" : ""}
                </div>

                <span
                  className={`
                                    transition-all

                                    ${
                                      complete ? "text-white" : "text-green-100"
                                    }
                                `}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
