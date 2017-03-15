declare module 'models' {

    export namespace models {
        namespace book {

            interface Attributes {
                id?: number;
                title?: string;
                description?: string;
                price?: number;
                publishedAt?: Date;
                authorId?: number;
                updatedAt?: Date;
                createdAt?: Date;
            }

            interface RawAttributes {
                id?: number;
                title?: string;
                description?: string;
                price?: number;
                published_at?: Date;
                author_id?: number;
                updated_at?: Date;
                created_at?: Date;
            }

        }
    }
}
