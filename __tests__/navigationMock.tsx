import { vi } from "vitest";

// next-intl's createNavigation needs the Next.js router; tests use plain anchors.
export const navigationMock = {
  Link: ({
    href,
    children,
    ...rest
  }: {
    href: string | { pathname: string; query?: Record<string, string | number> };
    children: React.ReactNode;
  } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) => {
    const url =
      typeof href === "string"
        ? href
        : `${href.pathname}?${new URLSearchParams(
            Object.entries(href.query ?? {}).map(([k, v]) => [k, String(v)]),
          )}`;
    return (
      <a href={url} {...rest}>
        {children}
      </a>
    );
  },
  usePathname: vi.fn(() => "/"),
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
  redirect: vi.fn(),
};
