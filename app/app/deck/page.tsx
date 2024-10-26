'use client';

import { DocumentData } from 'firebase/firestore';
import { DeckForm } from './form';
import { BreadcrumbComponent } from '@/components/breadcrumb';
import { addItem } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

const data = [
  {
    href: '/app',
    label: 'Baralhos',
  },
  {
    href: '/app/deck/adicionar',
    label: 'Adicionar',
  },
];

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }
  }, [status, router]);

  // Quando a sessão está carregando
  if (status === 'loading') {
    return (
      <div>
        <Loader2 />
      </div>
    );
  }

  // Se a sessão não estiver autenticada, redireciona para a página de login
  if (status === 'unauthenticated') {
    return <p>Acesso negado</p>;
  }

  const onSubmit = async (data: DocumentData) => {
    // Adiciona um novo item no banco de dados
    await addItem('decks', data);
    // Cria um toast e redireciona para /app/
    toast({
      title: 'Baralho adicionado',
      description: 'Seu baralho foi adicionado com sucesso.',
      className: 'bg-green-700 text-white',
    });
    router.push('/app');
  };
  return (
    <div>
      <BreadcrumbComponent data={data} />
      <DeckForm onSubmit={onSubmit} />
    </div>
  );
};

export default Page;
