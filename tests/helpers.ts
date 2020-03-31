export function checkObjectRequiredProps<T>(item: T, properties: string[]) {
  properties.forEach(prop => {
    expect(item).toHaveProperty(prop)
    expect(item[prop]).toBeDefined()
    expect(item[prop]).not.toBeNull()
  })
}

export function checkObjectsRequiredProps<T>(items: T[], properties: string[]) {
  items.forEach(item => checkObjectRequiredProps(item, properties))
}
