import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { getAllItems } from '@/firebase';
import { DocumentData } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

type Deck =
  | {
      id: string;
      nome: string;
      descricao: string;
    }
  | DocumentData;

export const Cards = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    const response = await getAllItems('decks');
    setDecks(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(decks);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-5 ">
      {decks.map((deck: Deck) => (
        <Card
          key={deck.id}
          className="w-full cursor-pointer"
          onClick={() => router.push(`/app/deck/${deck.id}`)}
        >
          <CardHeader>
            <CardTitle>{deck.nome}</CardTitle>
            <CardDescription>{deck.descricao}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
