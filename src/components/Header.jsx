import { Check, Cloud, RefreshCw, WifiOff } from "lucide-react";

const statusContent = {
  online: { label: "Tudo sincronizado", icon: Cloud },
  syncing: { label: "Sincronizando", icon: RefreshCw },
  offline: { label: "API indisponível", icon: WifiOff },
};

export function Header({ apiStatus = "online" }) {
  const status = statusContent[apiStatus];
  const StatusIcon = status.icon;

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a className="brand" href="#top" aria-label="TaskManager — início">
          <span className="brand-mark"><Check size={20} strokeWidth={3} /></span>
          <span className="brand-copy">
            <strong>TaskManager</strong>
            <small>Workspace pessoal</small>
          </span>
        </a>

        <div className={`sync-status ${apiStatus}`}>
          <StatusIcon size={15} className={apiStatus === "syncing" ? "spin" : ""} />
          <span>{status.label}</span>
        </div>
      </div>
    </header>
  );
}
