import {createContext} from 'react';
import {ConverterContextType} from '../types/ConverterTypes';

export const ConverterContext = createContext<ConverterContextType | null>(
  null,
);
