import {
  Building2,
  MapPin,
  Users,
  UserRound,
  Phone,
  Mail,
  Hash,
  CalendarDays,
  Clock3,
} from "lucide-react";

interface CentreProfile {
  _id: string;
  createdAt: string;
  updatedAt: string;
  referenceNumber: string;
  tempReferenceNumber: string;
  centreName: string;
  state: string;
  centreCapacity: number;
  adminName: string;
  adminPhone: string;
  adminEmail: string;
}

interface ProfilePageProps {
  centre: CentreProfile;
}

function ProfilePage({ centre }: ProfilePageProps) {
  const formatDate = (date: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-NG", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (date: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-NG", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* =========================================================
          PROFILE HEADER
      ========================================================= */}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-600 px-6 py-8 text-white sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Icon */}

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
              <Building2 size={30} />
            </div>

            {/* Centre identity */}

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                Test Centre Profile
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                {centre.centreName}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-emerald-50">
                <span className="flex items-center gap-2">
                  <MapPin size={15} />
                  {centre.state}
                </span>

                <span className="flex items-center gap-2">
                  <Users size={15} />
                  Capacity: {centre.centreCapacity}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reference information */}

        <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <ProfileStat
            icon={<Hash size={17} />}
            label="Reference Number"
            value={centre.referenceNumber}
          />

          <ProfileStat
            icon={<Hash size={17} />}
            label="Temporary Reference Number"
            value={centre.tempReferenceNumber}
          />
        </div>
      </section>

      {/* =========================================================
          CENTRE INFORMATION
      ========================================================= */}

      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <ProfileSectionHeader
          icon={<Building2 size={19} />}
          title="Centre Information"
          description="Registered information about this test centre."
        />

        <div className="grid gap-x-8 px-6 py-5 sm:grid-cols-2 lg:grid-cols-3">
          <ProfileField
            icon={<Building2 size={17} />}
            label="Centre Name"
            value={centre.centreName}
          />

          <ProfileField
            icon={<MapPin size={17} />}
            label="State"
            value={centre.state}
          />

          <ProfileField
            icon={<Users size={17} />}
            label="Centre Capacity"
            value={`${centre.centreCapacity} Systems`}
          />

          <ProfileField
            icon={<Hash size={17} />}
            label="Reference Number"
            value={centre.referenceNumber}
          />

          <ProfileField
            icon={<CalendarDays size={17} />}
            label="Registered"
            value={formatDate(centre.createdAt)}
          />

          <ProfileField
            icon={<Clock3 size={17} />}
            label="Last Updated"
            value={formatDateTime(centre.updatedAt)}
          />
        </div>
      </section>

      {/* =========================================================
          ADMINISTRATOR INFORMATION
      ========================================================= */}

      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <ProfileSectionHeader
          icon={<UserRound size={19} />}
          title="Centre Administrator"
          description="Contact information for the registered centre administrator."
        />

        <div className="grid gap-x-8 px-6 py-5 sm:grid-cols-2 lg:grid-cols-3">
          <ProfileField
            icon={<UserRound size={17} />}
            label="Administrator"
            value={centre.adminName}
          />

          <ProfileField
            icon={<Phone size={17} />}
            label="Phone Number"
            value={centre.adminPhone}
          />

          <ProfileField
            icon={<Mail size={17} />}
            label="Email Address"
            value={centre.adminEmail}
          />
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function ProfileSectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-6 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
        {icon}
      </div>

      <div>
        <h2 className="text-sm font-bold text-slate-800">{title}</h2>

        <p className="mt-0.5 text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

/* =========================================================
   PROFILE FIELD
========================================================= */

function ProfileField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 py-4 last:border-b-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold text-slate-700">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   PROFILE STAT
========================================================= */

function ProfileStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 px-6 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-all font-mono text-sm font-bold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;
