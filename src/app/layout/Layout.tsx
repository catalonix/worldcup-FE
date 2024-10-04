import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(true);

  return (
    <div className="layout">
      <div className="layout__content">
        <Outlet />
        <div className="layout__content-body">{}</div>
      </div>
    </div>
  );
};

export default Layout;
