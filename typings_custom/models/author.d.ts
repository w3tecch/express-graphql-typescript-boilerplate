declare module 'models' {

    export namespace models {
        namespace author {

            interface Attributes {
                id?: number;
                firstName?: string;
                lastName?: string;
                updatedAt?: Date;
                createdAt?: Date;
            }

            interface RawAttributes {
                id?: number;
                first_name?: string;
                last_name?: string;
                updated_at?: Date;
                created_at?: Date;
            }

        }
    }
}
