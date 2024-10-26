import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

interface BreadcrumbData {
  href: string;
  label: string;
}

interface BreadcrumbComponentProps {
  data: BreadcrumbData[];
}

export const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({
  data,
}) => {
  return (
    <Breadcrumb className="mb-5">
      <BreadcrumbList>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index === data.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < data.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
