interface Props {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export default function SystemCard({ icon, title, children }: Props) {
  return (
    <div
      className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
        "
    >
      <div className="flex items-center gap-4">
        <div
          className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-emerald-700
                    to-lime-600
                    text-white
                    shadow-lg
                "
        >
          {icon}
        </div>

        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      </div>

      <div className="mt-6">{children}</div>
    </div>
  );
}
