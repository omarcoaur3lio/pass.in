import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface NavLinkProps extends ComponentProps<"a"> {
  active?: boolean;
  children: string;
}

export function NavLink({ active, ...props }: NavLinkProps) {
  return (
    <a
      className={twMerge(
        "font-medium text-sm text-zinc-400",
        active && "text-white cursor-pointer"
      )}
      {...props}
    >
      {props.children}
    </a>
  );
}
