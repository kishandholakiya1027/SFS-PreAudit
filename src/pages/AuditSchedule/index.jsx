import React from "react";
import { Outlet } from "react-router-dom";
import ExpenseSidebar from "./ExpenseSidebar";

const Index = () => {
  return (
    <div className="flex 2xl:min-h-[calc(100vh-227px)] min-h-[calc(100vh-195px)] mt-[30px] gap-[30px] 2xl:pb-10 pb-6">
      <aside className="h-fit sticky top-0">
        <ExpenseSidebar />
      </aside>
      <main className="w-full 2xl:min-h-[calc(100vh-227px)] min-h-[calc(100vh-195px)] overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default Index;
