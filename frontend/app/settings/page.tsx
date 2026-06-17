"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    apiUrl: "http://127.0.0.1:8000",
    refreshInterval: 3000,
    theme: "light",
    notifications: true,
    autoSync: true,
  });

  const handleChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("appSettings", JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  return (
    <main style={{ padding: 30, fontFamily: "Arial", maxWidth: 600 }}>
      <h1>⚙️ Settings</h1>

      <div style={{ marginTop: 30, display: "grid", gap: 20 }}>
        <SettingInput
          label="API Base URL"
          value={settings.apiUrl}
          onChange={(value) => handleChange("apiUrl", value)}
          type="text"
        />

        <SettingInput
          label="Refresh Interval (ms)"
          value={settings.refreshInterval}
          onChange={(value) => handleChange("refreshInterval", Number(value))}
          type="number"
        />

        <div>
          <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>
            Theme
          </label>
          <select
            value={settings.theme}
            onChange={(e) => handleChange("theme", e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 4,
              border: "1px solid #ddd",
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        <div>
          <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleChange("notifications", e.target.checked)}
            />
            <span style={{ fontWeight: "bold" }}>Enable Notifications</span>
          </label>
        </div>

        <div>
          <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              type="checkbox"
              checked={settings.autoSync}
              onChange={(e) => handleChange("autoSync", e.target.checked)}
            />
            <span style={{ fontWeight: "bold" }}>Auto Sync Data</span>
          </label>
        </div>

        <button
          onClick={handleSave}
          style={{
            padding: 12,
            fontSize: 16,
            fontWeight: "bold",
            backgroundColor: "#2196F3",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            marginTop: 20,
          }}
        >
          Save Settings
        </button>
      </div>

      <section style={{ marginTop: 40, padding: 20, backgroundColor: "#f5f5f5", borderRadius: 8 }}>
        <h2>About</h2>
        <p>
          <strong>Application:</strong> Aura-X LPG Platform
        </p>
        <p>
          <strong>Version:</strong> 1.0.0
        </p>
        <p>
          <strong>API Endpoint:</strong> {settings.apiUrl}
        </p>
      </section>
    </main>
  );
}

function SettingInput({ label, value, onChange, type }: any) {
  return (
    <div>
      <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 4,
          border: "1px solid #ddd",
          fontSize: 14,
        }}
      />
    </div>
  );
}
