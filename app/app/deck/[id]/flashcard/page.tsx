'use client';

import { DocumentData } from 'firebase/firestore';
import { FlashcardForm } from './form';
import { addItem } from '@/firebase';
import { toast } from '@/hooks/use-toast';
import { useParams, useRouter } from 'next/navigation';
import { BreadcrumbComponent } from '@/components/breadcrumb';

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const onSubmit = async (data: DocumentData) => {
    data.idDeck = id;
    // Adiciona um novo item no banco de dados
    await addItem('flashcards', data);
    // Cria um toast e redireciona para /app/
    toast({
      title: 'Flashcard adicionado',
      description: 'Seu flashcard foi adicionado com sucesso.',
      className: 'bg-green-700 text-white',
    });
    router.push(`/app/deck/${id}`);
  };

  const links = [
    {
      href: '/app',
      label: 'Baralhos',
    },
    {
      href: `/app/deck/${id}`,
      label: `Deck ${id}`,
    },
    {
      href: `/app/deck/${id}/flashcard`,
      label: 'Adicionar flashcard',
    },
  ];

  return (
    <div>
      <BreadcrumbComponent data={links} />
      <strong>Adicione um novo flashcard ao baralho</strong>
      <FlashcardForm onSubmit={onSubmit} />
    </div>
  );
};
export default Page;
