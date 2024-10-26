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
import { getAllItems } from '@/firebase';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

// Esquema de validação do formulário
const formSchema = z.object({
  frente: z.string().min(1, 'O campo frente é obrigatório').max(255),
  verso: z.string().min(1, 'O campo verso é obrigatório').max(255),
});

interface FlashcardFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  defaultValues?: DocumentData | { frente: string; verso: string } | undefined;
}

export function FlashcardForm({ onSubmit, defaultValues }: FlashcardFormProps) {
  const { idFlashcard } = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const fetchFlashcard = async () => {
    const response: DocumentData = await getAllItems('flashcards');
    const responseByIdFlashcard = response.find(
      (item: DocumentData) => item.id === idFlashcard
    );
    form.setValue('frente', responseByIdFlashcard.frente);
    form.setValue('verso', responseByIdFlashcard.verso);
  };

  useEffect(() => {
    fetchFlashcard();
  }, []);

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="frente"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frente do Flashcard</FormLabel>
              <FormControl>
                <Input placeholder="Frente do Flashcard" {...field} />
              </FormControl>
              <FormDescription>
                Digite aqui o conteúdo da frente do flashcard
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="verso"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verso do Flashcard</FormLabel>
              <FormControl>
                <Input placeholder="Verso do Flashcard" {...field} />
              </FormControl>
              <FormDescription>
                Digite aqui o conteúdo do verso do flashcard
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" isLoading={form.formState.isSubmitting}>
          Adicionar Flashcard
        </Button>
      </form>
    </Form>
  );
}
