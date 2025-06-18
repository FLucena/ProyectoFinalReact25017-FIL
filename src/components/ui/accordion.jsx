"use client"

import * as React from "react"
import { Accordion as BootstrapAccordion } from 'react-bootstrap'

const Accordion = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <BootstrapAccordion
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </BootstrapAccordion>
  )
)
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <BootstrapAccordion.Item
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </BootstrapAccordion.Item>
  )
)
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <BootstrapAccordion.Header>
      <BootstrapAccordion.Button
        ref={ref}
        className={className}
        {...props}
      >
        {children}
      </BootstrapAccordion.Button>
    </BootstrapAccordion.Header>
  )
)
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <BootstrapAccordion.Body
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </BootstrapAccordion.Body>
  )
)
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } 