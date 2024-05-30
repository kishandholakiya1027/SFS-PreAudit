import React from "react";
import { Outlet } from "react-router-dom";
import ExpenseSidebar from "./ExpenseSidebar";

const PreAuditDocumentaion = () => {
  return (
    <div className="flex mt-[30px] gap-[30px]">
      <aside className="sticky top-0">
        <ExpenseSidebar />
      </aside>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default PreAuditDocumentaion;
