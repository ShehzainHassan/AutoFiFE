"use client";
import { useState, useMemo, useEffect, JSX } from "react";
import { Footer, Navbar } from "../components";
import AdminSidebar from "../components/admin/admin-sidebar/admin-sidebar";

import AuctionAnalyticsIcon from "@/assets/images/icons/auction-analytics.svg";
import UserAnalyticsIcon from "@/assets/images/icons/user-analytics.svg";
import RevenueAnalyticsIcon from "@/assets/images/icons/revenue-analytics.svg";
import SystemAnalyticsIcon from "@/assets/images/icons/system-performance.svg";
import ReportsIcon from "@/assets/images/icons/reports.svg";

import AuctionAnalytics from "../components/admin/auction-analytics/auction-analytics";
import UserAnalytics from "../components/admin/user-analytics/user-analytics";
import RevenueAnalytics from "../components/admin/revenue-analytics/revenue-analytics";
import SystemPerformance from "../components/admin/system-performance/system-performance";
import Reports from "../components/admin/reports/reports";

import classes from "./page.module.css";
import { reportTypeOptions } from "@/interfaces/analytics";

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
  const [defaultReportType, setDefaultReportType] = useState<string>(
    reportTypeOptions[0].value
  );
  const [fromViewReport, setFromViewReport] = useState(false);

  const handleViewReport = () => {
    setDefaultReportType(reportTypeOptions[1].value);
    setFromViewReport(true);
    setSelectedItem("Reports");
  };

  const SelectedComponent = useMemo(() => {
    if (selectedItem === "Reports") {
      const initialType = fromViewReport
        ? defaultReportType
        : reportTypeOptions[0].value;
      return <Reports selected={initialType} />;
    }
    if (selectedItem === "Auction Analytics") {
      return <AuctionAnalytics onViewReport={handleViewReport} />;
    }
    return componentsMap[selectedItem];
  }, [selectedItem, defaultReportType, fromViewReport]);

  useEffect(() => {
    if (selectedItem === "Reports" && fromViewReport) {
      setFromViewReport(false);
    }
  }, [selectedItem, fromViewReport]);

  return (
    <div>
      <Navbar backgroundColor="var(--color-gray600)" />
      <div className={classes.container}>
        <AdminSidebar
          items={sidebarItems}
          selected={selectedItem}
          onSelect={setSelectedItem}
        />
        <div className={classes.mainContent}>{SelectedComponent}</div>
      </div>
      <Footer />
    </div>
  );
}
