export interface AbstactBuilder<Attributes, RawAttributes> {
    build(): Attributes;
    buildRaw(): RawAttributes;
}
