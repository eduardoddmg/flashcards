import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { getAllItems, removeOneItem } from '@/firebase';
import { DocumentData } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';

type Flashcard =
  | {
      id: string;
      frente: string;
      verso: string;
    }
  | DocumentData;

export const Flashcards = ({ deckId }: { deckId: string }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  const fetchFlashcards = async () => {
    const response = await getAllItems('flashcards');
    setFlashcards(response.filter((item) => item.idDeck === deckId));
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  console.log(flashcards);
  const [showVersoStates, setShowVersoStates] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleShowVerso = (id: string) => {
    setShowVersoStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-5 ">
      {flashcards.map((flashcard: Flashcard) => {
        const showVerso = showVersoStates[flashcard.id] || false;
        return (
          <Card
            key={flashcard.id}
            className="w-full cursor-pointer"
            onClick={() => toggleShowVerso(flashcard.id)}
          >
            <CardHeader>
              <CardTitle>
                {showVerso ? flashcard.verso : flashcard.frente}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <div>
                <CardDescription>
                  {showVerso
                    ? 'Clique para ver a frente'
                    : 'Clique para ver o verso'}
                </CardDescription>
              </div>
              <div className="flex space-x-3">
                <Link href={`/app/deck/${deckId}/flashcard/${flashcard.id}`}>
                  <Button variant="secondary">
                    <Edit />
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  onClick={async () => {
                    alert('Deletar flashcard');
                    await removeOneItem('flashcards', flashcard.id);
                    fetchFlashcards();
                  }}
                >
                  <Trash />
                </Button>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
