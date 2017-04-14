export interface AbstactModel<Attributes, RawAttributes> {
    toJson(): Attributes;
    toDatabaseObject(): RawAttributes;
}
