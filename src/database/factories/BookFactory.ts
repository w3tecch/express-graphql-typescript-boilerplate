import { lorem, random, date } from 'faker';

import { BookModel } from '../../models/BookModel';


export const makeBook = (authorId: number): BookModel => {
    return (new BookModel())
        .setTitle(lorem.word())
        .setDescription(lorem.sentences(5))
        .setPrice(random.number(120) + (random.number(99) / 100))
        .setPublishedAt(date.past())
        .setAuthorId(authorId);
};
