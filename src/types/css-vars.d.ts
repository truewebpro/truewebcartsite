// Lets style objects carry CSS custom properties such as { "--d": "1s" }.
import "react";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
