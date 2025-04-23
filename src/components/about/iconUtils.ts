import {
  Code,
  Database,
  LucideIcon,
  Paintbrush,
  Server,
  Video,
  Zap,
} from "lucide-react";
import React, { ComponentType, ReactElement } from "react";

export const iconMap: Record<string, LucideIcon> = {
  Code: Code,
  Database: Database,
  Server: Server,
  Paintbrush: Paintbrush,
  Video: Video,
  Zap: Zap,
};

export const renderIcon = (
  iconName: keyof typeof iconMap
): ReactElement | null => {
  const IconComponent = iconMap[iconName] as ComponentType<{
    className?: string;
  }>;
  return IconComponent
    ? React.createElement(IconComponent, { className: "h-5 w-5" })
    : null;
};
