'use client';

import { BreadcrumbComponent } from '@/components/breadcrumb';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Flashcards } from './cards';

const DeckDetail = () => {
  const { id }: { id: string } = useParams();
  const data = [
    {
      href: '/app',
      label: 'Baralhos',
    },
    {
      href: `/app/deck/${id}`,
      label: `Deck ${id}`,
    },
  ];

  return (
    <div>
      <BreadcrumbComponent data={data} />
      <Link href={`/app/deck/${id}/flashcard`}>
        <Button>Adicionar flashcard</Button>
      </Link>
      {/* Renderize as informações do deck aqui */}
      <Flashcards deckId={id} />
    </div>
  );
};

export default DeckDetail;
