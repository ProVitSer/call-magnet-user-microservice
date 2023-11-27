export function AddLatestActivity<T extends { latestActivity?: string }>(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = async function (clientId: string, fields: T) {
        fields.latestActivity = new Date().toISOString();

        return await originalMethod.call(this, clientId, fields);
    };

    return descriptor;
}
