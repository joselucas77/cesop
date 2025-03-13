const rootUrls = [
  "/portal/cidadao",
  "/portal/central",
  "/portal/prefeitura",
  "/portal/gestor",
];

export function isActiveLink(currentPath: string, itemPath: string): boolean {
  if (rootUrls.some((item) => item === itemPath)) {
    return currentPath === itemPath;
  }

  const currentPathParts = currentPath.split("/").filter(Boolean);
  const itemPathParts = itemPath.split("/").filter(Boolean);

  return itemPathParts.every((part, index) => part === currentPathParts[index]);
}
