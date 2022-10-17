import {Dispatch, SetStateAction} from 'react';

export type DocumentRowProps = {
  expeditionDate: string;
  show: boolean;
  document: {type: string; value: string};
  setDocument: Dispatch<
    SetStateAction<{
      type: string;
      value: string;
    }>
  >;
  setExpeditionDate: Dispatch<SetStateAction<string>>;
};
