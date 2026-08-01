const gumPositions = ['gum--one', 'gum--two', 'gum--three', 'gum--four'];

export default function HeroFallback({ lidRef, loading = false }) {
  return (
    <div className={`case-fallback${loading ? ' is-loading' : ''}`} aria-hidden="true">
      <div className="case-fallback__shadow" />
      <div className="case-fallback__lid" ref={lidRef}>
        <div className="case-fallback__lid-shell">
          <span>TABS</span>
        </div>
        <div className="case-fallback__lid-inner" />
      </div>
      <div className="case-fallback__base">
        <div className="case-fallback__tray">
          {gumPositions.map((position, index) => (
            <span className={`fallback-gum ${position}`} key={position}>
              <i>{String(index + 1).padStart(2, '0')}</i>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
