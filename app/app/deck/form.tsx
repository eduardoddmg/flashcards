'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DocumentData } from 'firebase/firestore';

// Esquema de validação do formulário
const formSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório').max(255),
  descricao: z.string().min(1, 'A descrição é obrigatória').max(255),
});

interface DeckFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  defaultValues?: DocumentData | { descricao: string } | undefined;
}

export function DeckForm({ onSubmit, defaultValues }: DeckFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Deck</FormLabel>
              <FormControl>
                <Input placeholder="Nome do Deck" {...field} />
              </FormControl>
              <FormDescription>Digite aqui o nome do deck</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Descrição do Deck" {...field} />
              </FormControl>
              <FormDescription>Digite aqui a descrição do deck</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" isLoading={form.formState.isSubmitting}>
          Adicionar Deck
        </Button>
      </form>
    </Form>
  );
}
