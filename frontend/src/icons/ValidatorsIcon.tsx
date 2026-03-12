export function ValidatorsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="1" />
      <path d="M12 1v6m0 6v6" />
      <path d="M4.22 4.22l4.24 4.24m5.08 0l4.24-4.24" />
      <path d="M1 12h6m6 0h6" />
      <path d="M4.22 19.78l4.24-4.24m5.08 0l4.24 4.24" />
    </svg>
  );
}
