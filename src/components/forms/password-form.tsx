import {
  checkPasswordStrength,
  getStrengthColor,
  getStrengthLabel,
  requirements,
} from "@/utils/passwordUtils";
import { Check, X } from "lucide-react";

interface Props {
  password: string;
}

export function PasswordStrengthIndicator({ password }: Props) {
  return (
    <div className="mt-4">
      <div className="flex items-center mb-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${getStrengthColor(
              checkPasswordStrength(password)
            )}`}
            style={{
              width: `${
                (checkPasswordStrength(password) / requirements.length) * 100
              }%`,
            }}></div>
        </div>
        <span className="ml-2 text-sm font-medium">
          {getStrengthLabel(checkPasswordStrength(password))}
        </span>
      </div>
      <ul className="space-y-1">
        {requirements.map((requirement, index) => (
          <li key={index} className="flex items-center text-sm">
            {requirement.re.test(password) ? (
              <Check className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <X className="h-4 w-4 text-red-500 mr-2" />
            )}
            {requirement.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
