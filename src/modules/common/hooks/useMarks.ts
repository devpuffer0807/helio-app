import { useEffect, useRef, useState } from 'react';

import { Mark } from '../components';

const DEFAULT_MARKS: Mark[] = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 75,
    label: '75%',
  },
  {
    value: 100,
    label: '100%',
  },
];

export function useMarks(markValue: number, markSteps = DEFAULT_MARKS): Mark[] {
  const [marks, setMarks] = useState<Mark[]>(markSteps);
  const markValueRef = useRef<number>();

  useEffect(() => {
    if (markValueRef.current === markValue) {
      return;
    }
    markValueRef.current = markValue;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, ...otherMarks] = marks;
    setMarks([
      {
        value: 0,
        label: `${markValue}%`,
      },
      ...otherMarks,
    ]);
  }, [markValue, marks]);

  return marks;
}
