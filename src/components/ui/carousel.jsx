"use client"

import * as React from "react"
import { Carousel as BootstrapCarousel } from 'react-bootstrap'

const Carousel = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <BootstrapCarousel
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </BootstrapCarousel>
  )
)
Carousel.displayName = "Carousel"

const CarouselItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <BootstrapCarousel.Item
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </BootstrapCarousel.Item>
  )
)
CarouselItem.displayName = "CarouselItem"

const CarouselCaption = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <BootstrapCarousel.Caption
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </BootstrapCarousel.Caption>
  )
)
CarouselCaption.displayName = "CarouselCaption"

export { Carousel, CarouselItem, CarouselCaption } 