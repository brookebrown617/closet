import { supabase } from '@/lib/supabase'
import Item from '@/components/Item'


export default async function Page() {
  const { data: items } = await supabase
    .from('items')
    .select('*')
    .order('title', { ascending: true })

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-800 px-6 py-20">
      <section className="max-w-2xl mx-auto space-y-16">
        
        {/* Header */}
        <header className="space-y-4">
          <h1 className="text-sm uppercase tracking-wide">Archive</h1>
          <p className="text-sm text-neutral-600">
            These are clothes I’ve lived in.  
            If something feels like it should be yours, take it.
          </p>
        </header>

        {/* Items */}
        <ul className="space-y-12">
          {items?.map(item => (
            <li
              key={item.id}
              className={`transition-opacity ${
                item.status === 'claimed'
                  ? 'opacity-40'
                  : 'opacity-100'
              }`}
            >
              <Item item={item} />
            </li>
          ))}
        </ul>

      </section>
    </main>
  )
}
