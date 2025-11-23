import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  className = "",
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-blue-900 text-white hover:bg-blue-800 focus:ring-blue-500 shadow-md hover:shadow-lg",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-md hover:shadow-lg",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-md hover:shadow-lg",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500 shadow-md hover:shadow-lg",
    outline: "bg-white text-blue-900 border-2 border-blue-900 hover:bg-blue-50 focus:ring-blue-500 shadow-sm hover:shadow-md",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
