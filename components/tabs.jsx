"use client";

import { memo } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import DragAndDrop from './animation/dragAndDrop';
import KendoTaskboard from './kendo/tasks/kendoTaskboard';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative right-0">
        <ul className="relative gap-0.5 flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-slate-100" data-tabs="tabs" role="list">
          <li className="z-30 flex-auto text-center">
            <a className={`${activeTab === "dashboard" ? "bg-[#87cced9b] hover:bg-[#3bb4e87e] shadow-lg" : "bg-slate-100 hover:bg-slate-200"} z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-slate-800`}
              data-tab-target="" role="tab" aria-selected="true"
              onClick={() => setActiveTab("dashboard")}
            >
              <Image
                src="/hero-images/layers.png"
                alt="Manage Applications"
                width={32}
                height={32}
                className="w-5 h-5 mr-2"
                loading="eager"
              />
              <span className="ml-1">Manage Applications</span>
            </a>
          </li>
          <li className="z-30 flex-auto text-center">
            <a className={`${activeTab === "profile" ? "bg-[#87cced9b] hover:bg-[#3bb4e87e] shadow-lg" : "bg-slate-100 hover:bg-slate-200"} z-30 flex items-center justify-center w-full px-0 py-2 mb-0 text-sm transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-600`}
              data-tab-target="" role="tab" aria-selected="false"
              onClick={() => setActiveTab("profile")}
            >
              <Image
                src="/hero-images/join-us.png"
                alt="Manage Applications"
                width={32}
                height={32}
                className="w-5 h-5 mr-2"
                loading="eager"
              />
              <span className="ml-1">Get Hired</span>
            </a>
          </li>
          <li className="z-30 flex-auto text-center">
            <a className={`${activeTab === "settings" ? "bg-[#87cced9b] hover:bg-[#3bb4e87e] shadow-lg" : "bg-slate-100 hover:bg-slate-200"} z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-800`}
              data-tab-target="" role="tab" aria-selected="false"
              onClick={() => setActiveTab("settings")}
            >
              <Image
                src="/hero-images/tasks.png"
                alt="Manage Applications"
                width={32}
                height={32}
                className="w-5 h-5 mr-2"
                loading="eager"
              />
              <span className="ml-1">Organize Boards</span>
            </a>
          </li>
          <li className="z-30 flex-auto text-center">
            <a className={`${activeTab === "animation" ? "bg-[#87cced9b] hover:bg-[#3bb4e87e] shadow-lg" : "bg-slate-100 hover:bg-slate-200"} z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-800`}
              data-tab-target="" role="tab" aria-selected="false"
              onClick={() => setActiveTab("animation")}
            >
              <Image
                src="/hero-images/tasks.png"
                alt="Manage Applications"
                width={32}
                height={32}
                className="w-5 h-5 mr-2"
                loading="eager"
              />
              <span className="ml-1">Drag and Drop</span>
            </a>
          </li>
          <li className="z-30 flex-auto text-center">
            <a className={`${activeTab === "kendo" ? "bg-[#87cced9b] hover:bg-[#3bb4e87e] shadow-lg" : "bg-slate-100 hover:bg-slate-200"} z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-800`}
              data-tab-target="" role="tab" aria-selected="false"
              onClick={() => setActiveTab("kendo")}
            >
              <Image
                src="/hero-images/tasks.png"
                alt="Manage Applications"
                width={32}
                height={32}
                className="w-5 h-5 mr-2"
                loading="eager"
              />
              <span className="ml-1">Kendo Tasks</span>
            </a>
          </li>
        </ul>
        <div data-tab-content="" className="p-5">
          {activeTab === "dashboard" && (
            <Image
              src="/hero-images/hero1.png"
              alt="Manage Applications"
              style={{width: "auto", height:"auto"}}
              width={1200}
              height={800}
              className="mx-auto rounded-lg shadow-lg max-w-240"
              loading="eager"
            />
          )}
          {activeTab === "profile" && (
            <Image
              src="/hero-images/hero2.png"
              alt="Hire Top Talent"
              style={{width: "auto", height:"auto"}}
              width={1200}
              height={800}
              className="mx-auto rounded-lg shadow-lg max-w-240"
            />
          )}
          {activeTab === "settings" && (
            <Image
              src="/hero-images/hero3.png"
              alt="Hire Top Talent"
              width={1200}
              height={800}
              style={{width: "auto", height:"auto"}}
              className="mx-auto rounded-lg shadow-lg max-w-240"
            />
          )}
          {activeTab === "animation" && <DragAndDrop />}
          {activeTab === "kendo" && <KendoTaskboard />}
        </div>
      </div>
    </div>
  );
};

export default memo(Tabs);