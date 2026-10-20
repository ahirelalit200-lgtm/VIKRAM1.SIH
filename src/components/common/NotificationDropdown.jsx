// VIKRAM1 — Notification Center Dropdown
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, X, AlertTriangle, Info, Cpu, ShieldAlert } from 'lucide-react';

export default function NotificationDropdown() {
  const { notifications, setNotifications, notificationOpen, setNotificationOpen } = useApp();

  if (!notificationOpen) return null;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'WARNING':
        return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'ALERT':
        return <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />;
      case 'AI':
        return <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-cyan-400 shrink-0" />;
    }
  };

  return (
    <div className="absolute right-4 top-16 w-80 sm:w-96 bg-[#081226]/95 border border-[#1A2E56] rounded-xl shadow-glow-cyan backdrop-blur-xl z-50 font-mono text-xs overflow-hidden">
      {/* Header */}
      <div className="p-3 bg-[#060D1E] border-b border-[#142344] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white tracking-wider uppercase">
            SYSTEM NOTIFICATIONS
          </span>
          <span className="text-[10px] bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/30">
            {notifications.length}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={markAllRead}
            className="text-[10px] text-cyan-400 hover:text-white transition-colors"
            title="Mark all as read"
          >
            Mark Read
          </button>
          <button
            onClick={() => setNotificationOpen(false)}
            className="text-slate-400 hover:text-white p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="max-h-96 overflow-y-auto divide-y divide-[#101D38]">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-slate-500">
            No active notifications
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3 transition-colors hover:bg-[#0B1836] flex items-start justify-between space-x-3 ${
                !item.read ? 'bg-[#0B1836]/60 border-l-2 border-cyan-400' : ''
              }`}
            >
              <div className="flex items-start space-x-2.5">
                <div className="mt-0.5">{getIcon(item.type)}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-200 text-xs">
                      {item.title}
                    </span>
                    <span className="text-[9px] text-slate-500">{item.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {item.text}
                  </p>
                </div>
              </div>

              <button
                onClick={() => clearNotification(item.id)}
                className="text-slate-500 hover:text-slate-300 text-xs shrink-0"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2 bg-[#060D1E] border-t border-[#142344] text-[10px] text-slate-500 text-center">
        VIKRAM1 Telemetry Dispatch Engine • Real-Time Ingest
      </div>
    </div>
  );
}
