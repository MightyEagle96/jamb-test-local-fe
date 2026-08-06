interface Props {
  title: string;
  value: string;
}

export default function SystemInfoCard({ title, value }: Props) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-3
        md:p-4
        lg:p-5
        shadow-sm
        transition-all
        duration-300
        hover:border-green-200
        hover:shadow-md
      "
    >
      <p
        className="
          text-xs
          font-medium
          uppercase
          tracking-wide
          text-slate-500
          md:text-sm
        "
      >
        {title}
      </p>

      <h3
        className="
          mt-2
          break-words
          text-base
          font-semibold
          leading-6
          text-slate-800
          md:text-lg
          lg:text-xl
        "
      >
        {value}
      </h3>
    </div>
  );
}
