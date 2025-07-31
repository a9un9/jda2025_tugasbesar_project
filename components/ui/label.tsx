// components/ui/label.tsx
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={`text-sm font-medium leading-none ${className}`}
      {...props}
    />
  );
}
