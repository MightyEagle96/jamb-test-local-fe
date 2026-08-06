interface Props {
  ready: boolean;
}

export default function StatusBadge({ ready }: Props) {
  return (
    <div
      className={`
            inline-flex
            items-center
            gap-3
            rounded-full
            px-6
            py-3
            font-semibold
            backdrop-blur-xl
            border

            ${
              ready
                ? "bg-green-100 text-green-700 border-green-300"
                : "bg-red-100 text-red-700 border-red-300"
            }
        `}
    >
      <span
        className={`
                h-3
                w-3
                rounded-full

                ${ready ? "bg-green-500 animate-pulse" : "bg-red-500"}
            `}
      />

      {ready ? "SYSTEM READY" : "SYSTEM NOT READY"}
    </div>
  );
}
