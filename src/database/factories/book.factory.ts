import { lorem, random, date } from 'faker';
import { models } from 'models';

import { BookBuilder } from '../../builders/book.builder';


export const makeBook = (authorId: number): BookBuilder => {
    return (new BookBuilder())
        .setTitle(lorem.word())
        .setDescription(lorem.sentences(5))
        .setPrice(random.number(120) + (random.number(99) / 100))
        .setPublishedAt(date.past())
        .setAuthorId(authorId);
};
