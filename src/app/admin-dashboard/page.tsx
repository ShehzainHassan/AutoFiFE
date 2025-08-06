"use client";
import { useState, useMemo, JSX } from "react";
import { Footer, Navbar } from "../components";
import AdminSidebar from "../components/admin/admin-sidebar/admin-sidebar";

import AuctionAnalyticsIcon from "@/assets/images/icons/auction-analytics.png";
import UserAnalyticsIcon from "@/assets/images/icons/user-analytics.png";
import RevenueAnalyticsIcon from "@/assets/images/icons/revenue-analytics.png";
import SystemAnalyticsIcon from "@/assets/images/icons/system-performance.png";
import ReportsIcon from "@/assets/images/icons/reports.png";

import AuctionAnalytics from "../components/admin/auction-analytics/auction-analytics";
import UserAnalytics from "../components/admin/user-analytics/user-analytics";
import RevenueAnalytics from "../components/admin/revenue-analytics/revenue-analytics";
import SystemPerformance from "../components/admin/system-performance/system-performance";
import Reports from "../components/admin/reports/reports";

import classes from "./page.module.css";

const sidebarItems = [
  { label: "Auction Analytics", icon: AuctionAnalyticsIcon },
  { label: "User Analytics", icon: UserAnalyticsIcon },
  { label: "Revenue Analytics", icon: RevenueAnalyticsIcon },
  { label: "System Performance", icon: SystemAnalyticsIcon },
  { label: "Reports", icon: ReportsIcon },
];

const componentsMap: Record<string, JSX.Element> = {
  "Auction Analytics": <AuctionAnalytics />,
  "User Analytics": <UserAnalytics />,
  "Revenue Analytics": <RevenueAnalytics />,
  "System Performance": <SystemPerformance />,
  Reports: <Reports />,
};

export default function AdminDashboard() {
  const [selectedItem, setSelectedItem] = useState(sidebarItems[0].label);

  const SelectedComponent = useMemo(
    () => componentsMap[selectedItem],
    [selectedItem]
  );

  return (
    <div>
      <Navbar backgroundColor="var(--color-gray600)" />
      <div className={classes.container}>
        <AdminSidebar
          items={sidebarItems}
          selected={selectedItem}
          setSelected={setSelectedItem}
        />
        <div className={classes.mainContent}>{SelectedComponent}</div>
      </div>
      <Footer />
    </div>
  );
}
