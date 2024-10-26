'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Page = () => {
  const { status } = useSession();

  const router = useRouter();

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

  return (
    <div>
      <Link href="/app/deck/adicionar">
        <Button variant="secondary">Adicionar Baralho</Button>
      </Link>
    </div>
  );
};

export default Page;
