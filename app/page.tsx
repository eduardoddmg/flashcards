'use client';

import { ThumbsUpIcon, ZapIcon } from 'lucide-react';

import {
  CalendarIcon,
  ScissorsIcon,
  ShieldCheckIcon,
  UserIcon,
} from 'lucide-react';
import Image from 'next/image';
import PricingSectionCards from './pricing';

const Page = () => {
  return (
    <main className="m-auto py-5">
      {/* SEÇÃO INICIAL */}
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="container">
          <div className="max-w-2xl text-center mx-auto">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Crie e Revise Flashcards com Facilidade
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">
              Nosso sistema de criação de flashcards permite que você organize
              seus estudos, revise conteúdos importantes e melhore seu
              aprendizado.
            </p>
          </div>
          <div className="mt-10 relative max-w-5xl mx-auto">
            <Image
              src="/flashcards-hero.png"
              className="rounded-xl"
              alt="Image Description"
              width="1024"
              height="480"
            />
            <div className="absolute bottom-12 -start-20 -z-[1] w-48 h-48 bg-gradient-to-b from-primary-foreground via-primary-foreground to-background p-px rounded-lg">
              <div className="w-48 h-48 rounded-lg bg-background/10" />
            </div>
            <div className="absolute -top-12 -end-20 -z-[1] w-48 h-48 bg-gradient-to-t from-primary-foreground via-primary-foreground to-background p-px rounded-full">
              <div className="w-48 h-48 rounded-full bg-background/10" />
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO DE BENEFÍCIOS */}
      <div className="container py-24 lg:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
            <div className="space-y-6 lg:space-y-10">
              {/* Benefício 1 */}
              <div className="flex">
                <CalendarIcon className="flex-shrink-0 mt-2 h-8 w-8" />
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Revisões Programadas
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Programe revisões automáticas para garantir que você nunca
                    esqueça o que aprendeu.
                  </p>
                </div>
              </div>
              {/* Benefício 2 */}
              <div className="flex">
                <UserIcon className="flex-shrink-0 mt-2 h-8 w-8" />
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Gestão de Conteúdo
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Organize seus flashcards por temas, disciplinas e níveis de
                    dificuldade.
                  </p>
                </div>
              </div>
              {/* Benefício 3 */}
              <div className="flex">
                <ShieldCheckIcon className="flex-shrink-0 mt-2 h-8 w-8" />
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Segurança de Dados
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Seus dados são protegidos com a mais alta segurança,
                    garantindo a privacidade do seu conteúdo.
                  </p>
                </div>
              </div>
            </div>
            {/* Coluna 2 */}
            <div className="space-y-6 lg:space-y-10">
              {/* Benefício 4 */}
              <div className="flex">
                <ScissorsIcon className="flex-shrink-0 mt-2 h-8 w-8" />
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Criação Fácil de Flashcards
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Crie flashcards de forma rápida e intuitiva, com suporte a
                    imagens e textos.
                  </p>
                </div>
              </div>
              {/* Benefício 5 */}
              <div className="flex">
                <ZapIcon className="flex-shrink-0 mt-2 h-8 w-8" />
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Notificações Instantâneas
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Receba notificações para lembrar de suas revisões e manter
                    seu aprendizado em dia.
                  </p>
                </div>
              </div>
              {/* Benefício 6 */}
              <div className="flex">
                <ThumbsUpIcon className="flex-shrink-0 mt-2 h-8 w-8" />
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Simples e Eficiente
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Fácil de usar, com interface intuitiva que otimiza seu tempo
                    e melhora seu aprendizado.
                  </p>
                </div>
              </div>
            </div>
            {/* End Coluna 2 */}
          </div>
          {/* End Grid */}
        </div>
      </div>

      {/* SEÇÃO DE PREÇOS */}
      <PricingSectionCards />
      {/* SEÇÃO DE FOOTER */}
      <footer className="w-full py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Desenvolvido por{' '}
            <a
              href="https://github.com/eduardoddmg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80"
            >
              Eduardo Melo
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Page;
