import * as LucideIcons from "lucide-react";

export const IconRenderer = ({ name, size = 16, className = "", color }) => {
    const LucideIcon = LucideIcons[name];

    return LucideIcon ? (
        <LucideIcon size={size} className={className} color={color} />
    ) : null;
};