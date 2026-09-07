'use client';
export default function RoutingClient({ initialRoutes }: { initialRoutes: unknown[] }) {
  return (
    <div className='bg-surface/5 border border-surface rounded-sm p-8'>
      <p className='text-muted mb-4'>Modify the JSON array below to configure SEO routes and run "npm run build" to apply.</p>
      <textarea className='w-full h-96 bg-background text-foreground font-mono p-4 border border-surface rounded-sm' defaultValue={JSON.stringify(initialRoutes, null, 2)} readOnly />
      <p className='text-emerald-500 mt-4'>* Advanced UI coming soon. Currently using fallback DB sync.</p>
    </div>
  );
}
