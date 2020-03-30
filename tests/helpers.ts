export function checkObjectRequiredProps<T>(item: T, properties: string[]) {
  properties.forEach(prop => expect(item).toHaveProperty(prop))
}

export function checkObjectsRequiredProps<T>(items: T[], properties: string[]) {
  items.forEach(item => checkObjectRequiredProps(item, properties))
}
