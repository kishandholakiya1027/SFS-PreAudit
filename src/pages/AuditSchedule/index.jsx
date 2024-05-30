import React from "react";
import { Outlet } from "react-router-dom";
import ExpenseSidebar from "./ExpenseSidebar";

const Index = () => {
  return (
    <div className="flex min-h-[calc(100vh-227px)] mt-[30px] gap-[30px]">
      <aside className="h-fit sticky top-0">
        <ExpenseSidebar />
      </aside>
      <main className="w-full min-h-[calc(100vh-227px)] overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default Index;
