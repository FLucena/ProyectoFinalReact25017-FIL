"use client"

import * as React from "react"
import { Breadcrumb as BootstrapBreadcrumb } from 'react-bootstrap'

const Breadcrumb = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <BootstrapBreadcrumb
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </BootstrapBreadcrumb>
  )
)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <BootstrapBreadcrumb.Item
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </BootstrapBreadcrumb.Item>
  )
)
BreadcrumbItem.displayName = "BreadcrumbItem"

export { Breadcrumb, BreadcrumbItem } 