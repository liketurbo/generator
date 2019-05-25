declare module React {
  interface ComponentLifecycle<P, S, SS = any>
    extends NewLifecycle<P, S, SS>,
      DeprecatedLifecycle<P, S> {
    /**
     * Catches exceptions generated in descendant components. Unhandled exceptions will cause
     * the entire component tree to unmount.
     */
    componentDidCatch?(error: any): void;
  }
}
