import { models } from 'models';

import { AbstactModel } from './abstact.model';


export class AuthorModel implements AbstactModel<models.author.Attributes, models.author.RawAttributes> {

    private id?: number;
    private firstName: string;
    private lastName: string;
    private updatedAt?: Date;
    private createdAt?: Date;

    constructor(attributes?: models.author.Attributes | models.author.RawAttributes, isRaw = true) {
        if (attributes) {
            if (isRaw) {
                this.mapDatabaseObject(attributes);
            } else {
                this.mapJson(attributes);
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

    public setId(id: number): AuthorModel {
        this.id = id;
        return this;
    };

    public setFirstName(firstName: string): AuthorModel {
        this.firstName = firstName;
        return this;
    };
    public setLastName(lastName: string): AuthorModel {
        this.lastName = lastName;
        return this;
    };

    public setUpdatedAt(updatedAt: Date): AuthorModel {
        this.updatedAt = updatedAt;
        return this;
    };

    public setCreatedAt(createdAt: Date): AuthorModel {
        this.createdAt = createdAt;
        return this;
    };

    public mapJson(attributes: models.author.Attributes): AuthorModel {
        if (attributes !== undefined) {
            this.setId(attributes.id);
            this.setFirstName(attributes.firstName);
            this.setLastName(attributes.lastName);
            this.setCreatedAt(attributes.createdAt);
            this.setUpdatedAt(attributes.updatedAt);
        }
        return this;
    }

    public mapDatabaseObject(attributes: models.author.RawAttributes): AuthorModel {
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
        return !!this.firstName && !!this.lastName;
    }

    public toJson(): Author {
        return new Author(this);
    }

    public toDatabaseObject(): RawAuthor {
        return new RawAuthor(this);
    }

}

export class Author implements models.author.Attributes {
    public id?: number;
    public firstName: string;
    public lastName: string;
    public updatedAt?: Date;
    public createdAt?: Date;

    constructor(builder: AuthorModel) {
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

    constructor(builder: AuthorModel) {
        this.id = builder.Id;
        this.first_name = builder.FirstName;
        this.last_name = builder.LastName;
        this.updated_at = builder.UpdatedAt;
        this.created_at = builder.CreatedAt;
    }
}
