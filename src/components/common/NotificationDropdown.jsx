// VIKRAM1 — Notification Center Dropdown (Realistic Enterprise Theme)
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
        return <AlertTriangle className="w-4 h-4 text-[#B7791F] shrink-0" />;
      case 'ALERT':
        return <ShieldAlert className="w-4 h-4 text-[#B84242] shrink-0" />;
      case 'AI':
        return <Cpu className="w-4 h-4 text-[#2E7D5B] shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-[#1E3A5F] shrink-0" />;
    }
  };

  return (
    <div className="absolute right-4 top-16 w-80 sm:w-96 bg-white border border-[#D5DCE3] rounded-md shadow-lg z-50 font-sans text-xs overflow-hidden">
      {/* Header */}
      <div className="p-3 bg-[#FAFCFD] border-b border-[#E5EAEF] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-[#1E3A5F]" />
          <span className="font-bold text-[#1E3A5F] tracking-wide uppercase">
            SYSTEM NOTIFICATIONS
          </span>
          <span className="text-[10px] bg-[#EBF2F7] text-[#1E3A5F] font-mono px-1.5 py-0.5 rounded border border-[#CFDFEC] font-semibold">
            {notifications.length}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={markAllRead}
            className="text-[10px] text-[#526B82] hover:text-[#1E3A5F] font-semibold transition-colors"
            title="Mark all as read"
          >
            Mark Read
          </button>
          <button
            onClick={() => setNotificationOpen(false)}
            className="text-[#60717D] hover:text-[#263238] p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="max-h-96 overflow-y-auto divide-y divide-[#E5EAEF]">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-[#60717D]">
            No active notifications
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3 transition-colors hover:bg-[#F8FAFC] flex items-start justify-between space-x-3 ${
                !item.read ? 'bg-[#F4F8FA] border-l-2 border-[#1E3A5F]' : ''
              }`}
            >
              <div className="flex items-start space-x-2.5">
                <div className="mt-0.5">{getIcon(item.type)}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[#263238] text-xs">
                      {item.title}
                    </span>
                    <span className="text-[9px] text-[#60717D] font-mono">{item.time}</span>
                  </div>
                  <p className="text-[11px] text-[#60717D] mt-0.5 leading-snug">
                    {item.text}
                  </p>
                </div>
              </div>

              <button
                onClick={() => clearNotification(item.id)}
                className="text-[#8295A5] hover:text-[#263238] text-xs shrink-0"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2 bg-[#FAFCFD] border-t border-[#E5EAEF] text-[10px] text-[#60717D] text-center font-mono">
        VIKRAM1 Telemetry Ingest Engine • Real-Time Bus
      </div>
    </div>
  );
}
