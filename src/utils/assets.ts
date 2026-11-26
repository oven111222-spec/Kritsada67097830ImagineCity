export function assetPath(relativePath: string): string {
  const clean = relativePath.replace(/^\/+/, '');
  if (
    typeof window !== 'undefined' &&
    (window as unknown as { __LIVE_SERVER_ROOT__?: boolean }).__LIVE_SERVER_ROOT__
  ) {
    return `./public/${clean}`;
  }
  return `./${clean}`;
}
