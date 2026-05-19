import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

const DashboardLayout = ({ children, userRole, userName }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FCFAF5] flex">
      <DashboardSidebar isOpen={open} setIsOpen={setOpen} userRole={userRole} />
      <div className="flex-1 min-w-0 flex flex-col">
        <DashboardHeader onMenuToggle={() => setOpen((value) => !value)} userRole={userRole} userName={userName} />
        <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
