"use client";

import * as React from "react";
import { 
  Users, 
  UserRound, 
  Bell, 
  FileCheck, 
  ArrowUpRight, 
  ArrowDownRight,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudents } from "../hooks/useStudents";
import { useStaff } from "../hooks/useStaff";
import { useAdmissions } from "../hooks/useAdmissions";

export function DashboardScreen() {
  const { data: students, isLoading: sLoading } = useStudents({ page: 1, limit: 1 });
  const { data: staff, isLoading: tLoading } = useStaff({ page: 1, limit: 1 });
  const { data: admissions, isLoading: aLoading } = useAdmissions({ page: 1, limit: 1 });

  const stats = [
    {
      title: "Total Students",
      value: students?.meta.total || 0,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
      trend: "+12.5%",
      trendUp: true
    },
    {
      title: "Active Staff",
      value: staff?.meta.total || 0,
      icon: UserRound,
      color: "text-purple-600",
      bg: "bg-purple-100",
      trend: "+2.1%",
      trendUp: true
    },
    {
      title: "New Enquiries",
      value: admissions?.meta.total || 0,
      icon: FileCheck,
      color: "text-amber-600",
      bg: "bg-amber-100",
      trend: "-4.5%",
      trendUp: false
    },
    {
      title: "Active Notices",
      value: "14",
      icon: Bell,
      color: "text-pink-600",
      bg: "bg-pink-100",
      trend: "+2",
      trendUp: true
    }
  ];

  if (sLoading || tLoading || aLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">School Overview</h1>
        <p className="text-gray-500">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center mt-1">
                {stat.trendUp ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={`text-xs font-semibold ${stat.trendUp ? "text-green-500" : "text-red-500"}`}>
                  {stat.trend}
                </span>
                <span className="text-xs text-gray-400 ml-1">vs last month</span>
              </div>
            </CardContent>
            <div className={`h-1 w-full ${stat.bg.replace('100', '500')} opacity-20`} />
          </Card>
        ))}
      </div>

      {/* Placeholder for charts/activity - can be expanded later */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="lg:col-span-2 border-none shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
                Activity Feed Visualization
              </div>
            </CardContent>
         </Card>
         <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium">Add New Student</button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium">Post Notice</button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium">Schedule Event</button>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
