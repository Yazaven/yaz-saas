// app/components/Submitbuttons.tsx
"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

export const SubmitB = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    const { pending } = useFormStatus();
    
    return (
      <Button 
        ref={ref}
        type="submit"
        disabled={pending}
        {...props}
      >
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          children
        )}
      </Button>
    );
  }
);

SubmitB.displayName = "SubmitButton";