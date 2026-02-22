export function Cross(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" role="img" aria-label="No" {...props}>
      <path
        d="M7.75 7.75L16.25 16.25M16.25 7.75L7.75 16.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
