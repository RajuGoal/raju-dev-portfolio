import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Users,
  MessageSquare,
  Upload,
  LogOut,
  Globe,
} from "lucide-react";

import { useAdminAuth } from "../../hooks/useAdminAuth";
import AdminLogin from "./AdminLogin";
import ProjectsManager from "./ProjectsManager";
import AnalyticsPanel from "./AnalyticsPanel";
import VisitorLogsPanel from "./VisitorLogsPanel";
import MessagesPanel from "./MessagesPanel";
import UploadsPanel from "./UploadsPanel";
import VisitorAnalyticsPanel from "../analytics/VisitorAnalyticsPanel";

const TABS = [
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    component: AnalyticsPanel,
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderKanban,
    component: ProjectsManager,
  },
  {
    id: "logs",
    label: "Visitor Logs",
    icon: Users,
    component: VisitorLogsPanel,
  },
  {
    id: "messages",
    label: "Messages",
    icon: MessageSquare,
    component: MessagesPanel,
  },
  {
    id: "uploads",
    label: "Uploads",
    icon: Upload,
    component: UploadsPanel,
  },
  {
    id: "visitor-analytics",
    label: "Visitor Analytics",
    icon: Globe,
    component: VisitorAnalyticsPanel,
  },
];

export default function AdminDashboard() {
  const { isAuthed, logout } = useAdminAuth();

  const [authed, setAuthed] = useState(isAuthed);
  const [activeTab, setActiveTab] = useState("analytics");

  if (!authed) {
    return (
      <AdminLogin
        onSuccess={() => {
          setAuthed(true);
        }}
      />
    );
  }

  const activeTabData = TABS.find((tab) => tab.id === activeTab);
  const ActiveComponent = activeTabData?.component;

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-56 border-r border-slate-800 flex flex-col p-4 gap-1">
        <div className="flex items-center gap-2 px-2 py-3 mb-2">
          <LayoutDashboard
            size={18}
            className="text-amber-400"
          />

          <span className="font-mono font-bold text-slate-100 text-sm">
            Admin Panel
          </span>
        </div>

        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono transition-colors ${
              activeTab === id
                ? "bg-amber-400/10 text-amber-300 border border-amber-400/30"
                : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
            }`}
          >
            <Icon size={15} />
            <span>{label}</span>
          </button>
        ))}

        <button
          onClick={() => {
            logout();
            setAuthed(false);
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono text-slate-500 hover:text-red-400 mt-auto"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <h2 className="text-2xl font-bold text-slate-100 mb-6">
          {activeTabData?.label}
        </h2>

        {ActiveComponent ? (
          <ActiveComponent />
        ) : (
          <div className="text-red-400">
            Component not found.
          </div>
        )}
      </main>
    </div>
  );
}