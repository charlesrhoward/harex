"use client";

import React, { useState } from "react";
import { HarData, HarEntry } from "./har-types";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { CopyButton } from "./CopyButton";

interface HarTableProps {
  harData: HarData;
}

export function HarTable({ harData }: HarTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof HarEntry | "request.url" | "response.status";
    direction: "ascending" | "descending";
  } | null>({
    key: "startedDateTime",
    direction: "ascending",
  });
  
  const entries = harData.log.entries;

  // Filter entries based on search term
  const filteredEntries = entries.filter((entry) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      entry.request.url.toLowerCase().includes(lowerSearchTerm) ||
      entry.request.method.toLowerCase().includes(lowerSearchTerm) ||
      entry.response.status.toString().includes(lowerSearchTerm) ||
      entry.response.statusText.toLowerCase().includes(lowerSearchTerm)
    );
  });

  // Sort entries based on sort config
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (!sortConfig) return 0;

    let aValue: string | number | Date;
    let bValue: string | number | Date;

    // Handle nested properties
    if (sortConfig.key === "request.url") {
      aValue = a.request.url;
      bValue = b.request.url;
    } else if (sortConfig.key === "response.status") {
      aValue = a.response.status;
      bValue = b.response.status;
    } else {
      aValue = a[sortConfig.key as keyof HarEntry] as string | number;
      bValue = b[sortConfig.key as keyof HarEntry] as string | number;
    }

    // Convert dates to timestamps for comparison
    if (sortConfig.key === "startedDateTime") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: keyof HarEntry | "request.url" | "response.status") => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-emerald-400";
    if (status >= 300 && status < 400) return "text-blue-400";
    if (status >= 400 && status < 500) return "text-amber-400";
    if (status >= 500) return "text-red-500";
    return "";
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatTime = (milliseconds: number) => {
    if (milliseconds < 1000) {
      return `${milliseconds.toFixed(0)}ms`;
    } else {
      return `${(milliseconds / 1000).toFixed(2)}s`;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };

  return (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Filter requests..."
            className="pl-10 pr-10 py-2 rounded-md bg-zinc-800 text-zinc-100 w-full focus:outline-none focus:ring-2 focus:ring-emerald-400 border border-zinc-700 font-mono"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setSearchTerm("")}
            >
              <X className="w-4 h-4 text-zinc-400" />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-sm font-mono">
            {filteredEntries.length} of {entries.length} requests
          </span>
        </div>
      </div>

      <div className="overflow-x-auto pb-6 rounded-lg border border-zinc-700 shadow-xl">
        <table className="min-w-full border-separate border-spacing-0 font-mono">
          <thead className="bg-zinc-800 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-emerald-400 uppercase tracking-wider border-b border-zinc-700">
                <button
                  className="flex items-center gap-1 hover:text-emerald-300"
                  onClick={() => requestSort("startedDateTime")}
                >
                  Time
                  {sortConfig?.key === "startedDateTime" && (
                    sortConfig.direction === "ascending" ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-emerald-400 uppercase tracking-wider border-b border-zinc-700">
                <button
                  className="flex items-center gap-1 hover:text-emerald-300"
                  onClick={() => requestSort("request.url")}
                >
                  URL
                  {sortConfig?.key === "request.url" && (
                    sortConfig.direction === "ascending" ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-emerald-400 uppercase tracking-wider border-b border-zinc-700">
                Method
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-emerald-400 uppercase tracking-wider border-b border-zinc-700">
                <button
                  className="flex items-center gap-1 hover:text-emerald-300"
                  onClick={() => requestSort("response.status")}
                >
                  Status
                  {sortConfig?.key === "response.status" && (
                    sortConfig.direction === "ascending" ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-emerald-400 uppercase tracking-wider border-b border-zinc-700">
                <button
                  className="flex items-center gap-1 hover:text-emerald-300"
                  onClick={() => requestSort("time")}
                >
                  Duration
                  {sortConfig?.key === "time" && (
                    sortConfig.direction === "ascending" ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-emerald-400 uppercase tracking-wider border-b border-zinc-700">
                Size
              </th>
              <th className="py-3 px-4 text-center text-xs font-medium text-emerald-400 uppercase tracking-wider border-b border-zinc-700">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-zinc-900 divide-y divide-zinc-800">
            {sortedEntries.map((entry, index) => {
              const isExpanded = expandedRow === `${index}`;
              const url = new URL(entry.request.url);
              const urlDisplay = `${url.hostname}${url.pathname}`;
              
              return (
                <React.Fragment key={index}>
                  <tr 
                    className={`hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
                      isExpanded ? "bg-zinc-50 dark:bg-zinc-800" : ""
                    }`}
                  >
                    <td className="py-3 px-4 text-sm text-zinc-500">
                      {formatDate(entry.startedDateTime)}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="truncate max-w-xs">
                        {urlDisplay}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={
                        entry.request.method === "GET" 
                          ? "text-blue-500 dark:text-blue-400" 
                          : entry.request.method === "POST"
                          ? "text-emerald-500 dark:text-emerald-400"
                          : "text-amber-500 dark:text-amber-400"
                      }>
                        {entry.request.method}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={getStatusColor(entry.response.status)}>
                        {entry.response.status} {entry.response.statusText}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-zinc-500">
                      {formatTime(entry.time)}
                    </td>
                    <td className="py-3 px-4 text-sm text-zinc-500">
                      {formatSize(entry.response.content.size)}
                    </td>
                    <td className="py-3 px-4 text-sm text-center">
                      <button
                        className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700"
                        onClick={() => 
                          setExpandedRow(isExpanded ? null : `${index}`)
                        }
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-zinc-400" />
                        )}
                      </button>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-zinc-50 dark:bg-zinc-800">
                      <td colSpan={7} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white dark:bg-zinc-900 p-4 rounded-md shadow">
                            <div className="mb-2">
                              <h3 className="text-sm font-medium text-emerald-400">Request Details</h3>
                            </div>
                            <div className="mb-4">
                              <div className="text-xs text-zinc-500 mb-1">URL</div>
                              <div className="text-sm break-all flex justify-between items-start">
                                <span className="mr-2">{entry.request.url}</span>
                                <CopyButton text={entry.request.url} className="hover:bg-zinc-800 flex-shrink-0 mt-1" />
                              </div>
                            </div>
                            <div className="mb-4">
                              <h4 className="text-xs text-zinc-500 mb-1">Headers</h4>
                              <div className="flex justify-end mb-1">
                                <CopyButton 
                                  text={entry.request.headers.map(h => `${h.name}: ${h.value}`).join('\n')} 
                                  className="hover:bg-zinc-800" 
                                />
                              </div>
                              <div className="bg-zinc-50 dark:bg-zinc-800 p-2 rounded text-xs font-mono overflow-x-auto">
                                {entry.request.headers.map((header, i) => (
                                  <div key={i} className="mb-1 flex">
                                    <div className="flex-grow">
                                      <span className="font-medium">{header.name}:</span>{" "}
                                      {header.value}
                                    </div>
                                    <CopyButton 
                                      text={`${header.name}: ${header.value}`} 
                                      className="ml-1 scale-90 hover:bg-zinc-700" 
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            {entry.request.postData && (
                              <div>
                                <h4 className="text-xs text-zinc-500 mb-1">Request Body</h4>
                                <div className="flex justify-end mb-1">
                                  <CopyButton 
                                    text={entry.request.postData.text || ''} 
                                    className="hover:bg-zinc-800" 
                                  />
                                </div>
                                <div className="bg-zinc-50 dark:bg-zinc-800 p-2 rounded text-xs font-mono overflow-x-auto">
                                  <pre>{entry.request.postData.text}</pre>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="bg-white dark:bg-zinc-900 p-4 rounded-md shadow">
                            <div className="mb-2">
                              <h3 className="text-sm font-medium text-emerald-400">Response Details</h3>
                            </div>
                            <div className="mb-2">
                              <div className="text-xs text-zinc-500 mb-1">Status</div>
                              <div className={`text-sm ${getStatusColor(entry.response.status)} flex justify-between items-center`}>
                                <span>{entry.response.status} {entry.response.statusText}</span>
                                <CopyButton 
                                  text={`${entry.response.status} ${entry.response.statusText}`}
                                  className="hover:bg-zinc-800"
                                />
                              </div>
                            </div>
                            <div className="mb-4">
                              <h4 className="text-xs text-zinc-500 mb-1">Headers</h4>
                              <div className="flex justify-end mb-1">
                                <CopyButton 
                                  text={entry.response.headers.map(h => `${h.name}: ${h.value}`).join('\n')} 
                                  className="hover:bg-zinc-800" 
                                />
                              </div>
                              <div className="bg-zinc-50 dark:bg-zinc-800 p-2 rounded text-xs font-mono overflow-x-auto">
                                {entry.response.headers.map((header, i) => (
                                  <div key={i} className="mb-1 flex">
                                    <div className="flex-grow">
                                      <span className="font-medium">{header.name}:</span>{" "}
                                      {header.value}
                                    </div>
                                    <CopyButton 
                                      text={`${header.name}: ${header.value}`} 
                                      className="ml-1 scale-90 hover:bg-zinc-700" 
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            {entry.response.content.text && (
                              <div>
                                <h4 className="text-xs text-zinc-500 mb-1">Response Body</h4>
                                <div className="flex justify-end mb-1">
                                  <CopyButton 
                                    text={entry.response.content.encoding === "base64"
                                      ? "[Base64 encoded content]"
                                      : entry.response.content.text || ''} 
                                    className="hover:bg-zinc-800" 
                                  />
                                </div>
                                <div className="bg-zinc-50 dark:bg-zinc-800 p-2 rounded text-xs font-mono overflow-x-auto max-h-64">
                                  <pre>{
                                    entry.response.content.encoding === "base64"
                                      ? "[Base64 encoded content]"
                                      : entry.response.content.text
                                  }</pre>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
