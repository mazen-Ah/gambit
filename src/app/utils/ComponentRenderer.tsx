import { componentMap, hasComponent, ComponentName } from "./ComponentMap";

interface ComponentRendererProps {
  name: string;
  data?: any;
  props?: any;
  className?: any; // Add className prop
}

export default function ComponentRenderer({
  name,
  data = {},
  props = {},
  className,
}: ComponentRendererProps) {
  if (!hasComponent(name)) {
    console.warn(`Component "${name}" not found in componentMap`);
    return null;
  }

  const Component = componentMap[name as ComponentName];
  return (
    <Component data={data} {...props} className={className || props?.className} />
  );
}
