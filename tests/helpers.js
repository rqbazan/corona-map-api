export function checkObjectRequiredProps(item, properties) {
    properties.forEach(prop => {
        expect(item).toHaveProperty(prop);
        expect(item[prop]).toBeDefined();
        expect(item[prop]).not.toBeNull();
    });
}
export function checkObjectsRequiredProps(items, properties) {
    items.forEach(item => checkObjectRequiredProps(item, properties));
}
