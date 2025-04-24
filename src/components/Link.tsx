import { forwardRef } from "react";
import { LinkProps, Link as RouterLink } from "react-router";

// Este componente extiende Link y le podés meter estilos o lógica personalizada
export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  return <RouterLink ref={ref} {...props} viewTransition />;
});
