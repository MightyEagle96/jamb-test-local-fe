interface Props {
  title: string;
  value: string;
}

export default function SystemInfoCard({ title, value }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>

      <h3 className="mt-2 text-lg font-semibold text-slate-800">{value}</h3>
    </div>
  );
}
