import { models } from 'models';

import { AbstactBuilder } from './abstact.builder';


export class AuthorBuilder implements AbstactBuilder<models.author.Attributes, models.author.RawAttributes> {

    private id?: number;
    private firstName: string;
    private lastName: string;
    private updatedAt?: Date;
    private createdAt?: Date;

    constructor(attributes?: models.author.Attributes | models.author.RawAttributes, isRaw = true) {
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

    public get FirstName() {
        return this.firstName;
    };

    public get LastName() {
        return this.lastName;
    };

    public get UpdatedAt() {
        return this.updatedAt;
    };

    public get CreatedAt() {
        return this.createdAt;
    };

    public setId(id: number): AuthorBuilder {
        this.id = id;
        return this;
    };

    public setFirstName(firstName: string): AuthorBuilder {
        this.firstName = firstName;
        return this;
    };
    public setLastName(lastName: string): AuthorBuilder {
        this.lastName = lastName;
        return this;
    };

    public setUpdatedAt(updatedAt: Date): AuthorBuilder {
        this.updatedAt = updatedAt;
        return this;
    };

    public setCreatedAt(createdAt: Date): AuthorBuilder {
        this.createdAt = createdAt;
        return this;
    };

    public map(attributes: models.author.Attributes): AuthorBuilder {
        if (attributes !== undefined) {
            this.setId(attributes.id);
            this.setFirstName(attributes.firstName);
            this.setLastName(attributes.lastName);
            this.setCreatedAt(attributes.createdAt);
            this.setUpdatedAt(attributes.updatedAt);
        }
        return this;
    }

    public mapRaw(attributes: models.author.RawAttributes): AuthorBuilder {
        if (attributes !== undefined) {
            this.setId(attributes.id);
            this.setFirstName(attributes.first_name);
            this.setLastName(attributes.last_name);
            this.setCreatedAt(attributes.created_at);
            this.setUpdatedAt(attributes.updated_at);
        }
        return this;
    }

    public validate(): boolean {
        // TODO Check id all required attributes ar given
        return true;
    }

    public build(): Author {
        return new Author(this);
    }

    public buildRaw(): RawAuthor {
        return new RawAuthor(this);
    }

}

export class Author implements models.author.Attributes {
    public id?: number;
    public firstName: string;
    public lastName: string;
    public updatedAt?: Date;
    public createdAt?: Date;

    constructor(builder: AuthorBuilder) {
        this.id = builder.Id;
        this.firstName = builder.FirstName;
        this.lastName = builder.LastName;
        this.updatedAt = builder.UpdatedAt;
        this.createdAt = builder.CreatedAt;
    }
}

export class RawAuthor implements models.author.RawAttributes {
    public id?: number;
    public first_name: string;
    public last_name: string;
    public updated_at?: Date;
    public created_at?: Date;

    constructor(builder: AuthorBuilder) {
        this.id = builder.Id;
        this.first_name = builder.FirstName;
        this.last_name = builder.LastName;
        this.updated_at = builder.UpdatedAt;
        this.created_at = builder.CreatedAt;
    }
}
