'use client'; // Indica que este componente é renderizado no lado do cliente

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; // Biblioteca de validação de esquema
import { useForm } from 'react-hook-form'; // Hook para gerenciamento de formulários
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Método para registro de usuário no Firebase Auth
import { auth, db } from '@/firebase'; // Configuração do Firebase
import { useToast } from '@/hooks/use-toast'; // Hook para exibir notificações
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react'; // Funções para autenticação com NextAuth
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore'; // Funções para manipulação do Firestore

// Define o esquema de validação usando Zod
const FormSchema = z.object({
  username: z.string().min(1, {
    message: 'Por favor, digite um nome de usuário.',
  }),
  idade: z.string().min(1, {
    message: 'Por favor, digite uma idade válida.',
  }),
  email: z.string().email({
    message: 'Por favor, digite um e-mail válido.',
  }),
  password: z.string().min(8, {
    message: 'A senha deve ter 8 caracteres.',
  }),
});

export default function Register() {
  const { toast } = useToast(); // Hook para exibir notificações (toasts)

  const { status } = useSession(); // Estado da sessão do usuário
  const router = useRouter(); // Hook para navegação

  // Efeito para redirecionar se o usuário já estiver autenticado
  React.useEffect(() => {
    if (status === 'authenticated') {
      router.push('/app'); // Redireciona para a página do app
      return;
    }
  }, [status, router]);

  // Inicializa o formulário com validação usando o Zod
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema), // Resolver para integrar Zod com react-hook-form
    defaultValues: {
      username: '',
      idade: 0,
      email: '', // Valor padrão do campo de e-mail
      password: '', // Valor padrão do campo de senha
    },
  });

  // Função executada no envio do formulário
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // Registro de usuário no Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user; // Obtém o usuário recém-criado

      // Adiciona o usuário à coleção 'users' no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username: data.username,
        idade: data.idade,
        email: data.email,
        idUser: user.uid,
      });

      // Faz o login automático com o NextAuth após o registro
      const signInResult = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      // Verifica se o login foi bem-sucedido
      if (signInResult?.ok) {
        toast({
          title: 'Registro e login bem-sucedidos!', // Mensagem em português
          description: `Bem-vindo, ${user.email}`,
          className: 'bg-green-500 text-white',
        });
        router.push('/app'); // Redireciona o usuário para a página principal após o login
      } else {
        throw new Error('Erro no login após o registro');
      }
    } catch (e) {
      console.error(e);

      // Exibe uma mensagem de erro ao usuário
      toast({
        title: 'Falha no registro ou login', // Mensagem em português
        description:
          'Aconteceu algum erro durante a criação de sua conta. Por favor, tente de novo.',
        variant: 'destructive', // Estilo de erro para o toast
      });
    }
  }

  return (
    // Card do formulário de registro
    <Card className="w-[500px] mx-auto my-20">
      <CardHeader>
        <CardTitle>Registro</CardTitle>
        <CardDescription>
          Adicione as suas credenciais e se cadastre no sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          {/* Formulário de registro */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Campo de nome de usuário */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome de usuário</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Seu nome de usuário" // Placeholder para o campo de nome de usuário
                      {...field}
                    />
                  </FormControl>
                  <FormMessage /> {/* Mensagem de erro se houver */}
                </FormItem>
              )}
            />
            {/* Campo de idade */}
            <FormField
              control={form.control}
              name="idade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Sua idade" // Placeholder para o campo de idade
                      {...field}
                    />
                  </FormControl>
                  <FormMessage /> {/* Mensagem de erro se houver */}
                </FormItem>
              )}
            />
            {/* Campo de e-mail */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com" // Placeholder para o campo de e-mail
                      {...field}
                    />
                  </FormControl>
                  <FormMessage /> {/* Mensagem de erro se houver */}
                </FormItem>
              )}
            />
            {/* Campo de senha */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="*********" // Placeholder para o campo de senha
                      {...field}
                    />
                  </FormControl>
                  <FormMessage /> {/* Mensagem de erro se houver */}
                </FormItem>
              )}
            />
            {/* Botão de enviar */}
            <Button type="submit" isLoading={form.formState.isSubmitting}>
              Enviar
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {/* Link para fazer login */}
        <Button asChild variant="link" className="w-full">
          <Link href="/login">Fazer login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
