import * as React from "react"
import { Button as BootstrapButton } from 'react-bootstrap'

const Button = React.forwardRef(
  ({ className, variant = 'primary', size, asChild = false, ...props }, ref) => {
    return (
      <BootstrapButton
        variant={variant}
        size={size}
        className={className}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button } 