import { models } from 'models';

import { AbstactBuilder } from './abstact.builder';


export class BookBuilder implements AbstactBuilder<models.book.Attributes, models.book.RawAttributes> {

    private id?: number;
    private title?: string;
    private description?: string;
    private price?: number;
    private publishedAt?: Date;
    private authorId?: number;
    private updatedAt?: Date;
    private createdAt?: Date;

    constructor(attributes?: models.book.Attributes | models.book.RawAttributes, isRaw = true) {
        if (attributes) {
            if (isRaw) {
                this.mapRaw(attributes);
            } else {
                this.map(attributes);
            }
        }
    }

    public get Id() {
        return this.id;
    };

    public get Title() {
        return this.title;
    };

    public get Description() {
        return this.description;
    };

    public get Price() {
        return this.price;
    };

    public get PublishedAt() {
        return this.publishedAt;
    };

    public get AuthorId() {
        return this.authorId;
    };

    public get UpdatedAt() {
        return this.updatedAt;
    };

    public get CreatedAt() {
        return this.createdAt;
    };

    public setId(id: number): BookBuilder {
        this.id = id;
        return this;
    };

    public setTitle(title: string): BookBuilder {
        this.title = title;
        return this;
    };

    public setDescription(description: string): BookBuilder {
        this.description = description;
        return this;
    };

    public setPrice(price: number): BookBuilder {
        this.price = price;
        return this;
    };

    public setAuthorId(authorId: number): BookBuilder {
        this.authorId = authorId;
        return this;
    };

    public setPublishedAt(publishedAt: Date): BookBuilder {
        this.publishedAt = publishedAt;
        return this;
    };

    public setUpdatedAt(updatedAt: Date): BookBuilder {
        this.updatedAt = updatedAt;
        return this;
    };

    public setCreatedAt(createdAt: Date): BookBuilder {
        this.createdAt = createdAt;
        return this;
    };

    public map(attributes: models.book.Attributes): BookBuilder {
        if (attributes !== undefined) {
            this.setId(attributes.id);
            this.setTitle(attributes.title);
            this.setDescription(attributes.description);
            this.setPrice(attributes.price);
            this.setAuthorId(attributes.authorId);
            this.setPublishedAt(attributes.publishedAt);
            this.setCreatedAt(attributes.createdAt);
            this.setUpdatedAt(attributes.updatedAt);
        }
        return this;
    }

    public mapRaw(attributes: models.book.RawAttributes): BookBuilder {
        if (attributes !== undefined) {
            this.setId(attributes.id);
            this.setTitle(attributes.title);
            this.setDescription(attributes.description);
            this.setPrice(attributes.price);
            this.setAuthorId(attributes.author_id);
            this.setPublishedAt(attributes.published_at);
            this.setCreatedAt(attributes.created_at);
            this.setUpdatedAt(attributes.updated_at);
        }
        return this;
    }

    public validate() {
        // TODO Check id all required attributes ar given
    }

    public build() {
        return new Book(this);
    }

    public buildRaw() {
        return new RawBook(this);
    }

}

export class Book implements models.book.Attributes {
    public id?: number;
    public title: string;
    public authorId: number;
    public description?: string;
    public price?: number;
    public publishedAt?: Date;
    public updatedAt?: Date;
    public createdAt?: Date;

    constructor(builder: BookBuilder) {
        this.id = builder.Id;
        this.title = builder.Title;
        this.description = builder.Description;
        this.price = builder.Price;
        this.publishedAt = builder.PublishedAt;
        this.authorId = builder.AuthorId;
        this.updatedAt = builder.UpdatedAt;
        this.createdAt = builder.CreatedAt;
    }
}

export class RawBook implements models.book.RawAttributes {
    public id?: number;
    public title: string;
    public author_id: number;
    public description?: string;
    public price?: number;
    public published_at?: Date;
    public updated_at?: Date;
    public created_at?: Date;

    constructor(builder: BookBuilder) {
        this.id = builder.Id;
        this.title = builder.Title;
        this.description = builder.Description;
        this.price = builder.Price;
        this.published_at = builder.PublishedAt;
        this.author_id = builder.AuthorId;
        this.updated_at = builder.UpdatedAt;
        this.created_at = builder.CreatedAt;
    }
}
