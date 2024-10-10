import React from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import breadcrumbNameMap from 'app/routing/breadCrumbNameMap';
import { AppPaths } from '~/app/routing/app-routing';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const items = pathnames.map((pathname, index) => {
    const route = `/${pathnames.slice(0, index + 1).join('/')}`;
    const title = breadcrumbNameMap[route.slice(1) as AppPaths] || pathname;
    return {
      title: (
        <div>
          <div className="nav-title"> {title}</div>
          <Link to={route}>Home / {title || 'Home'}</Link>
        </div>
      ),
      key: route
    };
  });

  return <AntBreadcrumb items={items} />;
};

export default Breadcrumb;
