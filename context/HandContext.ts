import { createContext } from 'react';
import { CardInterface } from '../helper/Card';

export const HandContext = createContext<CardInterface[]>([]);
